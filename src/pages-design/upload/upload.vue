<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-upload
                :fileList="list"
                name="1"
                multiple
                :maxCount="1"
                @afterRead="afterRead"
            ></hy-upload>
        </view>

        <!-- 限制图片上传大小 -->
        <view class="hy-title">限制图片上传大小</view>
        <view class="hy-container">
            <hy-upload
                :fileList="list_2"
                :max-size="maxSize"
                @oversize="oversizeFn"
                @afterRead="afterRead_2"
            ></hy-upload>
        </view>

        <!-- 多张图片上传 -->
        <view class="hy-title">多张图片上传</view>
        <view class="hy-container">
            <hy-upload
                :fileList="list_1"
                @afterRead="afterRead_1"
                multiple
                upload-text="上传图片"
            ></hy-upload>
        </view>

        <!-- 限制只上传视频 -->
        <view class="hy-title">限制只上传视频</view>
        <view class="hy-container">
            <hy-upload
                :fileList="list_3"
                @afterRead="afterRead_3"
                upload-text="上传视频"
                accept="video"
            ></hy-upload>
        </view>

        <!-- 自定义上传按钮 -->
        <view class="hy-title">自定义上传按钮</view>
        <view class="hy-container">
            <hy-upload :fileList="list_4" @afterRead="afterRead_4">
                <view class="custom-upload-btn">
                    <hy-icon name="plus" color="#999" size="32"></hy-icon>
                    <text class="custom-upload-text">点击上传</text>
                </view>
            </hy-upload>
        </view>

        <!-- 自定义触发区域 -->
        <view class="hy-title">自定义触发区域</view>
        <view class="hy-container">
            <hy-upload :fileList="list_5" @afterRead="afterRead_5">
                <template #trigger>
                    <view class="custom-trigger">
                        <hy-icon name="upload" color="#2979ff" size="48"></hy-icon>
                        <text class="custom-trigger-text">拖拽或点击上传</text>
                    </view>
                </template>
            </hy-upload>
        </view>

        <!-- 禁用状态 -->
        <view class="hy-title">禁用状态</view>
        <view class="hy-container">
            <hy-upload :fileList="list_6" disabled>
                <view class="disabled-btn">
                    <hy-icon name="lock" color="#ccc" size="24"></hy-icon>
                    <text class="disabled-text">上传已禁用</text>
                </view>
            </hy-upload>
        </view>

        <!-- 不显示删除按钮 -->
        <view class="hy-title">不显示删除按钮</view>
        <view class="hy-container">
            <hy-upload :fileList="list_7" :deletable="false" @afterRead="afterRead_7"> </hy-upload>
        </view>

        <!-- 自定义尺寸 -->
        <view class="hy-title">自定义尺寸</view>
        <view class="hy-container">
            <hy-upload
                :fileList="list_8"
                :width="120"
                :height="120"
                upload-text="大尺寸"
                @afterRead="afterRead_8"
            ></hy-upload>
        </view>

        <!-- 上传失败状态 -->
        <view class="hy-title">上传失败状态</view>
        <view class="hy-container">
            <hy-upload :fileList="list_9"></hy-upload>
            <view class="tip-text">点击重新上传</view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { bytesToSize, isArray } from '@/package'
import { useShareButton } from '@/composables'
import type { FileVo, UploadFileParams } from '@/package/components/hy-upload/typing'
import TheRootPage from '@/components/TheRootPage.vue'

definePage({
    style: {
        navigationBarTitleText: '上传'
    }
})

const maxSize = ref(500000)
const list = ref<FileVo[]>([
    {
        status: 'success',
        message: '上传成功',
        url: 'https://img0.baidu.com/it/u=3196617431,1263013381&fm=253'
    }
])
const list_1 = ref<FileVo[]>([])
const list_2 = ref<FileVo[]>([])
const list_3 = ref<FileVo[]>([])
const list_4 = ref<FileVo[]>([])
const list_5 = ref<FileVo[]>([])
const list_6 = ref<FileVo[]>([
    {
        status: 'success',
        message: '已上传',
        url: 'https://img0.baidu.com/it/u=3196617431,1263013381&fm=253'
    }
])
const list_7 = ref<FileVo[]>([
    {
        status: 'success',
        message: '上传成功',
        url: 'https://img0.baidu.com/it/u=3196617431,1263013381&fm=253'
    }
])
const list_8 = ref<FileVo[]>([])
const list_9 = ref<FileVo[]>([
    {
        status: 'failed',
        message: '上传失败',
        url: ''
    }
])

