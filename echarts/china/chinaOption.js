const dataList = [
  {
    name: '南海诸岛',
    value: 10,
  },
  {
    name: '北京',
    value: 541,
  },
  {
    name: '天津',
    value: 133,
  },
  {
    name: '上海',
    value: 403,
  },
  {
    name: '重庆',
    value: 75,
  },
  {
    name: '河北',
    value: 153,
  },
  {
    name: '河南',
    value: 183,
  },
  {
    name: '云南',
    value: 611,
  },
  {
    name: '辽宁',
    value: 119,
  },
  {
    name: '黑龙江',
    value: 615,
  },
  {
    name: '湖南',
    value: 639,
  },
  {
    name: '安徽',
    value: 605,
  },
  {
    name: '山东',
    value: 239,
  },
  {
    name: '新疆',
    value: 741,
  },
  {
    name: '江苏',
    value: 331,
  },
  {
    name: '浙江',
    value: 104,
  },
  {
    name: '江西',
    value: 336,
  },
  {
    name: '湖北',
    value: 1052,
  },
  {
    name: '广西',
    value: 343,
  },
  {
    name: '甘肃',
    value: 557,
  },
  {
    name: '山西',
    value: 439,
  },
  {
    name: '内蒙古',
    value: 75,
  },
  {
    name: '陕西',
    value: 22,
  },
  {
    name: '吉林',
    value: 664,
  },
  {
    name: '福建',
    value: 718,
  },
  {
    name: '贵州',
    value: 885,
  },
  {
    name: '广东',
    value: 898,
  },
  {
    name: '青海',
    value: 1,
  },
  {
    name: '西藏',
    value: 10,
  },
  {
    name: '四川',
    value: 44,
  },
  {
    name: '宁夏',
    value: 4,
  },
  {
    name: '海南',
    value: 232,
  },
  {
    name: '台湾',
    value: 3,
  },
  {
    name: '香港',
    value: 52,
  },
  {
    name: '澳门',
    value: 5,
  },
]
export const chinaOption = {
  tooltip: {
    triggerOn: 'click',
    formatter: function(e) {
      return 0.5 == e.value
        ? e.name + '：'
        : e.seriesName + '<br />' + e.name + '：' + e.value
    },
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 26,
    bottom: 40,
    showLabel: !!0,
    text: ['高', '低'],
    inRange: {
      color: ['#fff', '#4aa6fc'],
    },
    // pieces: [
    //   {
    //     gt: 100,
    //     label: '> 100 人',
    //     color: '#7f1100',
    //   },
    //   {
    //     gte: 10,
    //     lte: 100,
    //     label: '10 - 100 人',
    //     color: '#ff5428',
    //   },
    //   {
    //     gte: 1,
    //     lt: 10,
    //     label: '1 - 9 人',
    //     color: '#ff8c71',
    //   },
    //   {
    //     gt: 0,
    //     lt: 1,
    //     label: '无',
    //     color: '#ffd768',
    //   },
    //   {
    //     value: 0,
    //     color: '#ffffff',
    //   },
    // ],
    show: !0,
  },
  geo: {
    map: 'china',
    roam: !1,
    scaleLimit: {
      min: 1,
      max: 2,
    },
    zoom: 1,
    top: 10,
    label: {
      normal: {
        show: false,
        fontSize: '14',
        color: 'rgba(0,0,0,0.7)',
      },
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      emphasis: {
        areaColor: '#f2d5ad',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
  },
  series: [
    {
      name: '浏览量',
      type: 'map',
      geoIndex: 0,
      data: dataList,
    },
  ],
}
