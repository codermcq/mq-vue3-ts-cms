<template>
  <div class="user">
    <div class="search">
      <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
    </div>
    <div class="content">
      <user-content
        ref="contentRef"
        @new-click="handleNewClick"
        @edit-click="handleEditClick"
      ></user-content>
    </div>
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
import { ref } from 'vue'
import userModal from './cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUsersListData()
}

const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
