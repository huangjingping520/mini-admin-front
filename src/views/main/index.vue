<script setup lang="ts">
import { reactive, ref } from 'vue'
import GoodsTable from './goodsTable.vue'

const queryFormRef = ref(ElForm)

const childRef = ref<any>()

const queryParams = reactive({
  keywords: '',
  status: '',
})

const value = ref('')
const options = [
  {
    value: '上新推荐',
    label: '上新推荐',
  },
  {
    value: '热门产品',
    label: '热门产品',
  },
  {
    value: '品牌推广',
    label: '品牌推广',
  },
]
</script>

<template>
  <div class="app-container">
    <div class="title search-container">
      <h2 class="m-4 text-lg">
        专题列表
      </h2>
    </div>
    <div class="pt-2 pr-4 pl-4 flex justify-between">
      <el-form ref="queryFormRef" :inline="true" :model="queryParams">
        <el-form-item prop="keywords">
          <el-input v-model="queryParams.keywords" placeholder="输入搜索关键字" clearable style="width: 200px;" />
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="value" placeholder="分类名称" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button>
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item>
          <el-button type="primary">
            <el-icon><Plus /></el-icon>
            新增专题
          </el-button>
          <el-button>
            <el-icon><Shop /></el-icon>
            分类管理
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="pt-2 pr-4 pl-4">
      <GoodsTable ref="childRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
}
.search-container {
  margin-bottom: 10px;
  background-color: rgb(182, 179, 179,0.9);
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
