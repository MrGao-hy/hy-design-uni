// 直接使用 vue-docgen-api 和 markdown 生成器
import { parse } from 'vue-docgen-api'
import { writeFileSync, mkdirSync, readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, join, basename, extname } from 'path'
import { fileURLToPath } from 'url'
// 导入Node.js文件系统模块
import fs from 'fs';

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
    
    // 插槽提取 - 支持多种格式，包括带v-if条件的插槽
    ALL_SLOTS: /<slot\s+v-if=["']\$slots\.([^"']+)['"](?:\s+name=["']([^"']+)['"])?[^>]*?(?:\/>|<\/slot>)/g,
    SLOT_NAME: /name=["']([^"']+)['"]|v-if=["']\$slots\.([^"']+)['"]/,
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
        console.log('=== 开始提取属性 ===')
        
        // 使用基于括号匹配的智能解析方法来正确处理复杂属性值
        function parsePropsContent(content) {
            const props = [];
            let currentIndex = 0;
            
            // 提取所有JSDoc注释和对应的属性定义
            while (currentIndex < content.length) {
                // 提取JSDoc注释
                let jsdocComment = null;
                const jsdocStart = content.indexOf('/**', currentIndex);
                
                if (jsdocStart !== -1) {
                    const jsdocEnd = content.indexOf('*/', jsdocStart + 3);
                    if (jsdocEnd !== -1) {
                        jsdocComment = content.substring(jsdocStart, jsdocEnd + 2);
                        currentIndex = jsdocEnd + 2;
                    }
                }
                
                // 跳过空白字符
                currentIndex = skipWhitespace(content, currentIndex);
                
                // 提取属性名
                const propNameMatch = /^([a-zA-Z_$][a-zA-Z0-9_$]*)/.exec(content.substring(currentIndex));
                if (!propNameMatch) {
                    currentIndex++;
                    continue;
                }
                
                const propName = propNameMatch[1];
                currentIndex += propName.length;
                
                // 跳过空白字符
                currentIndex = skipWhitespace(content, currentIndex);
                
                // 查找冒号
                if (content[currentIndex] !== ':') {
                    currentIndex++;
                    continue;
                }
                currentIndex++;
                
                // 跳过空白字符
                currentIndex = skipWhitespace(content, currentIndex);
                
                // 使用括号匹配算法提取完整的属性值
                const propValueStart = currentIndex;
                currentIndex = findPropertyValueEnd(content, currentIndex);
                
                const propValue = content.substring(propValueStart, currentIndex).trim();
                
                // 跳过逗号
                currentIndex = skipWhitespace(content, currentIndex);
                if (content[currentIndex] === ',') {
                    currentIndex++;
                }
                
                props.push({
                    name: propName,
                    jsdoc: jsdocComment,
                    value: propValue
                });
            }
            
            return props;
        }
        
        // 跳过空白字符
        function skipWhitespace(content, startIndex) {
            let index = startIndex;
            while (index < content.length && /\s/.test(content[index])) {
                index++;
            }
            return index;
        }
        
        // 使用括号匹配算法查找属性值的结束位置
        function findPropertyValueEnd(content, startIndex) {
            let index = startIndex;
            let braceCount = 0;
            let bracketCount = 0;
            let parenCount = 0;
            let inString = null;
            let escapeNext = false;
            
            while (index < content.length) {
                const char = content[index];
                
                // 处理字符串
                if ((char === '\'' || char === '"') && !escapeNext) {
                    if (inString === char) {
                        inString = null;
                    } else if (inString === null) {
                        inString = char;
                    }
                }
                
                // 处理转义字符
                if (char === '\\' && escapeNext === false) {
                    escapeNext = true;
                    index++;
                    continue;
                }
                escapeNext = false;
                
                // 只有不在字符串中时才处理括号
                if (inString === null) {
                    // 对象和代码块
                    if (char === '{') braceCount++;
                    if (char === '}') braceCount--;
                    
                    // 数组
                    if (char === '[') bracketCount++;
                    if (char === ']') bracketCount--;
                    
                    // 函数调用和箭头函数参数
                    if (char === '(') parenCount++;
                    if (char === ')') parenCount--;
                    
                    // 如果所有括号都闭合了，并且遇到逗号或分号，则属性值结束
                    if (braceCount === 0 && bracketCount === 0 && parenCount === 0 && (char === ',' || char === ';' || char === '\n')) {
                        return index;
                    }
                }
                
                index++;
            }
            
            return index; // 到达文件末尾
        }
        
        // 解析属性
        const parsedProps = parsePropsContent(propsContent);
        console.log(`=== 解析完成，共找到 ${parsedProps.length} 个属性 ===`);
        
        // 处理每个解析出的属性
        parsedProps.forEach(prop => {
            processProp(prop.name, prop.jsdoc, props, prop.value);
        });
        
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
            // 查找default:关键字
            const defaultMatch = /default:\s*/.exec(propContent);
            if (!defaultMatch) {
                return propContent.includes('type: String') ? "''" : "''";
            }
            
            // 从default:后面开始提取默认值
            let start = defaultMatch.index + defaultMatch[0].length;
            
            // 使用括号匹配算法提取完整的默认值，包括复杂的箭头函数返回值
            let end = findValueEnd(propContent, start);
            let defaultValue = propContent.substring(start, end).trim();
            
            // 处理可能的结尾逗号
            if (defaultValue.endsWith(',')) {
                defaultValue = defaultValue.slice(0, -1).trim();
            }
            
            // 如果是箭头函数，尝试提取返回值
            if (defaultValue.startsWith('() =>')) {
                defaultValue = extractArrowFunctionReturnValue(defaultValue);
            }
            
            // 将多行对象转换为单行显示，去除换行符并合并多余空格
            const formattedDefaultValue = defaultValue.replace(/\s+/g, ' ').trim();
            
            // 对默认值进行转义，确保特殊字符不会破坏Markdown表格格式
            // 特别是对竖线字符(|)进行转义，它是Markdown表格的分隔符
            return formattedDefaultValue.replace(/\|/g, '\\|');
        }
        
        // 使用括号匹配算法查找值的结束位置
        function findValueEnd(content, startIndex) {
            let index = startIndex;
            let braceCount = 0;
            let bracketCount = 0;
            let parenCount = 0;
            let inString = null;
            let escapeNext = false;
            
            while (index < content.length) {
                const char = content[index];
                
                // 处理字符串
                if ((char === '\'' || char === '"') && !escapeNext) {
                    if (inString === char) {
                        inString = null;
                    } else if (inString === null) {
                        inString = char;
                    }
                }
                
                // 处理转义字符
                if (char === '\\' && escapeNext === false) {
                    escapeNext = true;
                    index++;
                    continue;
                }
                escapeNext = false;
                
                // 只有不在字符串中时才处理括号
                if (inString === null) {
                    // 对象和代码块
                    if (char === '{') braceCount++;
                    if (char === '}') braceCount--;
                    
                    // 数组
                    if (char === '[') bracketCount++;
                    if (char === ']') bracketCount--;
                    
                    // 函数调用和箭头函数参数
                    if (char === '(') parenCount++;
                    if (char === ')') parenCount--;
                    
                    // 如果所有括号都闭合了，并且遇到逗号、分号或换行，则值结束
                    if (braceCount === 0 && bracketCount === 0 && parenCount === 0 && (char === ',' || char === ';' || char === '\n')) {
                        return index;
                    }
                }
                
                index++;
            }
            
            return index; // 到达内容末尾
        }
        
        // 从箭头函数中提取返回值
        function extractArrowFunctionReturnValue(arrowFunc) {
            // 找到箭头符号
            const arrowIndex = arrowFunc.indexOf('=>');
            if (arrowIndex === -1) return arrowFunc;
            
            let returnValueStart = arrowIndex + 2;
            // 跳过箭头后面的空格
            while (returnValueStart < arrowFunc.length && /\s/.test(arrowFunc[returnValueStart])) {
                returnValueStart++;
            }
            
            // 提取从箭头后到函数结束的内容
            const returnValue = arrowFunc.substring(returnValueStart).trim();
            
            // 处理常见情况：如果返回值是数组或对象字面量，直接返回
            // 这样就不会尝试执行函数，而是显示函数返回的表达式
            return returnValue;
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
// ... existing code ...

// 提取Vue文件中的插槽信息
function extractSlotsFromVueFile(vueFilePath, componentName) {
  // 使用Node.js的fs模块读取文件内容
  const content = fs.readFileSync(vueFilePath, 'utf-8');
  
  // 创建一个集合来存储插槽名称，避免重复
  const slotNames = new Set();
  // 创建一个对象来存储插槽描述
  const slotDescriptions = {};
  
  // 1. 从模板中提取所有 <slot> 标签
  // 匹配所有的 <slot> 标签，包括命名插槽和默认插槽
  const slotRegex = /<slot\s*([^>]*)>/g;
  let match;
  while ((match = slotRegex.exec(content)) !== null) {
    const slotAttrs = match[1];
    // 提取插槽名称
    let slotName = 'default';
    const nameMatch = slotAttrs.match(/name="([^"]*)"|name='([^']*)'/);
    if (nameMatch) {
      slotName = nameMatch[1] || nameMatch[2];
    }
    
    // 尝试从注释中提取插槽描述
    let slotDesc = `自定义${slotName}插槽`;
    // 查找当前行和上一行的注释
    const lines = content.substring(0, match.index).split('\n');
    const lineNumber = lines.length;
    
    // 检查当前行是否有注释
    if (lines[lineNumber - 1].trim().startsWith('<!--')) {
      const comment = lines[lineNumber - 1].trim().replace(/<!--|-->|\s+/g, '');
      if (comment) {
        slotDesc = comment;
      }
    }
    // 如果没有，检查上一行
    else if (lineNumber > 1 && lines[lineNumber - 2].trim().startsWith('<!--')) {
      const comment = lines[lineNumber - 2].trim().replace(/<!--|-->|\s+/g, '');
      if (comment) {
        slotDesc = comment;
      }
    }
    
    // 添加到集合中
    slotNames.add(slotName);
    slotDescriptions[slotName] = slotDesc;
  }
  
  // 2. 从脚本部分提取 $slots 引用
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const scriptMatch = content.match(scriptRegex);
  if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    
    // 匹配所有 $slots.xxx 或 $scopedSlots.xxx 的引用
    const slotRefRegex = /\$(scoped)?slots\.(\w+)/g;
    let refMatch;
    while ((refMatch = slotRefRegex.exec(scriptContent)) !== null) {
      const slotName = refMatch[2];
      
      // 如果这个插槽还没有在模板中找到，则添加它
      if (!slotNames.has(slotName)) {
        slotNames.add(slotName);
        slotDescriptions[slotName] = `自定义${slotName}插槽`;
      }
    }
    
    // 匹配 v-if="$slots.xxx" 或 v-show="$slots.xxx" 的引用
    const vIfSlotRegex = /v-(if|show)=["']\$(scoped)?slots\.(\w+)["']/g;
    let vIfMatch;
    while ((vIfMatch = vIfSlotRegex.exec(content)) !== null) {
      const slotName = vIfMatch[3];
      
      if (!slotNames.has(slotName)) {
        slotNames.add(slotName);
        slotDescriptions[slotName] = `自定义${slotName}插槽`;
      }
    }
  }
  
  // 3. 从模板中查找 v-if="$slots.xxx" 或 v-show="$slots.xxx" 的条件渲染
  const templateSlotRefRegex = /v-(if|show)=["']\$(scoped)?slots\.(\w+)["']/g;
  let templateMatch;
  while ((templateMatch = templateSlotRefRegex.exec(content)) !== null) {
    const slotName = templateMatch[3];
    
    if (!slotNames.has(slotName)) {
      slotNames.add(slotName);
      slotDescriptions[slotName] = `自定义${slotName}插槽`;
    }
  }
  
  // 4. 针对hy-coupon组件的特殊处理
  if (componentName === 'hy-coupon') {
    slotNames.add('right');
    slotDescriptions['right'] = '优惠券右侧内容插槽';
    slotNames.add('button');
    slotDescriptions['button'] = '优惠券按钮插槽';
  }
  
  // 5. 将Set转换为数组并返回结果
  return Array.from(slotNames).map(name => ({
    name,
    description: slotDescriptions[name] || `自定义${name}插槽`
  }));
}

// 提取注释辅助函数
function extractComment(content, position) {
    // 提取位置前的所有内容
    const contentBeforePosition = content.substring(0, position)
    
    // 1. 尝试提取 @slot 标记的注释（优先级最高）
    // 查找所有包含 @slot 的注释
    const slotComments = contentBeforePosition.match(/(?:<!--.*?@slot.*?-->|\/\*\*.*?@slot.*?\*\*\/|\/\/.*?@slot.*?)/gs)
    if (slotComments && slotComments.length > 0) {
        const lastSlotComment = slotComments[slotComments.length - 1]
        // 提取 @slot 后面的内容
        const slotDescMatch = lastSlotComment.match(/@slot\s+(.*?)(?:$|-->|\*\*\/|\*\/)/s)
        if (slotDescMatch) {
            return slotDescMatch[1].trim().replace(/\s+/g, ' ')
        }
    }
    
    // 2. 提取 Vue 模板注释 <!-- -->
    const vueComments = contentBeforePosition.match(REGEX.VUE_COMMENT)
    if (vueComments && vueComments.length > 0) {
        // 反向搜索，找到离 slot 最近的注释
        for (let i = vueComments.length - 1; i >= 0; i--) {
            const comment = vueComments[i]
            const commentPos = contentBeforePosition.lastIndexOf(comment)
            // 确保注释在 slot 前面且距离不太远（100个字符内）
            if (position - commentPos < 100) {
                return comment
                    .replace(/^<!--/, '')
                    .replace(/-->$/, '')
                    .trim()
                    .replace(/\s+/g, ' ')
            }
        }
    }

    // 3. 提取 JSDoc 注释
    const jsdocComments = contentBeforePosition.match(REGEX.JSDOC_COMMENT)
    if (jsdocComments && jsdocComments.length > 0) {
        // 反向搜索，找到离 slot 最近的 JSDoc 注释
        for (let i = jsdocComments.length - 1; i >= 0; i--) {
            const comment = jsdocComments[i]
            const commentPos = contentBeforePosition.lastIndexOf(comment)
            if (position - commentPos < 100) {
                return comment
                    .replace(/^\/\*\*/, '')
                    .replace(/\*\/$/, '')
                    .replace(/\n\s*\*\s?/g, ' ')
                    .replace(/^\s+/, '')
                    .replace(/\s+$/, '')
                    .replace(/\s+/g, ' ')
            }
        }
    }

    // 4. 提取单行注释，特别处理包含"自定义"的注释
    const singleComments = contentBeforePosition.match(/\/\/\s*(.*?)$/gm)
    if (singleComments && singleComments.length > 0) {
        // 反向搜索，优先匹配包含"自定义"或"插槽"的注释
        for (let i = singleComments.length - 1; i >= 0; i--) {
            const comment = singleComments[i]
            const commentPos = contentBeforePosition.lastIndexOf(comment)
            if (position - commentPos < 100) {
                // 如果注释包含"自定义"或"插槽"，优先使用
                if (comment.includes('自定义') || comment.includes('插槽')) {
                    return comment.replace(/^\/\/\s*/, '').trim()
                }
            }
        }
        // 如果没有找到包含特定关键词的注释，使用最后一个单行注释
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
                // 对默认值进行转义，确保特殊字符不会破坏Markdown表格格式
                // 特别是对竖线字符(|)进行转义，它是Markdown表格的分隔符
                defaultValue = defaultValue.replace(/\|/g, '\\|')
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
    const slots = extractSlotsFromVueFile(vuePath, componentName)
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

    console.log(`\n\n==========================================`);
    console.log(`开始处理组件: ${componentName}`);
    console.log(`组件路径: ${vuePath}`);
    console.log(`==========================================\n`);
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
