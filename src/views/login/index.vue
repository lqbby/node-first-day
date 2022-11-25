<template>
  <div class="login-page">
    <div class="avatar">
      <el-image
        style="width: 100px; height: 100px"
        src="http://likede2-admin.itheima.net/img/logo.595745bd.png"
      />
    </div>
    <el-form ref="loginForm" :rules="rules" :model="loginForm">
      <el-form-item prop="loginName">
        <el-input
          v-model="loginForm.loginName"
          prefix-icon="el-icon-mobile"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          class="code-input"
          prefix-icon="el-icon-attract"
          placeholder="请输入验证码"
        />
        <img
          class="code-img"
          :src="`http://likede2-admin.itheima.net/likede/api/user-service/user/imageCode/${loginForm.clientToken}`"
          @click="clickCode"
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="loginbtn"
          type="primary"
          @click="login"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getimageCode } from '@/api/login'
export default {
  name: 'LoginIndex',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '', // 验证码
        clientToken: null,
        loginType: 0
      },
      iSshow: false,
      rules: {
        loginName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[a-zA-Z]{5,12}$/,
            message: '账号不能为空和英文并且长度为5-12位'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[a-zA-Z]{5,12}$/,
            message: '密码不能为空并且长度为5-12位'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          },
          { pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{4}/, message: '验证码为4位' }
        ]
      }
    }
  },
  async created() {
    const random = Math.random()
    this.loginForm.clientToken = random
  //   const { data } = await getimageCode(random)
  //   console.log(data)
  //   this.loginForm.clientToken = window.URL.createObjectURL(data).slice(27, -1)
  //   console.log(this.loginForm.clientToken)
  //   console.log('http://likede2-admin.itheima.net/likede/api/user-service/user/imageCode/' + this.loginForm.clientToken)
  },
  methods: {
    async clickCode() {
      const random = Math.random()
      console.log(random)
      this.loginForm.clientToken = random
      console.log(this.loginForm.clientToken)
      // const data = await getimageCode(this.loginForm.clientToken);
      // console.log(data.request.responseURL);
      // this.loginForm.src = data.request.responseURL
      // this.src = window.URL.createObjectURL(data);
      // console.log(this.src);
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/loginAction', this.loginForm)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(http://likede2-admin.itheima.net/img/background.be4fae7d.png)
    no-repeat center/cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .avatar {
    position: absolute;
    margin-left: 50px;
    margin-top: -50vh;
    z-index: 2;
  }
  .el-form {
    position: absolute;
    width: 550px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0rgba (30, 111, 72, 0.35);
    border-radius: 10px;

    .el-form-item {
      width: 46vh;
      margin-bottom: 20px;
      zoom: 1.4;
      .loginbtn {
        width: 46vh;
      }
      .code-input {
        width: 236px;
      }
      .code-img {
        height: 40px;
        margin-bottom: -14px;
      }
    }
  }
}
</style>
