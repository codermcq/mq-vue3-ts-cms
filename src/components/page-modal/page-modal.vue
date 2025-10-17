<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="ite in item.options">
                    <el-option :label="ite.label" :value="ite.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName" ></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
// import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

const props = defineProps<IModalProps>()

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()

const initalData: any = {}
for(const item of props.modalConfig.formItems) {
  initalData[item.prop] = ''
}
const formData = reactive<any>(initalData)

// const mainStore = useMainStore()
// const { entrieDepartments } = storeToRefs(mainStore)

function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建部门
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.点击确定的逻辑
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
    console.log(infoData)
  }

  if (!isNewRef.value && editData.value) {
    // 编辑部门数据
    systemStore.editPageDateAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 新建部门数据
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

defineExpose({
  setModalVisible
})
</script>

<style scoped lang="less">
.modal {
  .form {
    padding: 0 30px 0 0;
  }
}
</style>
