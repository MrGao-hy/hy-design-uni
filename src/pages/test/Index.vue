<template>
    <view class="container">
        <view class="header">
            <text class="title">移动端表格组件示例</text>
        </view>

        <sticky-table
            :columns="columns"
            :data="tableData"
            :height="300"
            :stripe="true"
            :show-header="true"
            :sortable="true"
            @sort-change="handleSortChange"
            @row-click="handleRowClick"
        >
            <!-- 自定义操作列 -->
            <template #right="{ row, col, index }">
                <hy-flex v-if="col.key === 'action'" gap="2">
                    <hy-button text="编辑" size="mini" plain :border="false"></hy-button>
                    <hy-button
                        type="error"
                        size="mini"
                        text="删除"
                        plain
                        :border="false"
                    ></hy-button>
                </hy-flex>
                <text v-else>{{ row[col.key] }}</text>
            </template>

            <!-- 自定义表头 -->
            <template #head="{ col }">
                <hy-flex :vertical="true" align="center" v-if="col.key === 'salary'">
                    <text>{{ col.title }}</text>
                    <text :style="{ fontSize: '10px', color: '#999' }">(点击排序)</text>
                </hy-flex>
                <text v-else>{{ col.title }}</text>
            </template>
        </sticky-table>

        <view class="control-panel">
            <button class="btn" @tap="addRow">添加数据</button>
            <button class="btn" @tap="toggleStripe">切换斑马纹</button>
            <button class="btn" @tap="changeHeight">改变高度</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StickyTable from '@/package/components/hy-table/hy-table.vue'
import HyFlex from '@/package/components/hy-flex/hy-flex.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'

interface TableData {
    id: number
    name: string
    age: number
    gender: string
    department: string
    salary: number
    joinDate: string
    status: string
}

const stripe = ref(true)
const tableHeight = ref(500)

const columns = ref([
    { title: 'ID', key: 'id', width: 80 },
    { title: '姓名', key: 'name', width: 80, fixed: 'left', ellipsis: true },
    { title: '年龄', key: 'age', width: 80 },
    { title: '性别', key: 'gender', width: 80, align: 'center' },
    { title: '部门', key: 'department', width: 120, ellipsis: true },
    { title: '薪资', key: 'salary', width: 100, sortable: true, slotHeader: 'customHeader' },
    { title: '操作', key: 'action', width: 100, fixed: 'right', slot: 'action' }
])

const tableData = ref<TableData[]>([
    {
        id: 1,
        name: '张三张三张三张三',
        age: 28,
        gender: '男',
        department: '技术部',
        salary: 15000,
        joinDate: '2020-01-15',
        status: 'active'
    },
    {
        id: 2,
        name: '李四',
        age: 32,
        gender: '女',
        department: '市场部',
        salary: 12000,
        joinDate: '2019-05-20',
        status: 'inactive'
    },
    {
        id: 3,
        name: '王五',
        age: 25,
        gender: '男',
        department: '产品部',
        salary: 18000,
        joinDate: '2021-03-10',
        status: 'active'
    },
    {
        id: 4,
        name: '赵六',
        age: 35,
        gender: '女',
        department: '人力资源部',
        salary: 10000,
        joinDate: '2018-08-25',
        status: 'pending'
    },
    {
        id: 5,
        name: '孙七',
        age: 29,
        gender: '男',
        department: '财务部',
        salary: 20000,
        joinDate: '2017-11-05',
        status: 'active'
    },
    {
        id: 6,
        name: '周八',
        age: 31,
        gender: '女',
        department: '销售部',
        salary: 22000,
        joinDate: '2020-06-30',
        status: 'inactive'
    },
    {
        id: 7,
        name: '吴九',
        age: 27,
        gender: '男',
        department: '研发部',
        salary: 25000,
        joinDate: '2022-02-14',
        status: 'active'
    },
    {
        id: 8,
        name: '郑十',
        age: 33,
        gender: '女',
        department: '运营部',
        salary: 13000,
        joinDate: '2019-09-18',
        status: 'pending'
    }
])

const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    console.log('排序变化:', field, order)
    uni.showToast({
        title: `按${field} ${order === 'asc' ? '升序' : '降序'}排序`,
        icon: 'none'
    })
}

const handleRowClick = (row: TableData, index: number) => {
    console.log('点击行:', row, index)
}

const handleEdit = (row: TableData, index: number) => {
    uni.showModal({
        title: '编辑',
        content: `确定要编辑 ${row.name} 吗？`,
        success: (res) => {
            if (res.confirm) {
                console.log('编辑:', row)
                uni.showToast({
                    title: '编辑成功',
                    icon: 'success'
                })
            }
        }
    })
}

const handleDelete = (row: TableData, index: number) => {
    uni.showModal({
        title: '删除',
        content: `确定要删除 ${row.name} 吗？`,
        success: (res) => {
            if (res.confirm) {
                tableData.value.splice(index, 1)
                uni.showToast({
                    title: '删除成功',
                    icon: 'success'
                })
            }
        }
    })
}

const getStatusText = (status: string) => {
    const map: Record<string, string> = {
        active: '在职',
        inactive: '离职',
        pending: '待入职'
    }
    return map[status] || status
}

const addRow = () => {
    const newId = tableData.value.length + 1
    tableData.value.push({
        id: newId,
        name: `新员工${newId}`,
        age: Math.floor(Math.random() * 20) + 20,
        gender: Math.random() > 0.5 ? '男' : '女',
        department: ['技术部', '市场部', '产品部'][Math.floor(Math.random() * 3)],
        salary: Math.floor(Math.random() * 10000) + 10000,
        joinDate: '2023-01-01',
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)]
    })
    uni.showToast({
        title: '添加成功',
        icon: 'success'
    })
}

const toggleStripe = () => {
    stripe.value = !stripe.value
    uni.showToast({
        title: stripe.value ? '开启斑马纹' : '关闭斑马纹',
        icon: 'none'
    })
}

const changeHeight = () => {
    tableHeight.value = tableHeight.value === 500 ? 300 : 500
}
</script>

<style scoped></style>
