<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建数据</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border>
        <el-table-column align="center" type="selection" width="60" />
        <el-table-column align="center" type="index" width="65" label="序号" />
        <el-table-column align="center" label="用户名" prop="name" width="130" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="120" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150" />
        <el-table-column align="center" label="状态" prop="enable" width="85">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'danger'" :plain="true" size="small">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              size="small"
              text
              type="primary"
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              text
              type="danger"
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        size="small"
        layout="sizes, prev, pager, next, jumper, total"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])

// 1.发起网络请求, 请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

fetchUsersListData()

// 2.获取userlist数据, 进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchUsersListData()
}

function handleCurrentChange() {
  fetchUsersListData()
}

// 4.封装获取用户列表数据的网络请求
function fetchUsersListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const Pageinfo = { size, offset }

  // 2.发送网络请求
  const queryInfo = { ...Pageinfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 5.删除/编辑/新建操作
function handleDeleteBtnClick(id: any) {
  systemStore.deleteUserByIdAction(id)

  fetchUsersListData()
}

function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

function handleNewUserClick() {
  emit('newClick')
}

defineExpose({
  fetchUsersListData
})
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px;
    }

    .el-button--small {
      padding: 5px;
    }

    .el-button {
      margin: 0;
    }
  }
}

.pageination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
