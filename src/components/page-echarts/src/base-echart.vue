<template>
  <div class="base-eachrt">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import type { EChartsOption } from 'echarts';
import chinaJSON from '../data/china.json'

echarts.registerMap('china', chinaJSON as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })

  echartInstance.setOption(props.option)

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style scoped lang="less">
.base-eachrt {


}

.echart {
  height: 250px;
}
</style>
