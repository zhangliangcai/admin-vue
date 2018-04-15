<template>
<div class="login-wrap">
  <el-form class="login-from" label-position="top" ref="form" :model="userForm" label-width="80px">
    <h2 class="heading">用户登陆</h2>
    <el-form-item label="用户名">
      <el-input
      type="" v-model="userForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
      type="password"
      v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {saveUserInfo} from '@/assets/js/auth'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 1. 采集表单数据
      // 2. 表单验证
      // 3. 发送请求执行登录
      // 4. 根据响应做交互
      const res = await this.$http.post('/login', this.userForm)
      const data = res.data
      console.log(data)
      if (data.meta.status === 200) {
        // 登录成功，我恩把服务器发给我们当前登录用户信息存储到本地本地存储
        saveUserInfo(data.data)
        // 导航到hemo组件
        this.$router.push({
          name: 'home'
        })
        // 给出登录成功的提示消息
        this.$message({
          type: 'success',
          message: '登陆成功!'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-from .login-btn {
  width: 100%;
}
</style>
