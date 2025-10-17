<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="分类商品数量">
          <pie-echart :goods-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-echart :map-data="showGoodsAddressScale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart v-bind="showGoodsCategoryScale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from '@/stores/main/analysis/analysis'
import countCard from './cpns/count-card/count-card.vue'
import { storeToRefs } from 'pinia'
import chartCard from './cpns/chart-card/chart-card.vue'
import { pieEchart, lineEchart, roseEchart, barEchart, mapEchart } from '@/components/page-echarts'
import { computed } from 'vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

const { amountList, goodsCategoryCount, goodsCateoryScale, goodsCategoryFavor, goodsAddressScale } =
  storeToRefs(analysisStore)

// 获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsCategoryScale = computed(() => {
  const labels = goodsCateoryScale.value.map((item) => item.name)
  const values = goodsCateoryScale.value.map((item) => item.goodsCount)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})

const showGoodsAddressScale = computed(() => {
  return goodsAddressScale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}

.echart {
  height: 250px;
}
</style>
