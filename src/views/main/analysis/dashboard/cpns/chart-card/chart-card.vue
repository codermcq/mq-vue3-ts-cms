<template>
  <div class="chart-card">
    <el-card class="box-card">
      <div class="header">
        <span>{{ props.header }}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}

const props = withDefaults(defineProps<IProps>(), {
  header: '默认标题'
})

</script>

<style scoped lang="less">
.chart-card {
  margin-top: 8px;
  background-color: #fff;

  .header {
    padding-bottom: 12px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
  }

  .content {
    padding: 15px 0;
    font-size: 14px;
    color: #999;
  }
}
</style>
