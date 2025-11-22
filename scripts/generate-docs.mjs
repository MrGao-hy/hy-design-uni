// 直接使用 vue-docgen-api 和 markdown 生成器
import { parse } from 'vue-docgen-api'
import { writeFileSync, mkdirSync, readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, join, basename, extname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// 文件操作辅助函数
function readFileContent(filePath, encoding = 'utf8') {
    try {
        if (!existsSync(filePath)) {
            if (CONFIG.DEBUG) {
                console.log(`文件不存在: ${filePath}`)
            }
            return null
        }
        return readFileSync(filePath, encoding)
    } catch (error) {
        console.error(`读取文件失败: ${filePath}`, error)
        if (CONFIG.DEBUG) {
            console.error('错误堆栈:', error.stack)
        }
        return null
    }
}

// 获取组件目录下的文件路径
function getComponentFilePath(componentDir, fileName) {
    return join(componentDir, fileName)
}

// =========================== 正则表达式常量 ===========================
// 提取重复的正则表达式为常量，提高代码可维护性
const REGEX = {
    // 组件信息提取
    COMPONENT_NAME: /name:\s*['"]([^'"]+)['"]/,
    DISPLAY_NAME: /@displayName\s+([^\n]+)/,
    JSDOC_COMMENT: /\/\*\*[\s\S]*?\*\//g,
    VUE_TEMPLATE: /<template[^>]*>([\s\S]*?)<\/template>/,
    
    // 属性提取
    PROP_OBJECT: /(\w+):\s*(\{[\s\S]*?\})(?=,\s*\w+:|$)/g,
    PROP_TYPE: /type:\s*([\s\S]*?)(?=,\s*(default|required|$))/,
    PROP_DEFAULT: /default:\s*([\s\S]*?)(?=,\s*\w+:|$)/,
    PROP_REQUIRED: /required:\s*(true|false)/,
    
    // 插槽提取
    ALL_SLOTS: /(<slot(?:\s+name=['"](\w+)['"])?[^>]*?(?:\/>|<\/slot>))/g,
    SLOT_NAME: /name=['"](\w+)['"]/,
    VUE_COMMENT: /<!--([\s\S]*?)-->/g,
    
    // 事件提取
    INTERFACE_DECLARATION: /interface\s+(\w+Emits)\s*\{([\s\S]*?)\}/,
    EVENT_DECLARATION: /(\w+):\s*(\([^)]*\))\s*=>\s*(void|any)/g,
    EVENT_WITH_COMMENT: /\/\*\*[\s\S]*?\*\/\s*\(e:\s*["']([\w-]+)["']/g,
    EMIT_CALL: /emit\(['"]([\w-]+)['"]/g,
    
    // 属性文件提取
    PROPS_OBJECT_DEF: /(?:export\s+)?const\s+\w+\s*=\s*\{/g,
    PROP_DEFINITION: /(\/\*\*[\s\S]*?\*\/)?\s*(\w+)\s*:\s*((?:\{[\s\S]*?\})|(?:[^,;\r\n]+))\s*(?:,|$)/g
}

// =========================== 全局配置 ===========================
// 这些配置可以根据项目需要进行修改
const CONFIG = {
    // 调试模式配置
    DEBUG: true, // 设置为true可以显示调试信息
    // 输出目录配置
    OUTPUT_DIR: resolve(__dirname, '../dist/docs/components'),

    // 组件目录配置
    COMPONENTS_DIR: resolve(__dirname, '../src/package/components'),

    // 组件查找配置
    COMPONENT_DISCOVERY: {
        // 是否自动发现组件
        enabled: true,
        // 要排除的组件名称
        exclude: [],
        // 自定义组件列表（当 autoDiscover 为 false 时使用）
        customComponents: [
            // {
            //   name: 'custom-component',
            //   vuePath: resolve(__dirname, '../src/components/custom-component/custom-component.vue'),
            //   propsPath: resolve(__dirname, '../src/components/custom-component/props.ts'),
            //   specialHandling: false,
            //   manualProps: [],
            //   emitsInterfaceName: ''
            // }
        ]
    },

    // 文件命名规则配置
    FILE_NAMING: {
        // Vue 组件文件扩展名
        vueExtension: '.vue',
        // 属性文件名称
        propsFileName: 'props.ts',
        // 类型定义文件名称
        typingFileName: 'typing.d.ts',
        // 输出文档文件扩展名
        docExtension: '.md'
    },

    // 类型转换映射配置
    TYPE_MAPPING: {
        String: 'string',
        Boolean: 'boolean',
        Number: 'number',
        Object: 'object',
        Array: 'array'
    },

    // 事件接口命名规则配置 (例如: I{ComponentName}Emits)
    EMITS_INTERFACE_PATTERNS: [
        // 1. 自定义接口名称（来自组件配置）
        (componentName, customName) => customName,
        // 2. 去掉前缀后的驼峰命名 (如 hy-button -> IButtonEmits)
        (componentName) => {
            const baseName = componentName.replace(/^[a-z]+-/, '')
            return `I${baseName.charAt(0).toUpperCase() + baseName.slice(1)}Emits`
        },
        // 3. 完整组件名的驼峰命名 (如 hy-button -> IHyButtonEmits)
        (componentName) => {
            const camelCaseName = componentName.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
            return `I${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}Emits`
        },
        // 4. 简单命名 (如 button -> IButtonEmits)
        (componentName) => {
            const simpleName = componentName.split('-').pop()
            return `I${simpleName.charAt(0).toUpperCase() + simpleName.slice(1)}Emits`
        }
    ],

    // 特殊组件处理配置
    SPECIAL_COMPONENTS: {}
    // 注释：SPECIAL_COMPONENTS 配置已移除，所有组件现在都使用自动属性提取和事件接口匹配
}

// =========================== 辅助函数 ===========================
// 自动发现组件
function discoverComponents() {
    console.log(`\n=== 自动发现组件 (目录: ${CONFIG.COMPONENTS_DIR}) ===`)

    const components = []

    try {
        // 读取组件目录
        const componentDirs = readdirSync(CONFIG.COMPONENTS_DIR, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .filter((name) => !CONFIG.COMPONENT_DISCOVERY.exclude.includes(name))

        console.log(`发现 ${componentDirs.length} 个组件目录: ${componentDirs.join(', ')}`)

        // 为每个组件目录创建配置
        componentDirs.forEach((componentName) => {
            const componentDir = join(CONFIG.COMPONENTS_DIR, componentName)

            // 构建文件路径
            const vuePath = join(componentDir, `${componentName}${CONFIG.FILE_NAMING.vueExtension}`)
            const propsPath = join(componentDir, CONFIG.FILE_NAMING.propsFileName)

            // 检查文件是否存在
            if (existsSync(vuePath)) {
                const componentConfig = {
                    name: componentName,
                    vuePath,
                    propsPath: existsSync(propsPath) ? propsPath : null,
                    ...(CONFIG.SPECIAL_COMPONENTS[componentName] || {})
                }

                components.push(componentConfig)
                console.log(`添加组件配置: ${componentName}`)
            } else {
                console.log(`跳过目录 ${componentName}: 未找到 Vue 组件文件`)
            }
        })
    } catch (error) {
        console.error('自动发现组件失败:', error)
    }

    return components
}

// 从 props.ts 文件中提取所有属性的完整信息
function extractAllPropsFromPropsFile(propsFilePath, componentName, specialConfig = {}) {
    try {
        const content = readFileContent(propsFilePath)
        if (!content) {
            console.error(`无法读取 props 文件: ${propsFilePath}`)
            return []
        }
        const props = []
        const propNames = new Set() // 用于去重

        // 特殊处理逻辑
        if (specialConfig?.specialHandling && specialConfig?.manualProps) {
            console.log(`\n=== 特殊处理 ${componentName} 组件 ===`)
            specialConfig.manualProps.forEach((propConfig) => {
                props.push({
                    name: propConfig.name,
                    description: propConfig.description || propConfig.name,
                    type: propConfig.type,
                    values: propConfig.values || [],
                    default: propConfig.default
                })
                propNames.add(propConfig.name)
                console.log(`手动添加了 ${propConfig.name} 属性`)
            })

            console.log(`从 ${propsFilePath} 提取到 ${props.length} 个属性`)
            return props
        }

        // 首先，提取所有的 JSDoc 注释块
        const jsdocComments = []
        const jsdocRegex = /\/\*\*[\s\S]*?\*\//g
        let jsdocMatch

        while ((jsdocMatch = jsdocRegex.exec(content)) !== null) {
            jsdocComments.push({
                comment: jsdocMatch[0],
                start: jsdocMatch.index,
                end: jsdocMatch.index + jsdocMatch[0].length
            })
        }

        // 然后，提取所有的属性定义
        // 先找到 props 对象的开始和结束位置
        // 更灵活地查找 props 对象的定义，支持不同的变量名和导出方式
        const propsRegex = /(?:export\s+)?const\s+\w+\s*=\s*\{/g
        let propsMatch;
        let propsStartBrace;

        // 查找任何以 const 开头的对象定义
        while ((propsMatch = propsRegex.exec(content)) !== null) {
            // 检查这个对象是否包含 JSDoc 注释或 type 属性
            const potentialPropsObj = content.substring(propsMatch.index)
            if (potentialPropsObj.includes('type:') || potentialPropsObj.includes('/**')) {
                // 这很可能是 props 对象
                break;
            }
        }

        if (!propsMatch) {
            console.log('未找到 props 对象定义')
            return []
        }

        // 找到对象开始的大括号位置
        propsStartBrace = content.indexOf('{', propsMatch.index) + 1;

        let braceCount = 1;
        let propsEndIndex = propsStartBrace;

        // 找到匹配的结束大括号
        while (propsEndIndex < content.length && braceCount > 0) {
            if (content[propsEndIndex] === '{') braceCount++;
            if (content[propsEndIndex] === '}') braceCount--;
            propsEndIndex++;
        }

        // 提取 props 对象的内容
        const propsContent = content.substring(propsStartBrace, propsEndIndex - 1).trim()

        // 调试信息
        console.log('=== 调试信息 ===')
        console.log('propsStartBrace:', propsStartBrace)
        console.log('propsEndIndex:', propsEndIndex)
        console.log('propsContent:', propsContent)
        console.log('propsContent长度:', propsContent.length)

        // 使用正则表达式一次性提取所有属性定义
        console.log('=== 开始使用正则表达式提取属性 ===')
        
        // 匹配属性定义的正则表达式，包括可选的 JSDoc 注释
        // 模式：[可选的JSDoc注释] [空格] 属性名 : 属性内容 [空格] [可选的逗号或结束]
        // 支持两种形式：
        // 1. 属性值是对象字面量：{ type: String, default: 'primary' }
        // 2. 属性值是简单类型：String, Number, Boolean, Object as PropType<CSSProperties>
        const propRegex = /(\/\*\*[\s\S]*?\*\/)?\s*(\w+)\s*:\s*((?:\{[\s\S]*?\})|(?:[^,;\r\n]+))\s*(?:,|$)/g
        
        let propMatch;
        while ((propMatch = propRegex.exec(propsContent)) !== null) {
            const fullMatch = propMatch[0];
            const jsdocComment = propMatch[1];
            const propName = propMatch[2];
            const propValue = propMatch[3]; // 只提取属性值部分
            
            console.log(`找到属性: ${propName}`);
            
            // 调用 processProp 处理属性
            processProp(propName, jsdocComment, props, propValue);
        }
        
        console.log(`=== 正则表达式提取完成，共找到 ${props.length} 个属性 ===`)
        
        // 辅助函数：处理类型字符串
        function processType(typeString) {
            let processedType = typeString.trim()
            
            // 处理 PropType
            const propTypeMatch = 
                processedType.match(/PropType<([^>]+)>/) || 
                processedType.match(/as\s+unknown\s+as\s+PropType<([^>]+)>/) || 
                processedType.match(/as\s+PropType<([^>]+)>/) || 
                processedType.match(/as\s+([^>]+)\s*$/) || 
                processedType.match(/String\s+as\s+.*?([^\s>]+)/)
            if (propTypeMatch) {
                processedType = propTypeMatch[1]
            }
            
            // 处理类型数组（如 [Number, String]）
            if (processedType.startsWith('[') && processedType.endsWith(']')) {
                // 提取数组内容
                const arrayContent = processedType.slice(1, -1)
                // 分割类型并转换为小写
                const types = arrayContent.split(',').map((t) => {
                    const cleanedType = t.trim()
                    // 使用配置的类型映射
                    return CONFIG.TYPE_MAPPING[cleanedType] || cleanedType
                })
                // 合并为类型，使用英文逗号作为分隔符
                return types.join(', ')
            } else {
                // 处理 as 类型断言
                processedType = processedType.replace(/\s+as\s+.*$/g, '')
                
                // 使用配置的类型映射转换基本类型
                Object.keys(CONFIG.TYPE_MAPPING).forEach((originalType) => {
                    if (processedType.includes(originalType)) {
                        processedType = processedType.replace(
                            originalType,
                            CONFIG.TYPE_MAPPING[originalType]
                        )
                    }
                })
                
                // 特殊处理数组类型 (如 any[])
                if (processedType.endsWith('[]')) {
                    processedType = 'array'
                }
                
                return processedType.trim()
            }
        }
        
        // 辅助函数：处理默认值
        function extractDefaultValue(propContent) {
            const defaultIndex = propContent.indexOf('default:')
            if (defaultIndex === -1) {
                return propContent.includes('type: String') ? "''" : "''"
            }
            
            // 从default:开始，找到真正的默认值开始位置
            let start = defaultIndex + 8 // 'default:'.length
            // 跳过空格和换行符
            while (start < propContent.length && /\s/.test(propContent[start])) {
                start++
            }
            
            let end = start
            let defaultValue = ''
            
            // 专门处理箭头函数返回对象字面量的情况，特别是多行的
            if (start < propContent.length && propContent.substring(start, start + 5) === '() =>') {
                // 找到箭头函数开始的位置
                const arrowStart = start
                // 找到第一个左大括号
                const firstBrace = propContent.indexOf('{', arrowStart)
                if (firstBrace !== -1) {
                    // 寻找匹配的右大括号
                    let braceCount = 1
                    end = firstBrace + 1
                    while (end < propContent.length && braceCount > 0) {
                        if (propContent[end] === '{') braceCount++
                        if (propContent[end] === '}') braceCount--
                        end++
                    }
                    // 提取括号内的内容
                    const objContent = propContent.substring(firstBrace, end)
                    if (objContent.startsWith('{') && objContent.endsWith('}')) {
                        // 提取对象字面量作为默认值
                        defaultValue = objContent.trim()
                    }
                }
            }
            // 处理普通对象字面量
            else if (start < propContent.length && propContent[start] === '{') {
                let braceCount = 1
                end = start + 1
                while (end < propContent.length && braceCount > 0) {
                    if (propContent[end] === '{') braceCount++
                    if (propContent[end] === '}') braceCount--
                    end++
                }
                defaultValue = propContent.substring(start, end).trim()
            }
            // 处理简单类型默认值
            else if (start < propContent.length) {
                while (end < propContent.length && !/,|\n/.test(propContent[end])) {
                    end++
                }
            }
            
            // 提取默认值
            if (end > start) {
                if (!defaultValue) {
                    defaultValue = propContent.substring(start, end).trim()
                }
                // 处理可能的结尾逗号
                if (defaultValue.endsWith(',')) {
                    defaultValue = defaultValue.slice(0, -1).trim()
                }
                
                // 将多行对象转换为单行显示，去除换行符并合并多余空格
                return defaultValue.replace(/\s+/g, ' ').trim()
            } else {
                return "''"
            }
        }
        
        // 辅助函数：处理单个属性
        function processProp(propName, jsdoc, propsArray, propContent = '') {
            if (propNames.has(propName)) {
                console.log(`跳过重复属性: ${propName}`)
                return
            }
            propNames.add(propName)
            
            const propObj = {
                name: propName,
                description: '',
                type: 'unknown',
                values: [],
                default: ''
            }
            
            // 处理 JSDoc 注释
            if (jsdoc) {
                // 提取描述
                const descriptionMatch = jsdoc.match(/\/\*\*\s*([\s\S]*?)\s*(?:@|\*\/)/)
                if (descriptionMatch) {
                    propObj.description = descriptionMatch[1].replace(/\*\s?/g, '').trim()
                }
                
                // 提取 @values
                const valuesMatch = jsdoc.match(/@values\s+([^\n]+)/)
                if (valuesMatch) {
                    propObj.values = valuesMatch[1].split(',').map((v) => v.trim())
                }
            }
            
            // 处理属性内容
            if (propContent) {
                // 提取类型
                let typeStr = ''
                // 修改正则表达式，添加对 required 属性的支持
                const typeMatch = propContent.match(/type:\s*(.*?)(?:,\s*default:|,\s*required:|,\s*$|\s*$)/s)
                if (typeMatch) {
                    typeStr = typeMatch[1].trim()
                    console.log(`原始类型字符串: ${typeStr}`)
                    propObj.type = processType(typeStr)
                    console.log(`处理后的类型字符串: ${propObj.type}`)
                } else {
                    // 处理简单类型属性，如 loadingText: String
                    let simpleTypeStr = propContent.trim().replace(/\s+/g, ' ')
                    propObj.type = processType(simpleTypeStr) || 'unknown'
                }
                
                // 提取默认值
                if (propContent.includes('default:')) {
                    propObj.default = extractDefaultValue(propContent)
                } else if (propContent.includes('type: String')) {
                    propObj.default = "''"
                } else {
                    propObj.default = "''"
                }
            }
            
            propsArray.push(propObj)
        }

        console.log(`从 ${propsFilePath} 提取到 ${props.length} 个属性`)
        return props
    } catch (error) {
        console.error('解析 props 文件失败:', error)
        console.error('错误堆栈:', error.stack)
        return []
    }
}

// 从 Vue 文件中提取 emit 事件信息
function extractEmitsFromVueFile(vueFilePath, componentName, customEmitsInterface) {
    try {
        const content = readFileContent(vueFilePath)
        if (!content) {
            console.error(`无法读取 Vue 文件: ${vueFilePath}`)
            return []
        }
        const emits = []
        const eventDescriptions = {}

        // 检查是否存在typing.ts文件
        const componentDir = join(vueFilePath, '..')
        const typingFilePath = getComponentFilePath(componentDir, CONFIG.FILE_NAMING.typingFileName)

        // 调试信息 - 可以通过CONFIG控制是否显示
        if (CONFIG.DEBUG) {
            console.log(`\n=== ${componentName} 事件提取调试信息 ===`)
            console.log(`Vue文件路径: ${vueFilePath}`)
            console.log(`Typing文件路径: ${typingFilePath}`)
            console.log(`Typing文件存在: ${existsSync(typingFilePath)}`)
            console.log(`自定义事件接口名称: ${customEmitsInterface}`)
        }

        const typingContent = readFileContent(typingFilePath)
if (typingContent) {
    if (CONFIG.DEBUG) {
        console.log(`=== 从 ${typingFilePath} 提取事件描述 ===`)
    }

            // 尝试所有可能的事件接口命名模式
            let foundInterface = false
            let interfaceNameToUse = null

            // 先尝试自定义接口名称（如果提供的话）
            if (customEmitsInterface) {
                interfaceNameToUse = customEmitsInterface
                if (CONFIG.DEBUG) {
                    console.log(`使用自定义事件接口: ${interfaceNameToUse}`)
                }
            } else {
                // 1. 尝试从Vue文件中直接提取defineEmits使用的类型名称
                const emitsTypeMatch = content.match(/defineEmits<([^>]+)>/)
                if (emitsTypeMatch) {
                    interfaceNameToUse = emitsTypeMatch[1].trim()
                    if (CONFIG.DEBUG) {
                        console.log(`从Vue文件提取的事件接口: ${interfaceNameToUse}`)
                    }
                } else {
                    // 2. 如果没有提取到，则尝试配置中的命名模式
                    for (const pattern of CONFIG.EMITS_INTERFACE_PATTERNS) {
                        const candidateName = pattern(componentName, customEmitsInterface)
                        if (candidateName && typingContent.includes(candidateName)) {
                            interfaceNameToUse = candidateName
                            if (CONFIG.DEBUG) {
                                console.log(`使用匹配的模式: ${interfaceNameToUse}`)
                            }
                            break
                        }
                    }
                }
            }

            // 如果找到了合适的接口名称，提取事件
            if (interfaceNameToUse) {
                // 直接搜索接口定义
                const interfaceStart = typingContent.indexOf(
                    `export interface ${interfaceNameToUse}`
                )
                if (interfaceStart !== -1) {
                    // 找到接口结束位置
                    let braceCount = 0
                    let interfaceEnd = interfaceStart
                    let foundOpeningBrace = false

                    for (let i = interfaceStart; i < typingContent.length; i++) {
                        if (typingContent[i] === '{') {
                            braceCount++
                            foundOpeningBrace = true
                        }
                        if (typingContent[i] === '}') braceCount--

                        // 只有找到开始大括号后，才能检查结束条件
                        if (foundOpeningBrace && braceCount === 0) {
                            interfaceEnd = i + 1
                            break
                        }
                    }

                    // 提取完整接口内容
                    const fullInterfaceContent = typingContent.substring(
                        interfaceStart,
                        interfaceEnd
                    )

                    // 提取每个事件的JSDoc注释和事件名
                    let eventMatch

                    while ((eventMatch = REGEX.EVENT_WITH_COMMENT.exec(fullInterfaceContent)) !== null) {
                        const fullMatch = eventMatch[0]
                        const eventName = eventMatch[1]

                        // 提取描述
                        const descriptionMatch = fullMatch.match(/\/\*\*\s*([\s\S]*?)\s*\*\//)
                        if (descriptionMatch) {
                            const description = descriptionMatch[1].replace(/\*\s?/g, '').trim()
                            eventDescriptions[eventName] = description
                            if (CONFIG.DEBUG) {
                                console.log(`提取到事件 ${eventName} 的描述: ${description}`)
                            }
                        }
                    }

                    foundInterface = true
                }
            }

            if (!foundInterface && CONFIG.DEBUG) {
                console.log(`未找到事件接口定义`)
            }
        }

        // 合并从接口和emit调用中提取的事件
        const allEvents = new Map()

        // 1. 先添加从接口中提取的所有事件
        for (const [eventName, description] of Object.entries(eventDescriptions)) {
            allEvents.set(eventName, {
                name: eventName,
                parameters: 'event',
                description: description
            })
        }

        // 2. 再添加从emit调用中提取的事件，如果已经存在则更新描述
        const emitCallMatches = content.match(REGEX.EMIT_CALL)
        if (emitCallMatches) {
            const uniqueEmits = [
                ...new Set(emitCallMatches.map((match) => match.match(/emit\(['"]([\w-]+)['"]/)[1]))
            ]
            uniqueEmits.forEach((eventName) => {
                if (allEvents.has(eventName)) {
                    // 事件已存在，保留接口中的描述
                } else {
                    // 新增事件，使用空描述
                    allEvents.set(eventName, {
                        name: eventName,
                        parameters: 'event',
                        description: ''
                    })
                }
            })
        }

        // 将Map转换为数组
        allEvents.forEach((event) => {
            emits.push(event)
        })

        console.log(`从 ${vueFilePath} 提取到 ${emits.length} 个事件`)
        return emits
    } catch (error) {
        console.error('解析 emit 事件失败:', error)
        return []
    }
}

// 从 Vue 文件中提取 slots 信息
function extractSlotsFromVueFile(vueFilePath, componentName) {
    try {
        const content = readFileContent(vueFilePath)
        if (!content) {
            console.error(`无法读取 Vue 文件: ${vueFilePath}`)
            return []
        }
        const slots = []

        // 提取 template 中的 slot
        const templateMatch = content.match(REGEX.VUE_TEMPLATE)
        if (templateMatch) {
            const templateContent = templateMatch[1]

            // 提取所有 slot (包括默认、命名和自闭合形式)
            const allSlotMatches = templateContent.match(REGEX.ALL_SLOTS)
            if (allSlotMatches) {
                allSlotMatches.forEach((match) => {
                    // 找到该 slot 在模板中的位置
                    const slotIndex = templateContent.indexOf(match)
                    // 提取 slot 前的所有内容
                    const slotBeforeContent = templateContent.substring(0, slotIndex)
                    // 提取 slot 名称
                    const slotNameMatch = match.match(REGEX.SLOT_NAME)
                    const slotName = slotNameMatch ? slotNameMatch[1] : 'default'

                    // 提取注释内容 - 使用辅助函数
                    let slotDescription = extractComment(templateContent, slotIndex)

                    // 如果没有提取到注释，使用默认描述
                    if (!slotDescription) {
                        slotDescription =
                            slotName === 'default' ? '默认插槽' : `命名插槽: ${slotName}`
                    }

                    slots.push({
                        name: slotName,
                        description: slotDescription
                    })
                })
            }
        }

        console.log(`从 ${vueFilePath} 提取到 ${slots.length} 个插槽`)
        return slots
    } catch (error) {
        console.error('解析 slot 失败:', error)
        return []
    }
}

// 提取注释辅助函数
function extractComment(content, position) {
    // 提取位置前的所有内容
    const contentBeforePosition = content.substring(0, position)
    
    // 提取 Vue 模板注释 <!-- -->
    const vueComments = contentBeforePosition.match(REGEX.VUE_COMMENT)
    if (vueComments && vueComments.length > 0) {
        const lastVueComment = vueComments[vueComments.length - 1]
        return lastVueComment
            .replace(/^<!--/, '')
            .replace(/-->$/, '')
            .trim()
            .replace(/\s+/g, ' ')
    }

    // 提取 JSDoc 注释
    const jsdocComments = contentBeforePosition.match(REGEX.JSDOC_COMMENT)
    if (jsdocComments && jsdocComments.length > 0) {
        const lastJSDocComment = jsdocComments[jsdocComments.length - 1]
        return lastJSDocComment
            .replace(/^\/\*\*/, '')
            .replace(/\*\/$/, '')
            .replace(/\n\s*\*\s?/g, ' ')
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')
            .replace(/\s+/g, ' ')
    }

    // 提取单行注释
    const singleComments = contentBeforePosition.match(/\/\/\s*(.*?)$/gm)
    if (singleComments && singleComments.length > 0) {
        const lastSingleComment = singleComments[singleComments.length - 1]
        return lastSingleComment.replace(/^\/\/\s*/, '').trim()
    }

    return ''
}

// 从 Vue 文件中提取组件描述和 @displayName
function extractComponentInfoFromVueFile(vueFilePath) {
    try {
        const content = readFileContent(vueFilePath)
        if (!content) {
            console.error(`无法读取 Vue 文件: ${vueFilePath}`)
            return { description: '', displayName: '' }
        }
        const componentInfo = {
            description: '',
            displayName: ''
        }

        // 提取所有 JSDoc 注释
        const jsdocComments = content.match(REGEX.JSDOC_COMMENT) || []

        for (const jsdoc of jsdocComments) {
            // 提取 @displayName
            const displayNameMatch = jsdoc.match(REGEX.DISPLAY_NAME)
            if (displayNameMatch) {
                componentInfo.displayName = displayNameMatch[1].trim()

                // 提取描述
                const descriptionMatch = jsdoc.match(/\/\*\*\s*([\s\S]*?)\s*@displayName/)
                if (descriptionMatch) {
                    componentInfo.description = descriptionMatch[1].replace(/\*\s?/g, '').trim()
                } else {
                    // 如果没有找到 @displayName 前的描述，提取整个注释内容
                    componentInfo.description = jsdoc.replace(/\/\*\*|\*\/|\*\s?/g, '').trim()
                }
                break
            }
        }

        // 如果没有找到 @displayName，尝试从 name 属性中获取
        if (!componentInfo.displayName) {
            const nameMatch = content.match(REGEX.COMPONENT_NAME)
            if (nameMatch) {
                componentInfo.displayName = nameMatch[1]
            }
        }

        console.log(`从 ${vueFilePath} 提取到组件信息:`, componentInfo)
        return componentInfo
    } catch (error) {
        console.error('解析组件信息失败:', error)
        return { description: '', displayName: '' }
    }
}

// 生成 Markdown 文档的函数
function generateMarkdown(componentConfig) {
    const { vuePath, name: componentName, propsPath, ...specialConfig } = componentConfig

    // 调试信息
    if (CONFIG.DEBUG) {
        console.log(`\n=== generateMarkdown 调试信息 ===`)
        console.log(`组件名称: ${componentName}`)
        console.log(`SpecialConfig: ${JSON.stringify(specialConfig, null, 2)}`)
    }

    // 提取组件信息
    const componentInfo = extractComponentInfoFromVueFile(vuePath)
    const componentDescription = componentInfo.description
    const displayName = componentInfo.displayName || componentName

    let markdown = `# ${displayName}\n\n`

    // 添加组件描述
    if (componentDescription) {
        markdown += `${componentDescription}\n\n`
    }

    // 从 props.ts 文件中提取所有属性
    const props = propsPath
        ? extractAllPropsFromPropsFile(propsPath, componentName, specialConfig)
        : []

    // 添加 Props 表格
    if (props.length > 0) {
        markdown += '## Props\n\n'
        markdown += '| Prop name | Description | Type | Values | Default |\n'
        markdown += '| --------- | ----------- | ---- | ------ | ------- |\n'

        props.forEach((prop) => {
            const values = prop.values.length > 0 ? prop.values.join(', ') : '-'
            // 对类型字符串中的特殊字符进行转义
            const escapedType = prop.type.replace(/[\(\)\[\]\{\}]/g, '\\$&')
            // 确保默认值存在，如果不存在或为 undefined 则设置为单引号空字符串
            let defaultValue = prop.default
            if (defaultValue === undefined || defaultValue === 'undefined') {
                defaultValue = "''"
            } else {
                // 对默认值中的特殊字符进行转义
                defaultValue = defaultValue.replace(/[\(\)\[\]\{\}]/g, '\\$&')
            }
            markdown += `| ${prop.name} | ${prop.description} | ${escapedType} | ${values} | ${defaultValue} |\n`
        })

        markdown += '\n'
    }

    // 提取并添加 Emits 信息
    const emits = extractEmitsFromVueFile(vuePath, componentName, specialConfig?.emitsInterfaceName)
    if (emits.length > 0) {
        markdown += '## Emits\n\n'
        markdown += '| Event name | Parameters | Description |\n'
        markdown += '| ---------- | ---------- | ----------- |\n'

        emits.forEach((event) => {
            markdown += `| ${event.name} | ${event.parameters} | ${event.description} |\n`
        })

        markdown += '\n'
    }

    // 提取并添加 Slots 信息
    const slots = extractSlotsFromVueFile(vuePath)
    if (slots.length > 0) {
        markdown += '## Slots\n\n'
        markdown += '| Slot name | Description |\n'
        markdown += '| --------- | ----------- |\n'

        slots.forEach((slot) => {
            markdown += `| ${slot.name} | ${slot.description} |\n`
        })

        markdown += '\n'
    }

    markdown += '---\n'

    return markdown
}

// 处理单个组件的函数
async function processComponent(componentConfig) {
    const { vuePath, name: componentName } = componentConfig

    console.log(`\n===== 处理组件: ${componentName} =====`)

    try {
        // 生成 Markdown 文档
        console.log('\n=== 生成 Markdown 文档 ===')
        const markdown = generateMarkdown(componentConfig)

        // 确定输出文件路径 - 使用绝对路径确保正确性
        const outputDir = join(CONFIG.OUTPUT_DIR, componentName)
        const outputPath = join(outputDir, `${componentName}${CONFIG.FILE_NAMING.docExtension}`)

        console.log(`\n输出目录: ${outputDir}`)
        console.log(`输出路径: ${outputPath}`)

        // 创建输出目录
        mkdirSync(outputDir, { recursive: true })

        // 写入文档
        writeFileSync(outputPath, markdown, 'utf8')
        console.log(`\n文档生成成功: ${outputPath}`)

        return true
    } catch (error) {
        console.error('\n处理组件失败:', error)
        console.error('错误堆栈:', error.stack)
        return false
    }
}

// 主函数
async function main() {
    console.log('开始生成组件文档...')
    console.log(`输出目录: ${CONFIG.OUTPUT_DIR}`)

    // 获取组件列表
    const components = CONFIG.COMPONENT_DISCOVERY.enabled
        ? discoverComponents()
        : CONFIG.COMPONENT_DISCOVERY.customComponents

    console.log(`要处理的组件数量: ${components.length}`)

    // 处理所有组件
    for (const component of components) {
        await processComponent(component)
    }

    console.log('\n所有组件文档生成完成！')
}

// 执行主函数
main()
