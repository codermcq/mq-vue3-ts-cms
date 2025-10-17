import {
  getAmountListData,
  getGoodsAddressSaleData,
  getGoodsCategoryCountData,
  getGoodsCategoryFavorData,
  getGoodsCategoryScaleData
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCateoryScale: any[]
  goodsCategoryFavor: any[]
  goodsAddressScale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCateoryScale: [],
    goodsCategoryFavor: [],
    goodsAddressScale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amountList = res.data
      })
      getGoodsCategoryCountData().then((res) => {
        this.goodsCategoryCount = res.data
      })
      getGoodsCategoryScaleData().then((res) => {
        this.goodsCateoryScale = res.data
      })
      getGoodsCategoryFavorData().then((res) => {
        this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSaleData().then((res) => {
        this.goodsAddressScale = res.data
      })
    }
  }
})

export default useAnalysisStore
