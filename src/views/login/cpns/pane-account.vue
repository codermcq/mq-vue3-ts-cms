<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      label-width="auto"
      :model="account"
      :rules="accountRules"
      :status-icon="true"
    >
      <el-form-item label="帐号" size="large" prop="name">
        <el-input v-model="account.name" placeholder="账户名" />
      </el-form-item>
      <el-form-item label="密码" size="large" prop="password">
        <el-input v-model="account.password" type="password" show-password placeholder="密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHENAME = 'name'
const CACHEPASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHENAME) ?? '',
  password: localCache.getCache(CACHEPASSWORD) ?? ''
})

// 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位字母或数字', trigger: 'blur' }
  ]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求
      loginStore.loginAccountLogin({ name, password }).then(() => {
        // 3.判断是否记录密码
        if (isRemPwd) {
          localCache.setCache(CACHENAME, name)
          localCache.setCache(CACHEPASSWORD, password)
        } else {
          localCache.removeCache(CACHENAME)
          localCache.removeCache(CACHEPASSWORD)
        }
      })

      ElMessage({
        message: '验证成功，欢迎登录!',
        type: 'success'
      })
    } else {
      ElMessage.error('输入的账户或密码有误!')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.home {
}
</style>
