<template>
  <div>

  </div>
</template>

<script>
import {chinaOption} from './chinaOption'
// 这里是关键，导入中国的图形
import 'echarts/map/js/china.js'
export default {
  name: 'FlowRecording',
  layout: 'default',
  head() {
    return {
      title: '流量统计',
    }
  },
  data() {
    return {
      tableList: [
        ['浏览量', 252, 1239],
        ['访客数', 67, 157],
        ['跳出率', '71.64%', '46.32%'],
        ['平均访问时长', '00:08:59', '00:13:01'],
        ['平均访问页数', '3.55', '6.23'],
      ],
      showContrast: true,
    }
  },
  mounted() {
    this.drawChina()
  },
  methods: {
    chinaOptions() {
      return chinaOption
    },
    drawChina() {
      let myChart = this.$echarts.init(document.getElementById('map'))
      myChart.clear()
      // 绘制图表
      myChart.setOption(this.chinaOptions())
    },
  },
}
</script>
