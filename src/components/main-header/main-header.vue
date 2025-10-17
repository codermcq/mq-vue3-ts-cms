<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconCLick">
      <el-icon size="28">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './cpns/header-info.vue'
import headerCrumb from './cpns/header-crumb.vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconCLick = () => {
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
