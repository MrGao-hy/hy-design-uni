<template>
    <the-root-page>
        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">{{ t('ellipsis') }}</view>
            <hy-table height="300" :data="tableData" :columns="columns"></hy-table>
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">{{ t('slot') }}</view>
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
                        <hy-button :text="t('edit')" size="mini" plain :border="false"></hy-button>
                        <hy-button
                            type="error"
                            size="mini"
                            :text="t('delete')"
                            plain
                            :border="false"
                        ></hy-button>
                    </hy-flex>
                    <text v-else>{{ row[col.key] }}</text>
                </template>
            </hy-table>
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">{{ t('emptyState') }}</view>
            <hy-table :data="[]" :columns="columns"></hy-table>
        </view>
    </the-root-page>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { ITableColumn } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '表格'
    }
})

const { t } = useTranslate('table')
usePageTitle('table')

// 列定义（computed 包裹以响应语言切换）
const columns = computed((): ITableColumn[] => [
    { title: 'ID', key: 'id', width: 40, fixed: 'left', align: 'center' },
    { title: t('colName'), key: 'name', width: 80, fixed: 'left' },
    { title: t('colSex'), key: 'sex', width: 80 },
    { title: t('colAge'), key: 'age', width: 80, sortable: true },
    { title: t('colEmail'), key: 'email', width: 200, ellipsis: true },
    { title: t('colAddress'), key: 'address', width: 200, ellipsis: true },
    { title: t('colPhone'), key: 'phone', width: 150, ellipsis: true },
    { title: t('colCompany'), key: 'company', width: 150, ellipsis: true },
    { title: t('colPosition'), key: 'position', width: 150, ellipsis: true }
])
const columns2 = computed((): ITableColumn[] => [
    { title: 'ID', key: 'id', width: 40, fixed: 'left', align: 'center' },
    { title: t('colName'), key: 'name', width: 80, fixed: 'left' },
    { title: t('colAvatar'), key: 'avatar', width: 80 },
    { title: t('colSex'), key: 'sex', width: 80 },
    { title: t('colAge'), key: 'age', width: 80, sortable: true },
    { title: t('colEmail'), key: 'email', width: 200, ellipsis: true },
    { title: t('colAddress'), key: 'address', width: 200, ellipsis: true },
    { title: t('colPhone'), key: 'phone', width: 150, ellipsis: true },
    { title: t('colCompany'), key: 'company', width: 150, ellipsis: true },
    { title: t('colPosition'), key: 'position', width: 150, ellipsis: true },
    { title: t('colAction'), key: 'action', width: 100, fixed: 'right' }
])
// 演示数据（computed 包裹以响应语言切换）
const tableData = computed(() => [
    {
        id: 1,
        name: t('zhangSan'),
        age: 12,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'zhangsan@example.com',
        phone: '13800138001',
        company: t('companyTech'),
        position: t('positionFrontend')
    },
    {
        id: 2,
        name: t('liSi'),
        age: 18,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'lisi@example.com',
        phone: '13800138002',
        company: t('companyInternet'),
        position: t('positionBackend')
    },
    {
        id: 3,
        name: t('wangEr'),
        age: 28,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'wangwu@example.com',
        phone: '13800138003',
        company: t('companyFintech'),
        position: t('positionProduct')
    },
    {
        id: 4,
        name: t('maZi'),
        age: 17,
        sex: t('male'),
        address: t('addrHulunbeier'),
        status: 0,
        email: 'mazi@example.com',
        phone: '13800138004',
        company: t('companyEcommerce'),
        position: t('positionDesigner')
    },
    {
        id: 5,
        name: t('sangBiao'),
        age: 80,
        sex: t('male'),
        address: t('addrDifu'),
        status: 0,
        email: 'sangbiao@example.com',
        phone: '13800138005',
        company: t('companyUnderworld'),
        position: 'CEO'
    },
    {
        id: 6,
        name: t('aoDeBiao'),
        age: 23,
        sex: t('male'),
        address: t('addrAfrica'),
        status: 0,
        email: 'aodebiao@example.com',
        phone: '13800138006',
        company: t('companyTrade'),
        position: t('positionSales')
    },
    {
        id: 7,
        name: t('zeus'),
        age: 33,
        sex: t('male'),
        address: t('addrUniverse'),
        status: 0,
        email: 'zeus@example.com',
        phone: '13800138007',
        company: t('companyOlympus'),
        position: t('positionKingOfGods')
    },
    {
        id: 8,
        name: t('zhangSan'),
        age: 12,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'zhangsan@example.com',
        phone: '13800138001',
        company: t('companyTech'),
        position: t('positionFrontend')
    },
    {
        id: 9,
        name: t('liSi'),
        age: 18,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'lisi@example.com',
        phone: '13800138002',
        company: t('companyInternet'),
        position: t('positionBackend')
    },
    {
        id: 10,
        name: t('wangEr'),
        age: 28,
        sex: t('male'),
        address: t('addrFeixi'),
        status: 1,
        email: 'wangwu@example.com',
        phone: '13800138003',
        company: t('companyFintech'),
        position: t('positionProduct')
    },
    {
        id: 11,
        name: t('maZi'),
        age: 17,
        sex: t('male'),
        address: t('addrHulunbeier'),
        status: 0,
        email: 'mazi@example.com',
        phone: '13800138004',
        company: t('companyEcommerce'),
        position: t('positionDesigner')
    },
    {
        id: 12,
        name: t('sangBiao'),
        age: 80,
        sex: t('male'),
        address: t('addrDifu'),
        status: 0,
        email: 'sangbiao@example.com',
        phone: '13800138005',
        company: t('companyUnderworld'),
        position: 'CEO'
    },
    {
        id: 13,
        name: t('aoDeBiao'),
        age: 23,
        sex: t('male'),
        address: t('addrAfrica'),
        status: 0,
        email: 'aodebiao@example.com',
        phone: '13800138006',
        company: t('companyTrade'),
        position: t('positionSales')
    },
    {
        id: 14,
        name: t('zeus'),
        age: 33,
        sex: t('male'),
        address: t('addrUniverse'),
        status: 0,
        email: 'zeus@example.com',
        phone: '13800138007',
        company: t('companyOlympus'),
        position: t('positionKingOfGods')
    }
])

useShareButton()
</script>

<style lang="scss" scoped>
:deep(.hy-button) {
    min-width: 30px;
}
</style>
