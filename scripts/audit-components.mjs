/**
 * 组件 API 生效性审计脚本
 * 静态分析 src/package/components 下所有组件，检测五类 API 修改后是否能真正生效：
 *   1. Props     —— props.ts 声明的 prop 是否在组件 .vue（去注释）中被引用
 *   2. Slots     —— web-types.json 声明的插槽是否在模板中存在 <slot> 出口
 *   3. Events    —— typing.d.ts / defineEmits 声明的事件是否存在 emit 调用或模板透传
 *   4. Methods   —— defineExpose / typing 声明的暴露成员是否在 script 中有真实定义
 *   5. CSS 变量  —— SCSS 编译验证：变量被消费 + 消费规则的选择器类名能命中模板
 *
 * 用法: npm run audit:components
 * 输出: scripts/reports/component-audit-report.md / .json + 控制台摘要
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as sass from 'sass'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PKG_DIR = path.resolve(__dirname, '../src/package')
const COMP_DIR = path.join(PKG_DIR, 'components')
const LIBS_CSS_DIR = path.join(PKG_DIR, 'libs/css')
const REPORT_DIR = path.join(__dirname, 'reports')

// 状态: ok=生效 / warn=疑似(需人工确认) / fail=失效
const STATUS_LEVEL = { ok: 0, warn: 1, fail: 2 }

// ---------- 基础工具 ----------

/** 读取文件（不存在返回 null） */
function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf-8')
  } catch {
    return null
  }
}

/** 递归收集目录下指定后缀的文件（相对路径） */
function walkFiles(dir, exts, base = dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) out.push(...walkFiles(full, exts, base))
    else if (exts.some((e) => name.endsWith(e))) out.push(path.relative(base, full))
  }
  return out
}

