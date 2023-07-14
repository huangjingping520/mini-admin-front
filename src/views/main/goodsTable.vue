<script setup>
import { onMounted, reactive } from 'vue'
import service from '@/utils/axios'

const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
})

function handleStatus(id, status) {
  service.post(`/goods/status/${status}`, {
    ids: id ? [id] : [],
  }).then(() => {
    ElMessage.success('修改成功')
    getGoodList()
  })
}

function getGoodList() {
  state.tableData = [
    {
      goodsId: 1,
      goodsName: 'test',
      goodsIntro: 'Info',
      goodsSellStatus: '0',

    },
  ]
}

function changePage(val) {
  state.currentPage = val
  getGoodList()
}

onMounted(() => {
  getGoodList()
})
</script>

<template>
  <el-card class="good-container">
    <el-table
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="goodsId"
        label="商品编号"
      />
      <el-table-column
        prop="goodsName"
        label="商品名"
      />
      <el-table-column
        prop="goodsIntro"
        label="商品简介"
      />
      <el-table-column
        label="商品图片"
        width="150px"
      >
        <template #default="scope">
          <img :key="scope.row.goodsId" style="width: 100px; height: 100px;" src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="商品主图">
        </template>
      </el-table-column>
      <el-table-column
        prop="sellingPrice"
        label="商品售价"
      />
      <el-table-column
        label="置顶状态"
      >
        <template #default="scope">
          <span v-if="scope.row.goodsSellStatus == 0" style="color: green;">置顶</span>
          <span v-else style="color: red;">未置顶</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a v-if="scope.row.goodsSellStatus == 0" style="cursor: pointer; margin-right: 10px" @click="handleStatus(scope.row.goodsId, 1)">取消置顶</a>
          <a v-else style="cursor: pointer; margin-right: 10px" @click="handleStatus(scope.row.goodsId, 0)">
            <el-icon><i-ep-upload /></el-icon>
            置顶
          </a>
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.goodsId)">修改</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总数超过一页，再展示分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage()"
    />
  </el-card>
</template>

<style scoped lang="scss">
.good-container {
    min-height: 100%;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>
