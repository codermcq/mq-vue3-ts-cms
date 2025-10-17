<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="25" src="https://sns-webpic-qc.xhscdn.com/202510131457/ad37b09ef45e7cf4dec5eddf08a3f643/notes_pre_post/1040g3k831m3khndi5icg5n549bdlg213rms24tg!nc_n_webp_mw_1" />
          <span class="name">凛酱</span>
          <!-- <span class="name">{{ loginStore.userInfo.name }}</span> -->
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')

  ElMessage('Welcome to log in next time')
}

const loginStore = useLoginStore()
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;

  .operation {
    margin-right: 10px;
    span {
      position: relative;
      display: inline-block;
    }

    i {
      font-size: 16px;
    }

    .el-icon {
      width: 30px;
      height: 30px;
    }
  }

  .dot {
    position: absolute;
    top: -11px;
    right: -28px;
    z-index: 10;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 100%;
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }

  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
