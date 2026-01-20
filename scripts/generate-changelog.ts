import { execSync } from 'child_process'
import * as fs from 'fs'

// 1. 类型定义
interface TypeMap {
    [key: string]: string
}

const typeMap: TypeMap = {
    feat: '✨ 新功能',
    fix: '🐞 修复问题',
    refactor: '♻️ 重构优化',
    docs: '📚 文档变更',
    chore: '🔧 构建 | 工具变更',
    perf: '💡 性能优化',
    style: '💄 样式调整',
    test: '✅ 测试'
}

// 2. 工具函数：执行 Git 命令
const run = (cmd: string): string => {
    try {
        return execSync(cmd).toString().trim()
    } catch (e) {
        return ''
    }
}

// 3. 获取远程地址用于生成链接
const remoteUrl: string = (() => {
    let url = run('git remote get-url origin')
    if (!url) return ''
    if (url.endsWith('.git')) url = url.slice(0, -4)
    if (url.startsWith('git@')) {
        url = 'https://' + url.slice(4).replace(':', '/')
    }
    return url
})()

// 4. 获取所有标签并按版本排序
const getTags = (): string[] => {
    const tags = run('git tag --sort=-v:refname').split('\n').filter(Boolean)
    // 加入 HEAD 作为最新的未发布版本
    return ['HEAD', ...tags]
}

// 5. 获取两个区间之间的提交
const getCommitsBetween = (from: string, to?: string): string[] => {
    const range = to ? `${to}..${from}` : from
    // 获取 哈希|日期|消息
    const log = run(`git log ${range} --pretty=format:"%h|%as|%s"`)
    return log ? log.split('\n') : []
}

// 6. 核心逻辑：格式化单个版本的 Markdown
function formatVersionSection(tagName: string, commits: string[]): string {
    if (commits.length === 0) return ''

    const firstCommitLine = commits[0].split('|')
    const date = firstCommitLine[1] || new Date().toISOString().split('T')[0]

    const displayTag =
        tagName === 'HEAD' ? `v${process.env.npm_package_version || 'Next'}` : tagName

    let section = `## 🚀 ${displayTag} (${date})\n`
    const grouped: Record<string, string[]> = {}

    commits.forEach((line) => {
        const [hash, , fullMsg] = line.split('|')
        if (!fullMsg) return

        const match = fullMsg.match(/^(\w+):\s*(.+)/)
        if (!match) return

        const [, type, msg] = match
        const title = typeMap[type] || '📦 其他'

        if (!grouped[title]) grouped[title] = []

        const link = remoteUrl ? ` ([${hash}](${remoteUrl}/commit/${hash}))` : ` (${hash})`
        grouped[title].push(`- ${msg}${link}`)
    })

    if (Object.keys(grouped).length === 0) return ''

    for (const [title, items] of Object.entries(grouped)) {
        section += `### ${title}\n${items.join('\n')}\n\n`
    }
    return section
}

// 7. 主执行函数
function main(): void {
    const tags = getTags()
    let fullMarkdown = '# 📝 更新日志 (CHANGELOG)\n\n'

    for (let i = 0; i < tags.length; i++) {
        const currentTag = tags[i]
        const nextTag = tags[i + 1] // 如果是最后一个则为 undefined

        const commits = getCommitsBetween(currentTag, nextTag)
        fullMarkdown += formatVersionSection(currentTag, commits)
    }

    try {
        fs.writeFileSync('CHANGELOG.md', fullMarkdown)
        console.log('✅ 完整更新日志已重新生成。')
    } catch (err) {
        console.error('❌ 写入文件失败:', err)
    }
}

main()
