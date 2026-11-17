import fg from 'fast-glob'
import { read, parse, vetur, webTypes, write, isString } from 'components-helper'
import type {
    Config,
    InstallOptions,
    NormalizeData,
    Options,
    ParseData,
    ParseTable,
    WebTypes
} from 'components-helper'

// components-helper 原生仅支持 props/events/slots/directives 四类表格，
// 本地扩展 exposes 分类用于解析 ## Exposes 章节
interface HyConfig extends Config {
    exposes: string
    exposesName: string
    exposesType: string
    exposesDescription: string
}

type HyOptions = Omit<Options, keyof HyConfig> & HyConfig

interface HyNormalizeData extends NormalizeData {
    exposes?: ParseTable
}

const config: HyConfig = {
    tags: 'tags.json',
    attributes: 'attributes.json',
    webTypes: 'web-types.json',
    titleRegExp: /#+\s+(.*)\n+([^(#|\n)]*)/g,
    tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
    fileNameRegExp: /\/((\w|-)+)\.\w+$/,
    separator: ',', // values截取
    props: 'Props',
    propsName: 'Prop name',
    propsType: 'Type',
    propsDescription: 'Description',
    propsOptions: 'Values',
    propsDefault: 'Default',
    events: 'Emits',
    eventsName: 'Event name',
    eventsDescription: 'Description',
    slots: 'slots',
    slotsName: 'Slot name',
    slotsDescription: 'Description',
    slotsType: 'Type',
    slotsSubtags: 'Subtags',
    directives: 'directives',
    directivesName: 'Name',
    directivesType: 'Type',
    directivesDescription: 'Description',
    exposes: 'Exposes',
    exposesName: 'Method',
    exposesType: 'Type',
    exposesDescription: 'Description'
}

function normalize(options: HyOptions, data: ParseData, path: string): HyNormalizeData {
    const { fileNameRegExp, props, events, slots, directives, exposes } = options
    const _fileNameRegExp = isString(fileNameRegExp) ? new RegExp(fileNameRegExp) : fileNameRegExp
    const _path = path.match(_fileNameRegExp)
    const fileName = _path ? _path[1] : ''
    const _data: NormalizeData = Object.assign(data, { path, fileName })
    const _props = new RegExp(props, 'i')
    const _events = new RegExp(events, 'i')
    const _slots = new RegExp(slots, 'i')
    const _directives = new RegExp(directives, 'i')
    const _exposes = new RegExp(exposes, 'i')

    if (!_data.table || !_data.table.length) return _data

    for (let i = 0; i < _data.table.length; i++) {
        const item = _data.table[i]
        const title = item.title
        if (!title) continue

        if (_props.test(title)) {
            setData({
                data: _data,
                item,
                path,
                fileName,
                title,
                key: 'props',
                regExp: _props
            })
        } else if (_events.test(title)) {
            setData({
                data: _data,
                item,
                path,
                fileName,
                title,
                key: 'events',
                regExp: _events
            })
        } else if (_slots.test(title)) {
            setData({
                data: _data,
                item,
                path,
                fileName,
                title,
                key: 'slots',
                regExp: _slots
            })
        } else if (_directives.test(title)) {
            setData({
                data: _data,
                item,
                path,
                fileName,
                title,
                key: 'directives',
                regExp: _directives
            })
        } else if (_exposes.test(title)) {
            setData({
                data: _data,
                item,
                path,
                fileName,
                title,
                key: 'exposes',
                regExp: _exposes
            })
        }
    }
    return _data
}

function setData({
    data,
    key,
    item,
    title,
    path,
    fileName,
    regExp
}: {
    data: HyNormalizeData
    key: 'props' | 'events' | 'slots' | 'directives' | 'exposes'
    item: ParseTable
    title: string
    path: string
    fileName: string
    regExp: RegExp
}) {
    const childTitle = title.replace(regExp, '').trim()

    if (childTitle) {
        const childHeader = data.headers?.find((item) => item.title === childTitle)
        const childItem = {
            path,
            fileName,
            title: childTitle,
            description: childHeader?.description || data.description,
            [key]: item
        }

        if (!data.children) {
            data.children = [childItem]
        } else {
            // 子项继承 HyNormalizeData，使其支持 exposes 索引（components-helper 原生 NormalizeData 无该字段）
            const child: HyNormalizeData | undefined = data.children.find((item) => item.title === childTitle)

            if (child) {
                child[key] = item
            } else {
                data.children.push(childItem)
            }
        }
    } else {
        data[key] = item
    }
}

export function generateWebTypes(options = {} as InstallOptions) {
    if (!options.entry) throw new Error('entry must be a string (non empty) or an array of strings')
    if (!options.outDir) throw new Error('outDir must be a string (non empty)')
    if (!options.name) console.warn('missing property "name"')
    if (!options.version) console.warn('missing property "version"')

    const _options: HyOptions = Object.assign(config, options)
    const files: string[] = fg.sync(_options.entry, _options.fastGlobConfig)
    const data: HyNormalizeData[] = files.map((path) => {
        const fileContent = read(path)
        const parseContent = parse(_options, fileContent)
        const content = normalize(_options, parseContent, path)
        content.description = content.description?.replace(/> /g, '')
        if (content.hasOwnProperty('props') && content?.props) {
            content.props.content = content?.props.content.map((item) => {
                // 去除多余标点符号
                item.Values = item.Values?.replace(/`|(?<![a-zA-Z0-9])-(?![a-zA-Z0-9])/g, '')
                const rawDefault = item.Default
                item.Default = rawDefault?.replace(/'/g, '')
                // 无默认值占位符（裸 -）不写入产物，真实默认值 '-'（带引号）保留
                if (!item.Default || (item.Default === '-' && rawDefault !== "'-'")) {
                    delete item.Default
                }
                return item
            })
        }
        return content
    })
    const { tags, attributes } = vetur(_options, data)
    const webTypesData = webTypes(_options, data)
    // 将 ## Exposes 表格注入 js.properties（components-helper 原生仅生成 js.events）
    injectExposes(webTypesData, _options, data)

    write(_options, 'tags', tags)
    write(_options, 'attributes', attributes)
    write(_options, 'webTypes', webTypesData)
}

/**
 * 将 Exposes 表格注入 web-types 的 js.properties 节点
 * 实例暴露的方法按 web-types 规范挂在组件 js.properties 下，与 js.events 平级
 */
function injectExposes(webTypesData: WebTypes, options: HyOptions, list: HyNormalizeData[]) {
    const exposesMap = new Map<string, ParseTable>()
    for (const item of list) {
        if (item.exposes) exposesMap.set(item.fileName, item.exposes)
    }
    if (!exposesMap.size) return

    const components = webTypesData.contributions?.html?.['vue-components'] || []
    for (const component of components) {
        const table = exposesMap.get(component.name || '')
        if (!table) continue

        const properties = table.content
            .map((item) => ({
                name: item[options.exposesName],
                description: item[options.exposesDescription]
            }))
            .filter((property) => property.name)

        if (!properties.length) continue
        if (!component.js) component.js = {}
        component.js.properties = properties
    }
}

generateWebTypes({
    entry: './dist/docs/components/**/*.md', // 你的组件路径
    outDir: 'dist', // 输出目录
    name: '@hy-app/ui', // 组件库名字
    version: '1.1.x' // 版本号
})
