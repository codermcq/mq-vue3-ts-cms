import mqRequest from '@/service'

export function getAmountListData() {
  return mqRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCountData() {
  return mqRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategoryScaleData() {
  return mqRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavorData() {
  return mqRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSaleData() {
  return mqRequest.get({
    url: 'goods/address/sale'
  })
}
