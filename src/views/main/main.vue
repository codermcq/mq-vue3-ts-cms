<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-menu :is-fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/mian-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
import { ref } from 'vue';

const isCollapse = ref(false)
function handleFoldChange(flag: boolean) {
  isCollapse.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: pointer;
    transition: width .3s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .el-header {
    // background-color: orange;
  }

  .el-main {
    background-color: #f7f8fc;
  }
}
</style>
