<script setup lang="ts">
import router from '@/router'

function godashboard() {
  router.push('/home/main')
}
function gomain() {
  router.push('/home/dashboard')
}
</script>

<template>
  <div>
    <div class="m-5 flex justify-between">
      <el-button size="large" type="primary" plain style="width: 300px;" @click="godashboard()">
        首页
      </el-button>
      <el-button size="large" type="danger" plain style="width: 300px;" @click="gomain()">
        表盘
      </el-button>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
