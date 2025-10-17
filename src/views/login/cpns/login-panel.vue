<template>
  <div class="login-panel">
    <h1 class="title">凛酱后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="card" stretch>
        <!-- 帐号登录 -->
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><Avatar /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录 -->
        <el-tab-pane label="手机登录" name="mobile">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  if (newValue === false) {
    localCache.removeCache('isRemPwd')
  } else {
    localCache.setCache('isRemPwd', newValue)
  }
})

const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLogin() {
  if (activeName.value === 'account') {
    if (isRemPwd) {
      accountRef.value?.loginAction(isRemPwd.value)
    }
  } else {
    console.log('22')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .tabs {
    .label {
      display: flex;
      align-items: center;

      .text {
        margin-left: 2px;
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;

    // --el-button-size: 50px;
  }
}
</style>
