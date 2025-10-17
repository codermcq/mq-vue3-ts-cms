<template>
  <div class="pie-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'

interface IPros {
  goodsData: IEchartValueType[]
}

const props = defineProps<IPros>()

const option = computed<EChartsOption>(() => {
  return {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      top: 'top'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        bottom: '-20%',
        data: props.goodsData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less">
.pie-echart {
  -webkit-box-orient: horizontal;
}
</style>
