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
  service.defaults.baseURL = 'http://localhost:8080'
  const { data } = await service.get('/v1')
  console.log(data)

  state.data1 = data[0]
  state.data2 = data[1]
  state.data3 = data[2]
  state.data4 = data[3]
  state.data5 = data[4]

  // 函数体
  myChart1.value = markRaw(echarts.init(chart1.value as HTMLDivElement))
  myChart2.value = markRaw(echarts.init(chart2.value as HTMLDivElement))
  myChart3.value = markRaw(echarts.init(chart3.value as HTMLDivElement))
  myChart4.value = markRaw(echarts.init(chart4.value as HTMLDivElement))
  myChart5.value = markRaw(echarts.init(chart5.value as HTMLDivElement))

  // 初始化data

  myChart1.value.setOption({
    title: {
      text: '分钟PV展示',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(state.data1),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(state.data1),
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
})

// 组件销毁前一定要取消监听的事情，不然会印象性能和暂用内存
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    myChart1.value.resize()
  })
})
</script>

<template>
  <div class="echarts-box">
    <div ref="chart1" :style="{ height: '300px', width: '50%' }" />
    <div ref="chart2" :style="{ height: '300px', width: '50%' }" />
    <div ref="chart3" :style="{ height: '300px', width: '50%' }" />
    <div ref="chart4" :style="{ height: '300px', width: '50%' }" />
    <div ref="chart5" :style="{ height: '300px', width: '50%' }" />
  </div>
</template>

<style scoped lang="scss">

</style>
