import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"

type CallFnType = (data?: any) => void

function usePageModal(newCallback?: CallFnType, editCallBack?: CallFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()

    if (newCallback) newCallback()
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallBack) {
      return editCallBack(itemData)
    }
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
