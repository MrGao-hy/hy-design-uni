<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">省略号</view>
            <hy-table height="300" :data="tableData" :columns="columns"></hy-table>
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">插槽</view>
            <hy-table :data="tableData" :columns="columns2" stripe :row-height="80">
                <!-- 自定义操作列 -->
                <template #default="{ row, col, index }">
                    <view v-if="col.key === 'avatar'" :style="{ display: 'flex' }">
                        <hy-avatar></hy-avatar>
                    </view>
                    <text v-else>{{ row[col.key] }}</text>
                </template>
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
            </hy-table>
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">空状态</view>
            <hy-table :data="[]" :columns="columns"></hy-table>
        </view>
    </hy-config-provider>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

import HyTable from '@/package/components/hy-table/hy-table.vue'
import HyFlex from '@/package/components/hy-flex/hy-flex.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyAvatar from '@/package/components/hy-avatar/hy-avatar.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'

const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const columns = reactive([
    { title: 'ID', key: 'id', width: 40, fixed: 'left', align: 'center' },
    { title: '姓名', key: 'name', width: 80, fixed: 'left' },
    { title: '性别', key: 'sex', width: 80 },
    { title: '年龄', key: 'age', width: 80, sortable: true },
    { title: '邮箱', key: 'email', width: 200, ellipsis: true },
    { title: '地址', key: 'address', width: 200, ellipsis: true },
    { title: '电话', key: 'phone', width: 150, ellipsis: true },
    { title: '公司', key: 'company', width: 150, ellipsis: true },
    { title: '职位', key: 'position', width: 150, ellipsis: true }
])
const columns2 = reactive([
    { title: 'ID', key: 'id', width: 40, fixed: 'left', align: 'center' },
    { title: '姓名', key: 'name', width: 80, fixed: 'left' },
    { title: '头像', key: 'avatar', width: 80 },
    { title: '性别', key: 'sex', width: 80 },
    { title: '年龄', key: 'age', width: 80, sortable: true },
    { title: '邮箱', key: 'email', width: 200, ellipsis: true },
    { title: '地址', key: 'address', width: 200, ellipsis: true },
    { title: '电话', key: 'phone', width: 150, ellipsis: true },
    { title: '公司', key: 'company', width: 150, ellipsis: true },
    { title: '职位', key: 'position', width: 150, ellipsis: true },
    { title: '操作', key: 'action', width: 100, fixed: 'right' }
])
const tableData = reactive([
    {
        id: 1,
        name: '张三',
        age: 12,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'zhangsan@example.com',
        phone: '13800138001',
        company: '科技有限公司',
        position: '前端开发'
    },
    {
        id: 2,
        name: '李四',
        age: 18,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'lisi@example.com',
        phone: '13800138002',
        company: '互联网公司',
        position: '后端开发'
    },
    {
        id: 3,
        name: '王二',
        age: 28,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'wangwu@example.com',
        phone: '13800138003',
        company: '金融科技',
        position: '产品经理'
    },
    {
        id: 4,
        name: '麻子',
        age: 17,
        sex: '男',
        address: '内蒙古自治区呼伦贝尔市莫力达瓦达幹尔自治旗',
        status: 0,
        email: 'mazi@example.com',
        phone: '13800138004',
        company: '电子商务',
        position: '设计师'
    },
    {
        id: 5,
        name: '丧彪',
        age: 80,
        sex: '男',
        address: '地府',
        status: 0,
        email: 'sangbiao@example.com',
        phone: '13800138005',
        company: '冥界科技',
        position: 'CEO'
    },
    {
        id: 6,
        name: '奥德彪',
        age: 23,
        sex: '男',
        address: '非洲',
        status: 0,
        email: 'aodebiao@example.com',
        phone: '13800138006',
        company: '国际贸易',
        position: '销售经理'
    },
    {
        id: 7,
        name: '宙斯',
        age: 33,
        sex: '男',
        address: '宇宙太阳系',
        status: 0,
        email: 'zeus@example.com',
        phone: '13800138007',
        company: '奥林匹斯集团',
        position: '众神之王'
    },
    {
        id: 8,
        name: '张三',
        age: 12,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'zhangsan@example.com',
        phone: '13800138001',
        company: '科技有限公司',
        position: '前端开发'
    },
    {
        id: 9,
        name: '李四',
        age: 18,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'lisi@example.com',
        phone: '13800138002',
        company: '互联网公司',
        position: '后端开发'
    },
    {
        id: 10,
        name: '王二',
        age: 28,
        sex: '男',
        address: '安徽省合肥市肥西县',
        status: 1,
        email: 'wangwu@example.com',
        phone: '13800138003',
        company: '金融科技',
        position: '产品经理'
    },
    {
        id: 11,
        name: '麻子',
        age: 17,
        sex: '男',
        address: '内蒙古自治区呼伦贝尔市莫力达瓦达幹尔自治旗',
        status: 0,
        email: 'mazi@example.com',
        phone: '13800138004',
        company: '电子商务',
        position: '设计师'
    },
    {
        id: 12,
        name: '丧彪',
        age: 80,
        sex: '男',
        address: '地府',
        status: 0,
        email: 'sangbiao@example.com',
        phone: '13800138005',
        company: '冥界科技',
        position: 'CEO'
    },
    {
        id: 13,
        name: '奥德彪',
        age: 23,
        sex: '男',
        address: '非洲',
        status: 0,
        email: 'aodebiao@example.com',
        phone: '13800138006',
        company: '国际贸易',
        position: '销售经理'
    },
    {
        id: 14,
        name: '宙斯',
        age: 33,
        sex: '男',
        address: '宇宙太阳系',
        status: 0,
        email: 'zeus@example.com',
        phone: '13800138007',
        company: '奥林匹斯集团',
        position: '众神之王'
    }
])
</script>

<style lang="scss" scoped>
:deep(.hy-button) {
    min-width: 30px;
}
</style>