/** 剥离注释（模板/块/行），降低文本匹配误报 */
function stripComments(code) {
  return code
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

/** 正则转义 */
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** 构造 var(--name) 的词边界消费匹配（避免 --hy-tabs 误命中 --hy-tabs-item） */
const varUsageRe = (name) => new RegExp(`var\\(\\s*${escapeRe(name)}(?![\\w-])`)

// ---------- 源码提取器 ----------

/** 拆分 SFC：template / 所有 script / 所有 style 块 */
function splitSfc(vueContent) {
  const template = (vueContent.match(/<template[^>]*>([\s\S]*?)<\/template>/) || [])[1] || ''
  const scripts = [...vueContent.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const styles = [...vueContent.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)].map((m) => ({
    // <style lang="scss"> → scss；其余视为 css
    lang: /lang\s*=\s*["']scss["']/.test(m[1]) ? 'scss' : 'css',
    content: m[2]
  }))
  return { template, scripts, styles }
}

/** 从 props.ts 提取顶层 prop 名（大括号配对 + 顶层 key 匹配，不依赖缩进位数） */
function extractPropsKeys(content) {
  const keys = []
  const notes = []
  if (!content) return { keys, notes }
  if (/^\s*\.\.\./m.test(content)) notes.push('props.ts 使用了展开运算符')
  // 定位对象起始：const xxxProps = { / export default {
  const startMatch = content.match(/(?:export\s+)?const\s+\w*[Pp]rops[^=]*=\s*\{|export\s+default\s+\{/)
  if (!startMatch) return { keys, notes: [...notes, '未识别到 props 对象定义'] }
  const startIdx = content.indexOf(startMatch[0]) + startMatch[0].length - 1
  let depth = 0
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') depth++
    else if (content[i] === '}') {
      depth--
      if (depth === 0) break
      continue
    }
    if (depth !== 1) continue
    // 顶层 key 行（任意缩进），排除 default/type/required 等属性关键字
    const lineStart = content.lastIndexOf('\n', i) + 1
    const lineEnd = content.indexOf('\n', i)
    const line = content.slice(lineStart, lineEnd === -1 ? content.length : lineEnd)
    const m = line.match(/^\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/)
    if (m) {
      const key = m[1] || m[2] || m[3]
      if (!['default', 'type', 'required', 'validator'].includes(key)) keys.push(key)
    }
  }
  return { keys: [...new Set(keys)], notes }
}

/** 从 typing.d.ts 提取 I*Emits 接口事件名 */
function extractEmitsFromTyping(content) {
  const names = new Set()
  if (!content) return names
  const re = /export\s+interface\s+I\w*Emits\s*\{/g
  let m
  while ((m = re.exec(content)) !== null) {
    let depth = 1
    let i = m.index + m[0].length
    while (i < content.length && depth > 0) {
      if (content[i] === '{') depth++
      else if (content[i] === '}') depth--
      i++
    }
    const body = content.slice(m.index + m[0].length, i - 1)
    for (const line of body.split(/\r?\n/)) {
      const mm = line.trim().match(/^(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*\??\s*:\s*\[/)
      if (mm) names.add(mm[1] || mm[2] || mm[3])
    }
  }
  return names
}

/** 从 .vue 提取 defineEmits 事件名（数组 / 对象形式） */
function extractEmitsFromVue(scripts) {
  const names = new Set()
  const text = scripts.join('\n')
  const arr = text.match(/defineEmits\(\s*\[([^\]]*)\]\s*\)/)
  if (arr) {
    for (const item of arr[1].split(',')) {
      const n = item.trim().replace(/^['"`]|['"`]$/g, '')
      if (n) names.add(n)
    }
  }
  const obj = text.match(/defineEmits\(\s*\{([\s\S]*?)\}\s*\)/)
  if (obj) {
    for (const line of obj[1].split(/\r?\n/)) {
      const m = line.match(/^\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/)
      if (m) names.add(m[1] || m[2] || m[3])
    }
  }
  return names
}

/** 从 typing.d.ts 提取 I*Expose 接口成员名 */
function extractExposesFromTyping(content) {
  const names = new Set()
  if (!content) return names
  const re = /export\s+(?:interface|type)\s+I\w*Expose\s*(?:=\s*)?\{/g
  let m
  while ((m = re.exec(content)) !== null) {
    let depth = 1
    let i = m.index + m[0].length
    while (i < content.length && depth > 0) {
      if (content[i] === '{') depth++
      else if (content[i] === '}') depth--
      i++
    }
    const body = content.slice(m.index + m[0].length, i - 1)
    for (const line of body.split(/\r?\n/)) {
      const mm = line.trim().match(/^(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*\??\s*:/)
      if (mm) names.add(mm[1] || mm[2] || mm[3])
    }
  }
  return names
}

/** 从 .vue 提取 defineExpose 对象成员：name -> inline（成员: 值 内联定义）/ shorthand（简写引用外部定义） */
function extractExposesFromVue(scripts) {
  const names = new Map()
  const text = scripts.join('\n')
  const obj = text.match(/defineExpose\s*(?:<[^>]+>)?\s*\(\s*\{([\s\S]*?)\}\s*\)/)
  if (obj) {
    let depth = 0
    for (const line of obj[1].split(/\r?\n/)) {
      const trimmed = line.trim()
      if (depth === 0) {
        const m = trimmed.match(/^(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*([:,]?)/)
        if (m) names.set(m[1] || m[2] || m[3], m[4] === ':' ? 'inline' : 'shorthand')
      }
      for (const ch of line) {
        if (ch === '{' || ch === '[' || ch === '(') depth++
        else if (ch === '}' || ch === ']' || ch === ')') depth--
      }
    }
  }
  return names
}

/** 从模板提取 <slot> 出口：静态具名 / 动态 / 默认 */
function extractSlotOutlets(vueConcat) {
  const statics = new Set()
  let dynamic = false
  let defaultOutlet = false
  for (const m of vueConcat.matchAll(/<slot\b[^>]*>/g)) {
    const tag = m[0]
    if (/:name\s*=/.test(tag)) dynamic = true
    const name = (tag.match(/\sname\s*=\s*["']([^"']+)["']/) || [])[1]
    if (name) statics.add(name)
    else if (!/:name\s*=/.test(tag)) defaultOutlet = true
  }
  return { statics, dynamic, defaultOutlet }
}

// ---------- CSS 解析与编译 ----------

/** 轻量 CSS 规则解析：返回 [{ selector, decls }]（@media 前缀拼接，@keyframes 跳过） */
function parseCssRules(css, prefix = '') {
  const text = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@charset[^;]*;?/g, '')
  const rules = []
  let i = 0
  while (i < text.length) {
    while (i < text.length && /\s/.test(text[i])) i++
    if (i >= text.length) break
    let j = i
    while (j < text.length && text[j] !== '{' && text[j] !== ';') j++
    if (j >= text.length) break
    const sel = text.slice(i, j).trim()
    if (text[j] === ';') {
      i = j + 1
      continue
    }
    // 读取配对大括号块
    let depth = 1
    let k = j + 1
    while (k < text.length && depth > 0) {
      if (text[k] === '{') depth++
      else if (text[k] === '}') depth--
      k++
    }
    const body = text.slice(j + 1, k - 1)
    if (sel.startsWith('@')) {
      if (/^@(media|supports|layer|container|scope)\b/i.test(sel)) {
        rules.push(...parseCssRules(body, prefix ? `${prefix} ${sel}` : sel))
      }
      // @keyframes / @font-face 等整块跳过
    } else if (sel) {
      rules.push({ selector: prefix ? `${prefix} ${sel}` : sel, decls: body })
    }
    i = k
  }
  return rules
}

/** 提取选择器中的类名（忽略 :not/:is/:where/:has 参数内的类，保留 :deep 内的类） */
function extractSelectorClasses(selector) {
  const cleaned = selector
    .replace(/:(?:not|is|where|has)\([^)]*\)/gi, '')
  return [...cleaned.matchAll(/\.([A-Za-z_][\w-]*)/g)].map((m) => m[1])
}

/** 类名验证白名单：平台内部类 / 主题类 / 全局节点 */
const CLASS_WHITELIST = [/^uni-/i, /^hy-theme--/i, /^wx-/i, /^edui-/i]

/**
 * 动态类名识别：含 -- 的 modifier 类与 is- 状态类在本库普遍由 bem() /
 * 模板字符串（`hy-xxx--${mod}`）/ class 生成函数动态拼出，源码中不存在字面量，
 * 选择器验证对它们不可靠，统一跳过，仅验证字面量编写的 block / element 类
 */
const isDynamicClassName = (cl) => cl.startsWith('is-') || cl.includes('--')

/** 编译组件 scss 文件，返回 { css, error } */
function compileScssFile(file) {
  try {
    const result = sass.compile(file, { loadPaths: [COMP_DIR, PKG_DIR] })
    return { css: result.css, error: null }
  } catch (e) {
    return { css: null, error: String(e.message || e).split('\n')[0] }
  }
}

/** 编译 vue style 块（虚拟路径作为相对导入基准），返回 { css, error } */
function compileStyleBlock(content, dir) {
  try {
    const result = sass.compileString(content, {
      url: pathToFileURL(path.join(dir, '__audit_style__.scss')),
      loadPaths: [COMP_DIR, PKG_DIR, dir]
    })
    return { css: result.css, error: null }
  } catch (e) {
    return { css: null, error: String(e.message || e).split('\n')[0] }
  }
}

/** 从 scss / style 源文本提取组件级 CSS 变量定义（$var: var(--name,...) 或 --name: 值） */
function collectCssVarDefs(text) {
  const defs = new Map() // cssVarName -> { scssVar, raw }
  if (!text) return defs
  for (const m of text.matchAll(/\$([\w-]+)\s*:\s*var\(\s*(--[\w-]+)/g)) {
    defs.set(m[2], { scssVar: m[1], raw: m[0].trim() })
  }
  for (const m of text.matchAll(/[{;]\s*(--[\w-]+)\s*:/g)) {
    if (!defs.has(m[1])) defs.set(m[1], { scssVar: null, raw: m[1] })
  }
  return defs
}

// ---------- 主流程 ----------

fs.mkdirSync(REPORT_DIR, { recursive: true })
const webTypes = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'web-types.json'), 'utf-8'))
const webComps = new Map(
  webTypes.contributions.html['vue-components'].map((c) => [c.name, c])
)

// 全局 token（libs/css 下定义的 --hy-*），用于排除组件变量重复项 + 全局消费统计
const globalTokens = new Set()
for (const f of walkFiles(LIBS_CSS_DIR, ['.scss'])) {
  const content = readFileSafe(path.join(LIBS_CSS_DIR, f)) || ''
  for (const m of content.matchAll(/var\(\s*(--[\w-]+)/g)) globalTokens.add(m[1])
  for (const m of content.matchAll(/[#{;]\s*(--[\w-]+)\s*:/g)) globalTokens.add(m[1])
}

const compDirs = fs.readdirSync(COMP_DIR).filter((d) => {
  const full = path.join(COMP_DIR, d)
  return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, `${d}.vue`))
})

const report = { components: {} }
const dimStats = {
  props: { total: 0, ok: 0, warn: 0, fail: 0 },
  slots: { total: 0, ok: 0, warn: 0, fail: 0 },
  events: { total: 0, ok: 0, warn: 0, fail: 0 },
  methods: { total: 0, ok: 0, warn: 0, fail: 0 },
  cssVars: { total: 0, ok: 0, warn: 0, fail: 0 }
}
const bump = (dim, status) => {
  dimStats[dim].total++
  dimStats[dim][status]++
}

// 全库编译输出缓存（用于全局 token 消费统计）
let allCompiledCss = ''

for (const dir of compDirs) {
  const full = path.join(COMP_DIR, dir)
  const entry = { props: [], slots: [], events: [], methods: [], cssVars: [], errors: [], notes: [] }
  report.components[dir] = entry

  // ---- 收集组件目录全部源文件 ----
  const vueFiles = walkFiles(full, ['.vue'])
  const scssFiles = walkFiles(full, ['.scss'])
  const vueContents = vueFiles.map((f) => readFileSafe(path.join(full, f)) || '')
  const vueConcat = vueContents.join('\n')
  const vueClean = stripComments(vueConcat)
  const templateConcat = vueContents.map((c) => splitSfc(c).template).join('\n')
  const scriptsConcat = vueContents.map((c) => splitSfc(c).scripts.join('\n')).join('\n')
  const scriptsClean = stripComments(scriptsConcat)

  const propsTs = readFileSafe(path.join(full, 'props.ts'))
  const typing = readFileSafe(path.join(full, 'typing.d.ts'))
  const webComp = webComps.get(dir)

  // ---- 1. Props 检测 ----
  const { keys: propKeys, notes: propNotes } = extractPropsKeys(propsTs)
  entry.notes.push(...propNotes)
  // 容器组件整体转发模式：props 经 toRefs/provide/useChildren 注入子组件，无法静态逐项确认
  const propsForwarded =
    /toRefs\(\s*props\s*\)|reactive\(\s*props\s*\)|\.\.\.props\b|linkChildren\(\s*\{\s*props\b|provide(?:<[^>]+>)?\([^,]+,\s*props\b|provide(?:<[^>]+>)?\([^,]+,\s*\{\s*props\b|v-bind\s*=\s*["']props["']/.test(
      vueClean
    )
  for (const key of propKeys) {
    const used = new RegExp(`\\b${escapeRe(key)}\\b`).test(vueClean)
    let status = 'ok'
    let reason = ''
    if (!used) {
      if (propsForwarded) {
        status = 'warn'
        reason = '组件通过 toRefs(props)/provide/useChildren 整体转发 props 给子组件，无法静态逐项确认消费点，请人工确认'
      } else {
        status = 'fail'
        reason = 'props.ts 声明后在组件源码中无任何引用，修改该 prop 不会有任何效果'
      }
    }
    entry.props.push({ name: key, status, reason })
    bump('props', status)
  }

  // ---- 2. Slots 检测 ----
  const outlets = extractSlotOutlets(vueConcat)
  const declaredSlots = (webComp && webComp.slots) || []
  if (declaredSlots.length || outlets.statics.size || outlets.dynamic) {
    for (const s of declaredSlots) {
      const name = s.name
      let status = 'fail'
      let reason = ''
      if (name === 'default' || name === '') {
        status = outlets.defaultOutlet || outlets.statics.has('default') ? 'ok' : 'fail'
        if (status === 'fail') reason = '模板中不存在默认插槽出口 <slot> 或 <slot name="default">'
      } else if (outlets.statics.has(name)) {
        status = 'ok'
      } else if (outlets.dynamic) {
        status = 'warn'
        reason = '仅有动态 :name 插槽出口，无法静态确认该具名插槽被渲染'
      } else {
        reason = `模板中不存在 <slot name="${name}"> 出口，传入该插槽内容不会被渲染`
      }
      entry.slots.push({ name: name || 'default', status, reason })
      bump('slots', status)
    }
    // 反向：模板有出口但未在 web-types 声明
    for (const name of outlets.statics) {
      if (!declaredSlots.some((s) => s.name === name)) {
        entry.slots.push({ name, status: 'warn', reason: '模板存在该插槽出口，但 web-types.json 未声明（文档缺失，不影响功能）' })
        bump('slots', 'warn')
      }
    }
  }

  // ---- 3. Events 检测 ----
  const eventNames = new Set([
    ...extractEmitsFromTyping(typing),
    ...extractEmitsFromVue(vueContents.map((c) => splitSfc(c).scripts))
  ])
  const webEvents = new Map(((webComp && webComp.js && webComp.js.events) || []).map((e) => [e.name, e]))
  for (const name of new Set([...eventNames, ...webEvents.keys()])) {
    const q = escapeRe(name)
    const emitCalled = new RegExp(`\\$?emit\\(\\s*['"\`]${q}['"\`]`).test(vueClean)
    const indirect =
      new RegExp(`['"\`]${q}['"\`]`).test(vueClean) || new RegExp(`@${q}\\b`).test(vueClean)
    let status = 'fail'
    let reason = ''
    if (emitCalled) {
      status = 'ok'
    } else if (indirect) {
      status = 'warn'
      reason = '未发现 emit("xxx") 直接调用，仅存在字符串/模板透传引用，可能是透传事件或已废弃'
    } else {
      reason = '组件源码中既无 emit 调用也无透传绑定，监听该事件永远不会触发'
    }
    entry.events.push({ name, status, reason })
    bump('events', status)
  }

  // ---- 4. Methods (defineExpose) 检测 ----
  const exposeFromVue = new Map()
  for (const c of vueContents) {
    for (const [n, form] of extractExposesFromVue(splitSfc(c).scripts)) {
      if (!exposeFromVue.has(n)) exposeFromVue.set(n, form)
    }
  }
  const exposeNames = new Set([...exposeFromVue.keys(), ...extractExposesFromTyping(typing)])
  const webProps = new Map(((webComp && webComp.js && webComp.js.properties) || []).map((p) => [p.name, p]))
  for (const name of new Set([...exposeNames, ...webProps.keys()])) {
    const defined = new RegExp(`(?:const|let|var|function)\\s+${escapeRe(name)}\\b`).test(scriptsClean)
    const form = exposeFromVue.get(name)
    let status = 'ok'
    let reason = ''
    if (!exposeNames.has(name)) {
      status = 'warn'
      reason = 'web-types.json 声明了该 method，但源码 defineExpose/typing 中不存在（文档多余）'
    } else if (form === 'inline') {
      status = 'ok' // 内联定义（成员: 箭头函数），defineExpose 处即真实定义
    } else if (form === 'shorthand') {
      status = defined ? 'ok' : 'fail'
      if (!defined) reason = 'defineExpose 简写暴露了该名称，但 script 中不存在对应定义，通过 ref 调用会得到 undefined'
    } else {
      // 仅 typing 接口声明，defineExpose 对象未包含
      status = 'warn'
      reason = 'typing.d.ts 的 I*Expose 接口声明了该成员，但 defineExpose 对象中未包含，请确认是否真实暴露'
    }
    entry.methods.push({ name, status, reason })
    bump('methods', status)
  }

  // ---- 5. CSS 变量检测 ----
  // 5.1 收集定义：index.scss + 其余 scss + vue style 块
  const varDefs = new Map()
  for (const f of scssFiles) {
    const content = readFileSafe(path.join(full, f)) || ''
    for (const [name, meta] of collectCssVarDefs(content)) {
      if (!varDefs.has(name)) varDefs.set(name, { ...meta, file: f })
    }
  }
  for (const c of vueContents) {
    for (const style of splitSfc(c).styles) {
      for (const [name, meta] of collectCssVarDefs(style.content)) {
        if (!varDefs.has(name)) varDefs.set(name, { ...meta, file: 'vue <style>' })
      }
    }
  }

  // 5.2 编译：目录下全部非 partial 的 scss 文件（含子目录，如 key/index.scss）+ vue style 块（css style 块直接解析）
  const compiledRules = []
  for (const f of scssFiles) {
    if (path.basename(f).startsWith('_')) continue // partial 仅被 @use 引入，非编译入口
    const { css, error } = compileScssFile(path.join(full, f))
    if (error) entry.errors.push(`${f} 编译失败: ${error}`)
    if (css) {
      compiledRules.push(...parseCssRules(css))
      allCompiledCss += css
    }
  }
  // vue style 块以该 vue 文件实际所在目录为编译基准，否则 `@use './index.scss'` 会错误解析到组件根目录的同名文件
  for (let vi = 0; vi < vueFiles.length; vi++) {
    const vueDir = path.dirname(path.join(full, vueFiles[vi]))
    for (const style of splitSfc(vueContents[vi]).styles) {
      if (style.lang === 'scss') {
        const { css, error } = compileStyleBlock(style.content, vueDir)
        if (error) entry.errors.push(`${vueFiles[vi]} style 块编译失败: ${error}`)
        if (css) {
          compiledRules.push(...parseCssRules(css))
          allCompiledCss += css
        }
      } else if (style.content.trim()) {
        compiledRules.push(...parseCssRules(style.content))
        allCompiledCss += style.content
      }
    }
  }

  // 5.3 逐变量验证：编译输出消费 + 选择器命中模板
  for (const [name, meta] of varDefs) {
    if (globalTokens.has(name)) continue // 全局 token 归全局统计，避免重复报告
    const usageRe = varUsageRe(name)
    const hitRules = compiledRules.filter((r) => usageRe.test(r.decls))
    if (hitRules.length === 0) {
      // 兜底：模板内联 :style 中 var() 消费
      const inlineUsed = usageRe.test(vueClean)
      const item = inlineUsed
        ? { name, status: 'ok', reason: '通过模板内联 style 中 var() 消费', detail: meta }
        : {
            name,
            status: 'fail',
            reason: `SCSS 编译输出中无任何规则消费 var(${name})，定义于 ${meta.file}，修改该变量不会有任何效果`,
            detail: meta
          }
      entry.cssVars.push(item)
      bump('cssVars', item.status)
      continue
    }
    // 选择器类名命中模板验证：至少一条消费规则的所有类名都能在组件源码中找到
    // 匹配文本含 vue + props.ts + typing.d.ts（如 placeholderClass 默认值 input-placeholder）
    const matchText = [vueConcat, propsTs || '', typing || ''].join('\n')
    // 动态类名拼接前缀：模板字符串（`hy-input__${shape}`）与 bem('xxx', props) 生成的类名无字面量，跳过验证
    const dynamicPrefixes = new Set()
    for (const m of vueClean.matchAll(/`(hy-[\w-]+(?:__|--))\$\{/g)) dynamicPrefixes.add(m[1])
    for (const m of vueClean.matchAll(/\bbem\(\s*['"]([\w-]+)['"]/g)) dynamicPrefixes.add(`hy-${m[1]}--`)
    let selectorOk = false
    const missingInfo = []
    for (const rule of hitRules) {
      const classes = extractSelectorClasses(rule.selector)
      const missing = classes.filter(
        (cl) =>
          !CLASS_WHITELIST.some((re) => re.test(cl)) &&
          !isDynamicClassName(cl) &&
          ![...dynamicPrefixes].some((p) => cl.startsWith(p)) &&
          !new RegExp(escapeRe(cl)).test(matchText)
      )
      if (classes.length === 0 || missing.length === 0) {
        selectorOk = true
        break
      }
      missingInfo.push({ selector: rule.selector, missing })
    }
    if (selectorOk) {
      entry.cssVars.push({ name, status: 'ok', reason: '', detail: meta })
      bump('cssVars', 'ok')
    } else {
      entry.cssVars.push({
        name,
        status: 'warn',
        reason: `变量被样式消费，但消费规则的选择器基础类名（block/element）未出现在组件源码中，可能是死样式: ${missingInfo
          .slice(0, 3)
          .map((x) => `${x.selector} 缺 ${x.missing.join('/')}`)
          .join('；')}（注：含 -- 的 modifier 类由 bem/模板字符串动态生成，已跳过验证）`,
        detail: meta
      })
      bump('cssVars', 'warn')
    }
  }
}

// ---- 全局 token 消费统计（附录，疑似级） ----
const globalTokenReport = []
const packageSourceAll = (() => {
  let all = allCompiledCss
  for (const d of compDirs) {
    const full = path.join(COMP_DIR, d)
    for (const f of walkFiles(full, ['.vue', '.scss', '.ts'])) {
      all += readFileSafe(path.join(full, f)) || ''
    }
  }
  for (const f of walkFiles(path.join(PKG_DIR, 'libs'), ['.vue', '.scss', '.ts'])) {
    all += readFileSafe(path.join(PKG_DIR, 'libs', f)) || ''
  }
  return all
})()
for (const token of globalTokens) {
  if (!token.startsWith('--hy-')) continue
  const usedCount = (packageSourceAll.match(varUsageRe(token)) || []).length
  if (usedCount === 0) globalTokenReport.push(token)
}

// ---------- 报告生成 ----------

const now = new Date()
const stamp = now.toLocaleString('zh-CN', { hour12: false })
const orderSort = (a, b) => STATUS_LEVEL[b.status] - STATUS_LEVEL[a.status]

const lines = []
lines.push('# @hy-app/ui 组件 API 生效性审计报告', '')
lines.push(`> 生成时间: ${stamp}  `)
lines.push(`> 审计范围: \`src/package/components\` 下 **${compDirs.length}** 个组件  `)
lines.push('> 检测方式: 静态分析（源码解析 + SCSS 真实编译验证），非运行时测试', '')
lines.push('## 一、摘要', '')
lines.push('| 检测维度 | 检查项 | 生效 | 疑似(warn) | 失效(fail) |')
lines.push('|---|---|---|---|---|')
const dimLabel = {
  props: 'Props（props.ts）',
  slots: 'Slots（web-types）',
  events: 'Events（typing/defineEmits）',
  methods: 'Methods（defineExpose）',
  cssVars: 'CSS 变量（--hy-*）'
}
for (const [dim, s] of Object.entries(dimStats)) {
  lines.push(`| ${dimLabel[dim]} | ${s.total} | ${s.ok} | ${s.warn} | ${s.fail} |`)
}
lines.push('')

function section(dim, title, header) {
  const items = []
  for (const [comp, entry] of Object.entries(report.components)) {
    const bad = entry[dim].filter((i) => i.status !== 'ok').sort(orderSort)
    if (bad.length) items.push({ comp, bad })
  }
  lines.push(`## ${title}`, '')
  if (!items.length) {
    lines.push('未发现问题。', '')
    return
  }
  for (const { comp, bad } of items) {
    lines.push(`### ${comp}`, '')
    lines.push(header)
    for (const i of bad) {
      const tag = i.status === 'fail' ? '失效' : '疑似'
      lines.push(`| \`${i.name}\` | ${tag} | ${i.reason.replace(/\|/g, '/')} |`)
    }
    lines.push('')
  }
}

section('cssVars', '二、CSS 变量失效清单（修改后不生效）', '| 变量 | 状态 | 原因 |')
lines.push('---', '')
section('props', '三、Props 失效清单', '| Prop | 状态 | 原因 |')
lines.push('---', '')
section('events', '四、Events 失效清单', '| 事件 | 状态 | 原因 |')
lines.push('---', '')
section('slots', '五、Slots 失效清单', '| 插槽 | 状态 | 原因 |')
lines.push('---', '')
section('methods', '六、Methods 失效清单', '| 方法 | 状态 | 原因 |')

// 编译错误
const compileErrors = Object.entries(report.components).filter(([, e]) => e.errors.length)
lines.push('## 七、SCSS 编译错误（已降级文本扫描，结果可能不完整）', '')
if (!compileErrors.length) lines.push('无。', '')
for (const [comp, e] of compileErrors) {
  lines.push(`- **${comp}**: ${e.errors.join('；')}`)
}
lines.push('')

// 全局 token 附录
lines.push('## 八、附录：全局 token 从未被组件库消费（疑似废弃）', '')
if (!globalTokenReport.length) {
  lines.push('所有全局 token 均有消费。', '')
} else {
  for (const t of globalTokenReport) lines.push(`- \`${t}\``)
  lines.push('')
}

lines.push('## 九、方法学与局限', '')
lines.push('- **Props/Events/Methods** 为源码级词法匹配（已剥离注释），对动态拼接名称可能漏报，结论分 ok / 疑似 / 失效三级。')
lines.push('- **CSS 变量** 采用 SCSS 真实编译：变量须出现在编译产物某条规则的声明中，且该规则选择器类名能在组件模板/脚本文本中找到，方判定生效；含 `--` 的 modifier 类、`is-` 状态类及模板字符串拼接前缀（如 `hy-input__${shape}`、bem()）覆盖的类名由运行时动态生成，已跳过验证；仅在 `@keyframes` 内消费的变量会被计为失效（此类本身跨端不生效）。')
lines.push('- 插槽检测以 web-types.json 声明为基准，动态 `:name` 插槽出口标记为疑似。')
lines.push('- 本脚本不依赖运行时环境，如需交互级验证可结合 H5 端 uni-automator 补充。')

const mdPath = path.join(REPORT_DIR, 'component-audit-report.md')
fs.writeFileSync(mdPath, lines.join('\n'), 'utf-8')

// JSON 全量报告
const jsonPath = path.join(REPORT_DIR, 'component-audit-report.json')
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    { generatedAt: now.toISOString(), componentCount: compDirs.length, dimStats, globalTokenUnused: globalTokenReport, ...report },
    null,
    2
  ),
  'utf-8'
)

// ---------- 控制台输出 ----------
const consoleOut = []
consoleOut.push('=== 组件 API 生效性审计报告 ===', '')
consoleOut.push(`组件总数: ${compDirs.length}`)
for (const [dim, s] of Object.entries(dimStats)) {
  consoleOut.push(`  ${dimLabel[dim]}: 共 ${s.total} 项, 生效 ${s.ok}, 疑似 ${s.warn}, 失效 ${s.fail}`)
}
consoleOut.push('', `报告已生成:`, `  ${mdPath}`, `  ${jsonPath}`, '')
console.log(consoleOut.join('\n'))

// 控制台列出全部失效项
const failGroups = [
  ['CSS 变量', 'cssVars'],
  ['Props', 'props'],
  ['Events', 'events'],
  ['Slots', 'slots'],
  ['Methods', 'methods']
]
for (const [label, dim] of failGroups) {
  const fails = []
  for (const [comp, entry] of Object.entries(report.components)) {
    for (const i of entry[dim]) if (i.status === 'fail') fails.push(`${comp}: ${i.name}`)
  }
  if (fails.length) {
    console.log(`【${label} 失效 ${fails.length} 项】`)
    for (const f of fails) console.log(`  - ${f}`)
    console.log('')
  }
}
