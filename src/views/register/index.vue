<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'
import { registerReq } from '@/api/user'

import { elMessage } from '@/hooks/useElement'

const loginForm = reactive({
  name: '',
  password: '',
  phone: '',
  email: '',
})

const rules = {
  phone: [
    {
      required: true,
      message: '必须填写手机号',
      trigger: 'blur',
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '必须填写密码',
      trigger: 'blur',
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{10,20}$/,
      message: '密码需要10-20位，必须包含大写小写字母、数字、特殊符号四种',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '必须填写用户名',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '必须填写邮箱',
      trigger: 'blur',
    },
    {
      pattern: /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的邮箱',
      trigger: 'blur',
    },
  ],
}

const passwordType = ref('password')
const refPassword = ref()
function showPwd() {
  if (passwordType.value === 'password')
    passwordType.value = ''
  else
    passwordType.value = 'password'

  nextTick(() => {
    refPassword.value.focus()
  })
}

function resetRegisterForm() {
  loginForm.name = ''
  loginForm.password = ''
  loginForm.phone = ''
  loginForm.email = ''
}

const router = useRouter()
const errCode = '500'
function handleRegister() {
  registerReq(loginForm).then(({ data }) => {
    if (errCode.includes(data.code)) {
      elMessage(data.msg, 'error')
      resetRegisterForm()
    }
    else {
      elMessage('注册成功', 'success')
      router.push('/')
    }
  })
}

const loading = ref(false)
const register = ref(true)
</script>

<template>
  <div class="login-container columnCC">
    <div class="login-bg">
      <img src="@/assets/layout/login-bg.svg">
    </div>
    <div class="login-pane">
      <img src="@/assets/layout/login-top.svg" class="login-top">
      <img src="@/assets/layout/login-front.svg" class="login-front">
      <el-form class="login-form" :rules="rules" :model="loginForm">
        <div class="title-container">
          <h3 class="title text-center">
            Mini Admin
          </h3>
        </div>
        <el-form-item prop="name">
          <span class="svg-container">
            <el-icon :size="16"><User /></el-icon>
          </span>
          <el-input v-model="loginForm.name" placeholder="name" />
          <!-- 占位 -->
        </el-form-item>
        <el-form-item prop="phone">
          <span class="svg-container">
            <el-icon :size="16"><Iphone /></el-icon>
          </span>
          <el-input v-model="loginForm.phone" placeholder="phone" />
          <!-- 占位 -->
        </el-form-item>
        <el-form-item prop="email">
          <span class="svg-container">
            <el-icon :size="16"><Message /></el-icon>
          </span>
          <el-input v-model="loginForm.email" placeholder="email" />
          <!-- 占位 -->
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <el-icon :size="16"><Lock /></el-icon>
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="loginForm.password"
            :type="passwordType"
            name="password"
            placeholder="password"
            @keyup.enter="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item style="width: 100%;">
          <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleRegister">
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
        </el-form-item>
        <div v-if="register" style="float: right">
          <router-link class="link-type" to="/">
            已有账号去登陆
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg: #ffe4b5;
$dark_gray: #333;
$gray: #999;
$light_gray: #eee;
.login-container {
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  background-color: $bg;
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 50px;
  }
  :deep(.el-form-item) {
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 50px;
    color: #999;
    .el-form-item__content {
      position: relative;
    }
    .el-form-item__error {
      padding-left: 40px;
    }
  }
  :deep(.el-input input) {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 50px;
    padding: 10px 5px 10px 35px;
    color: #999;
    height: 42px; //此处调整item的高度
    caret-color: #999;
  }
  //hiden the input border
  :deep(.el-input__inner) {
    box-shadow: none !important;
  }
  .login-pane {
    position: relative;
    .login-top,
    .login-front {
      position: absolute;
      top: 0;
      left: 50%;
    }
    .login-top {
      z-index: 0;
      transform: translateY(-85%) translateX(-50%);
    }
    .login-front {
      z-index: 11;
      transform: translateY(-35%) translateX(-50%);
    }
  }
  .login-form {
    width: 380px;
    padding: 40px 30px;
    background: #fff;
    box-shadow: 0px 4px 16px rgba(158, 105, 25, 0.15);
    border-radius: 8px;
    position: relative;
    z-index: 10;
  }
  .title-container {
    .title {
      font-size: 18px;
      color: $dark_gray;
      margin: 0px auto 25px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.svg-container {
  padding-left: 16px;
  color: $gray;
  text-align: center;
  width: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}

//登录按钮
.login-btn {
  width: 100%;
  margin-bottom: 10px;
  --el-button-bg-color: #fbcf47;
  --el-button-border-color: #fbcf47;
  --el-button-text-color: #8f5c0e;
  --el-button-hover-text-color: #8f5c0e;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $gray;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

/*验证码*/
.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.input-icon {
  height: 39px;
  width: 14px;
  margin-left: 0px;
}
.login-code-img {
  cursor: pointer;
  width: 92px;
  height: 44px;
  border-top-right-radius: 25%;
  border-bottom-right-radius: 25%;
}
</style>
