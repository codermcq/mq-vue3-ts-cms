<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门">
              <template v-for="item in entrieDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})
const mainStore = useMainStore()
const { entrieDepartments } = storeToRefs(mainStore)

function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true
  // console.log(itemData)
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

  if (!isNewRef.value && editData.value) {
    // 编辑部门数据
    systemStore.editPageDateAction('department', editData.value.id, formData)
  } else {
    // 新建部门数据
    systemStore.newPageDataAction('department', formData)
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