const afterRead = (event: any) => {
    let lists = event.file
    let a = 0
    list.value.push({
        status: 'loading',
        message: '上传中',
        url: lists[0].url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list.value = [
            {
                status: 'success',
                message: '上传成功',
                url: lists[0].url,
                schedule: a
            }
        ]
    }, 3000)
}

const afterRead_1 = async (event: UploadFileParams) => {
    let lists = event.file
    if (isArray(lists)) {
        lists.forEach((item) => {
            let a = 0
            list_1.value.push({
                status: 'loading',
                message: '上传中',
                url: item.url,
                schedule: a
            })
            const index = list_1.value.findIndex((v) => v.url === item.url)
            const timer = setInterval(() => {
                a += 10
                list_1.value[index].schedule = a
            }, 300)
            setTimeout(() => {
                clearInterval(timer)
                list_1.value[index] = {
                    status: 'success',
                    message: '上传成功',
                    url: item.url,
                    schedule: a
                }
            }, 3000)
        })
    }
}

const afterRead_2 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_2.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_2.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_2.value = [
            {
                status: 'success',
                message: '上传成功',
                url: lists.url,
                schedule: a
            }
        ]
    }, 3000)
}

const afterRead_3 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_3.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_3.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_3.value = [
            {
                status: 'success',
                message: '上传成功',
                url: lists.url,
                schedule: a
            }
        ]
    }, 3000)
}

const afterRead_4 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_4.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_4.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_4.value[0] = {
            status: 'success',
            message: '上传成功',
            url: lists.url,
            schedule: a
        }
    }, 3000)
}

const afterRead_5 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_5.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_5.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_5.value[0] = {
            status: 'success',
            message: '上传成功',
            url: lists.url,
            schedule: a
        }
    }, 3000)
}

const afterRead_7 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_7.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_7.value[list_7.value.length - 1].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_7.value[list_7.value.length - 1] = {
            status: 'success',
            message: '上传成功',
            url: lists.url,
            schedule: a
        }
    }, 3000)
}

const afterRead_8 = (params: UploadFileParams) => {
    let lists = params.file as FileVo
    let a = 0
    list_8.value.push({
        status: 'loading',
        message: '上传中',
        url: lists.url,
        schedule: a
    })
    const timer = setInterval(() => {
        a += 10
        list_8.value[0].schedule = a
    }, 300)
    setTimeout(() => {
        clearInterval(timer)
        list_8.value[0] = {
            status: 'success',
            message: '上传成功',
            url: lists.url,
            schedule: a
        }
    }, 3000)
}

const oversizeFn = () => {
    uni.showToast({
        title: `图片超出${bytesToSize(maxSize.value)}限制大小`,
        icon: 'none'
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.custom-upload-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 160rpx;
    border: 2rpx dashed #d9d9d9;
    border-radius: 12rpx;

    .custom-upload-text {
        font-size: 24rpx;
        color: #999;
        margin-top: 8rpx;
    }
}

.custom-trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200rpx;
    border: 2rpx dashed #2979ff;
    border-radius: 12rpx;
    background: rgba(41, 121, 255, 0.05);

    .custom-trigger-text {
        font-size: 28rpx;
        color: #2979ff;
        margin-top: 12rpx;
    }
}

.disabled-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 160rpx;
    border: 2rpx dashed #d9d9d9;
    border-radius: 12rpx;
    background: #f5f5f5;

    .disabled-text {
        font-size: 24rpx;
        color: #ccc;
        margin-top: 8rpx;
    }
}

.tip-text {
    font-size: 24rpx;
    color: #999;
    margin-top: 12rpx;
}
</style>
