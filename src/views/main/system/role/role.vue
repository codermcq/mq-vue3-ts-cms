<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    />
    <page-modal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="entrieMenus"
          @check="handlerElTreeCheck"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/stores/main/main'

import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import { mapMenusListToIds } from '@/utils/map-menus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallBack)

// 获取完整的菜单
const mainStore = useMainStore()
const { entrieMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handlerElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallBack(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenusListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped lang="less">
.role {
}
</style>
