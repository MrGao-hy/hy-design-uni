<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-container">
      <hy-cell title="基础使用" :list="list" @click="onClick"></hy-cell>
    </view>

    <hy-modal
      v-model="show"
      :title="mode === 'title' ? '标题' : ''"
      content="模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作"
      :showCancelButton="mode === 'showCancelButton' || mode === 'buttonReverse'"
      :buttonReverse="mode === 'buttonReverse'"
      @confirm="show = false"
      @cancel="show = false"
    ></hy-modal>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyModal from '@/package/components/hy-modal/hy-modal.vue'
import HyCell from '@/package/components/hy-cell/hy-cell.vue'
import type { CellContentVo } from 'hy-app/components/hy-cell/typing'
import { ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const show = ref(false)
const mode = ref('')

const list: CellContentVo[] = [
  { title: '基础使用', value: '' },
  { title: '有标题', value: 'title' },
  { title: '带取消按钮', value: 'showCancelButton' },
  { title: '对调按钮', value: 'buttonReverse' },
]

const onClick = (temp: CellContentVo) => {
  mode.value = temp.value!
  show.value = true
}
</script>

<style scoped lang="scss"></style>
