/**
 * web-types.json 与组件源码 props/events 对比脚本
 * 用法: node scripts/check-web-types.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.resolve(__dirname, '../src/package')
const compDir = path.join(pkgDir, 'components')

const webTypes = JSON.parse(fs.readFileSync(path.join(pkgDir, 'web-types.json'), 'utf-8'))
const webComponents = webTypes.contributions.html['vue-components']

// ---------- 工具函数 ----------

/** 从 props.ts 提取顶层 props 及其 @values 注释与 default */
function extractProps(content) {
  const props = new Map() // name -> { values: [], hasDefault: bool }
  const lines = content.split(/\r?\n/)
  let started = false
  let depth = 0
  let pendingValues = null
  for (const line of lines) {
    const trimmed = line.trim()
    // 定位 props 对象起始（const xxxProps = { / export const xxxProps = { / const defaultProps = {）
    if (!started) {
      if (/^(?:export )?const \w*[Pp]rops[^=]*=\s*\{/.test(trimmed) || /^const defaultProps[^=]*=\s*\{/.test(trimmed)) {
        started = true
        depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
      }
      continue
    }
    if (depth === 1) {
      // 顶层 key: 4 空格缩进
      const m = line.match(/^ {4}(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*[:,]/)
      if (m) {
        const key = m[1] || m[2] || m[3]
        if (key === 'default') {
          // default 属于上一个 prop
        } else {
          props.set(key, { values: pendingValues, hasDefault: false, defaultRaw: null })
          pendingValues = null
        }
      }
      const dm = line.match(/^ {8}default:\s*(.+?)\s*$/)
      if (dm) {
        // 找到最近一个 prop 标记 hasDefault
        const keys = [...props.keys()]
        const last = keys[keys.length - 1]
        if (last) {
          props.get(last).hasDefault = true
          props.get(last).defaultRaw = dm[1].replace(/,$/, '')
        }
      }
    }
    // 记录 @values 注释
    const vm = trimmed.match(/^[-*\s]*@values\s+(.+)$/)
    if (vm) pendingValues = vm[1].trim()
    const opens = (line.match(/\{/g) || []).length
    const closes = (line.match(/\}/g) || []).length
    depth += opens - closes
    if (depth <= 0) break
  }
  return props
}

/** 从 typing.d.ts 提取 I*Emits 接口事件名 */
function extractEmitsFromTyping(content) {
  const events = new Map() // name -> description
  const lines = content.split(/\r?\n/)
  let inEmits = false
  let depth = 0
  let pendingDesc = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!inEmits) {
      if (/^export interface I\w*Emits\s*\{/.test(trimmed)) {
        inEmits = true
        depth = 1
      }
      continue
    }
    if (depth === 1) {
      const m = line.match(/^ {4}(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:\s*\[/)
      if (m) {
        events.set(m[1] || m[2] || m[3], pendingDesc.join(' ').trim())
        pendingDesc = []
      } else if (trimmed.startsWith('*') && !trimmed.startsWith('*/')) {
        pendingDesc.push(trimmed.replace(/^\*\s?/, ''))
      } else if (trimmed === '*' || trimmed.startsWith('/**')) {
        // 注释开始
      } else {
        pendingDesc = []
      }
    }
    depth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
    if (depth <= 0) { inEmits = false; pendingDesc = [] }
  }
  return events
}

/** 从 .vue 文件提取 defineEmits（数组/对象/泛型引用） */
function extractEmitsFromVue(content) {
  const events = new Map()
  // 泛型引用 typing 接口
  const genRef = content.match(/defineEmits<\s*(\w+)\s*>\(\)/)
  if (genRef) return { refInterface: genRef[1], events }
  // 数组形式
  const arrMatch = content.match(/defineEmits\(\s*\[([^\]]*)\]\s*\)/)
  if (arrMatch) {
    for (const item of arrMatch[1].split(',')) {
      const name = item.trim().replace(/^['"`]|['"`]$/g, '')
      if (name) events.set(name, '')
    }
  } else {
    // 对象形式 defineEmits({ click: (e) => ... })
    const objMatch = content.match(/defineEmits\(\s*\{([\s\S]*?)\}\s*\)/)
    if (objMatch) {
      for (const line of objMatch[1].split(/\r?\n/)) {
        const m = line.match(/^\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/)
        if (m) events.set(m[1] || m[2] || m[3], '')
      }
    }
  }
  return { refInterface: null, events }
}

// ---------- 收集源码信息 ----------

const compDirs = fs.readdirSync(compDir).filter((d) => {
  const full = path.join(compDir, d)
  return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, `${d}.vue`))
})

const sourceInfo = {}
for (const dir of compDirs) {
  const full = path.join(compDir, dir)
  const info = { props: new Map(), events: new Map(), notes: [] }
  const propsFile = path.join(full, 'props.ts')
  if (fs.existsSync(propsFile)) {
    const content = fs.readFileSync(propsFile, 'utf-8')
    // 检查是否有展开运算（脚本无法解析继承 props）
    if (/^\s*\.\.\./m.test(content)) info.notes.push('props.ts 使用了展开运算符')
    const extracted = extractProps(content)
    for (const [k, v] of extracted) info.props.set(k, v)
  } else {
    info.notes.push('缺少 props.ts')
  }
  // emits：主 vue 文件
  const vueFile = path.join(full, `${dir}.vue`)
  const vueContent = fs.readFileSync(vueFile, 'utf-8')
  const { refInterface, events } = extractEmitsFromVue(vueContent)
  if (refInterface) {
    // 从 typing.d.ts 查找接口
    const typingFile = path.join(full, 'typing.d.ts')
    if (fs.existsSync(typingFile)) {
      const typingContent = fs.readFileSync(typingFile, 'utf-8')
      const all = extractEmitsFromTyping(typingContent)
      // 也把其余 I*Emits 接口事件合并（有些组件拆分多个接口）
      for (const [k, v] of all) info.events.set(k, v)
    }
  } else {
    for (const [k, v] of events) info.events.set(k, v)
    // 同时合并 typing.d.ts 中的 emits 接口（防止 .vue 用数组而 typing 有补充）
    const typingFile = path.join(full, 'typing.d.ts')
    if (fs.existsSync(typingFile)) {
      const all = extractEmitsFromTyping(fs.readFileSync(typingFile, 'utf-8'))
      if (all.size > 0 && events.size === 0) {
        for (const [k, v] of all) info.events.set(k, v)
      }
    }
  }
  sourceInfo[dir] = info
}

// ---------- 对比 ----------

const report = []
const webCompNames = new Set(webComponents.map((c) => c.name))

// 1. 缺失/多余的组件
const missingComps = compDirs.filter((d) => !webCompNames.has(d))
const extraComps = [...webCompNames].filter((n) => !compDirs.includes(n))
if (missingComps.length) report.push(`【缺失组件】web-types.json 中缺少: ${missingComps.join(', ')}`)
if (extraComps.length) report.push(`【多余组件】web-types.json 中多出: ${extraComps.join(', ')}`)

const issues = []

for (const comp of webComponents) {
  const src = sourceInfo[comp.name]
  if (!src) continue

  // 2. props 对比
  const webProps = new Map((comp.props || []).map((p) => [p.name, p]))
  for (const [name, meta] of src.props) {
    if (!webProps.has(name)) {
      issues.push(`${comp.name}: props 缺失 "${name}"`)
    } else {
      const wp = webProps.get(name)
      // @values 对比
      if (meta.values && wp.values && wp.values.length) {
        const srcVals = meta.values.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
        const webVals = wp.values.map((v) => v.name)
        const srcSet = new Set(srcVals.map((v) => v.replace(/\\\[\\\]/g, '[]')))
        const webSet = new Set(webVals)
        const miss = [...srcSet].filter((v) => !webSet.has(v))
        const extra = [...webSet].filter((v) => !srcSet.has(v))
        if (miss.length || extra.length) {
          issues.push(`${comp.name}: prop "${name}" values 不一致 (源码@values: [${srcVals.join(', ')}] / web-types: [${webVals.join(', ')}])`)
        }
      }
    }
  }
  for (const name of webProps.keys()) {
    if (!src.props.has(name)) {
      issues.push(`${comp.name}: props 多余 "${name}"（源码中不存在）`)
    }
  }

  // 3. events 对比
  const webEvents = new Map(((comp.js && comp.js.events) || []).map((e) => [e.name, e]))
  for (const name of src.events.keys()) {
    if (!webEvents.has(name)) {
      issues.push(`${comp.name}: events 缺失 "${name}"`)
    }
  }
  for (const [name, ev] of webEvents) {
    if (!src.events.has(name)) {
      issues.push(`${comp.name}: events 多余 "${name}"（源码中不存在）`)
    }
    // description 可疑：为类型片段而非中文描述
    if (ev.description && /^(number|string|boolean|any|Event|void)\]?[\s.,)]*$/.test(ev.description.trim())) {
      issues.push(`${comp.name}: event "${name}" description 可疑: "${ev.description}"`)
    }
  }

  // 4. props 类型可疑（截断的泛型类型）
  for (const [name, wp] of webProps) {
    for (const t of wp.type || []) {
      if (typeof t === 'object' && t.name && /[<=]/.test(t.name)) {
        issues.push(`${comp.name}: prop "${name}" type 疑似截断: "${t.name}"`)
      }
    }
    if (wp.description && /^(number|string|boolean|any|Event)\]?[\s.,)]*$/.test(wp.description.trim())) {
      issues.push(`${comp.name}: prop "${name}" description 可疑: "${wp.description}"`)
    }
  }
}

console.log('=== web-types.json 与源码对比报告 ===\n')
console.log(report.join('\n'))
if (report.length) console.log('')
console.log(`共发现 ${issues.length} 个问题:\n`)
for (const i of issues) console.log('- ' + i)
