<script setup lang="ts">

</script>

<template>
  <div>
    <div class="m-5 flex justify-between">
      <el-button size="large" type="primary" plain style="width: 300px;">
        <router-link to="/home/main">
          首页
        </router-link>
      </el-button>
      <el-button size="large" type="danger" plain style="width: 300px;">
        <router-link to="/home/dashboard">
          表盘
        </router-link>
      </el-button>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
