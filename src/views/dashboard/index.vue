<script setup lang="ts">
import * as echarts from 'echarts'
import { markRaw, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import service from '@/utils/axios'

const state = reactive({
  data1: [],
  data2: [],
  data3: [],
  data4: [],
  data5: [],
})
// 定时器变量 方便在页面销毁的时候清楚定时器
const timer = ref<any>(null)
// 页面在刷新的时候可以加loading显示 方便页面展示
const loading = ref(false)
// 使countdown定时增加 如果增加到我们想要的时间 也就是变量autoRefreshTime 执行刷新
const countdown = ref(0)
// 定时刷新的时间 现在设置的为6 也就是6秒刷新一次数据
const autoRefreshTime = ref(30)

const chart1 = ref<HTMLDivElement>()
const chart2 = ref<HTMLDivElement>()
const chart3 = ref<HTMLDivElement>()
const chart4 = ref<HTMLDivElement>()
const chart5 = ref<HTMLDivElement>()

const myChart1 = ref()
const myChart2 = ref()
const myChart3 = ref()
const myChart4 = ref()
const myChart5 = ref()

onMounted(async () => {
  // service.defaults.baseURL = 'http://localhost:8133'
  const { data } = await service.get('/api/getAllPV')
  console.log(data.totalPV)

  state.data1 = data.totalPV[0]
  state.data2 = data.totalPV[1]
  state.data3 = data.totalPV[2]
  state.data4 = data.totalPV[3]
  state.data5 = data.totalPV[4]

  // 函数体
  myChart1.value = markRaw(echarts.init(chart1.value as HTMLDivElement))
  myChart2.value = markRaw(echarts.init(chart2.value as HTMLDivElement))
  myChart3.value = markRaw(echarts.init(chart3.value as HTMLDivElement))
  myChart4.value = markRaw(echarts.init(chart4.value as HTMLDivElement))
  myChart5.value = markRaw(echarts.init(chart5.value as HTMLDivElement))

  // 初始化data

  const linedata1 = state.data1['1min']
  const linedata2 = state.data1['2min']
  const linedata3 = state.data1['3min']

  myChart1.value.setOption({
    title: {
      text: '分钟PV展示',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: ['1min', '2min', '3min'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [linedata1, linedata2, linedata3],
        type: 'line',
        smooth: true,
      },
    ],
  })
  myChart2.value.setOption({
    title: {
      text: '推广商品TOP3',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(state.data2),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(state.data2),
        type: 'bar',
        barWidth: 60,
        colorBy: 'data',
        label: {
          show: true, // 是否显示标签。
          rotate: 90, // 标签旋转。从 -90 度到 90 度。正值是逆时针。
          color: '#FFFFFF', // 文字颜色
          fontStyle: 'normal', // 文字字体风格。可选：'normal', 'italic', 'oblique'
          fontWeight: 'bold', // 文字字体粗细
          fontSize: 14, // 文字字体大小
        },
      },
    ],
  })
  myChart3.value.setOption({
    title: {
      text: '热门商品TOP3',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(state.data3),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(state.data3),
        type: 'bar',
        barWidth: 60,
        colorBy: 'data',
        label: {
          show: true, // 是否显示标签。
          rotate: 90, // 标签旋转。从 -90 度到 90 度。正值是逆时针。
          color: '#FFFFFF', // 文字颜色
          fontStyle: 'normal', // 文字字体风格。可选：'normal', 'italic', 'oblique'
          fontWeight: 'bold', // 文字字体粗细
          fontSize: 14, // 文字字体大小
        },
      },
    ],
  })
  myChart4.value.setOption({
    title: {
      text: '上新商品TOP3',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(state.data4),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(state.data4),
        type: 'bar',
        barWidth: 60,
        colorBy: 'data',
        label: {
          show: true, // 是否显示标签。
          rotate: 90, // 标签旋转。从 -90 度到 90 度。正值是逆时针。
          color: '#FFFFFF', // 文字颜色
          fontStyle: 'normal', // 文字字体风格。可选：'normal', 'italic', 'oblique'
          fontWeight: 'bold', // 文字字体粗细
          fontSize: 14, // 文字字体大小
        },

      },
    ],
  })

  // console.log(state.data5['Huawei'])
  const HuaweiData = state.data5.Huawei
  const IphoneData = state.data5.Iphone
  const qitaData = state.data5.qita
  myChart5.value.setOption({
    title: {
      text: '机型PV展示',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: HuaweiData, name: 'Huawei' },
          { value: IphoneData, name: 'Iphone' },
          { value: qitaData, name: 'qita' },

        ],
      },
    ],
  })
  // 监听页面视图变化echarts图的宽度变化
  window.addEventListener('resize', () => {
    myChart1.value.resize()
    myChart2.value.resize()
    myChart3.value.resize()
    myChart4.value.resize()
    myChart5.value.resize()
  })

  timer.value = window.setInterval(() => {
    console.log(countdown.value, 'countdown')
    // 不loading的时候才会执行
    if (!loading.value) {
      // countdown小于我们想要的定时时间的时候 定时器也是一秒执行一次 就继续+1
      if (countdown.value < autoRefreshTime.value) {
        countdown.value = countdown.value + 1
        // 当定时器到时间的时候 去干我们想干的事情 refresh()
        if (countdown.value === autoRefreshTime.value)
          refresh()
      }
    }
  }, 1000)
})

function refresh() {
  loading.value = true
  // 当然这里面可以重新获取你想要的数据，我就打印了一下
  console.log('refresh')
  location.reload()

  // 然后这个定时器可以不加，拿到想要的值后执行便可，即拿到数据后我们需要做的善后工作，重置初始值
  setTimeout(() => {
    loading.value = false
    countdown.value = 0
  }, 2000)
}

// 组件销毁前一定要取消监听的事情，不然会印象性能和暂用内存
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    myChart1.value.resize()
  })
  window.clearInterval(walletTimer)
})
</script>

<template>
  <div class="echarts-box">
    <el-row>
      <el-col :offset="6">
        <div ref="chart1" :style="{ height: '300px', width: '50%' }" />
      </el-col>
    </el-row>
    <el-row>
      <div ref="chart2" :style="{ height: '300px', width: '33%' }" />
      <div ref="chart3" :style="{ height: '300px', width: '33%' }" />
      <div ref="chart4" :style="{ height: '300px', width: '33%' }" />
    </el-row>

    <el-row>
      <el-col :offset="6">
        <div ref="chart5" :style="{ height: '300px', width: '50%' }" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
</style>
