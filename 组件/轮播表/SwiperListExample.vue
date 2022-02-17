<template>
  <div class="chart-box">
    <el-row :gutter="16" class="container-box">
      <el-card class="box-card mb-6">
        <div slot="header" class="clearfix">
          <span>房屋租赁分布</span>
        </div>
        <div :style="{ width: '100%', height: '300px' }">
          <SwiperList :list-length="10" :show-length="6">
            <div
                v-for="(item, i) in realtorData"
                :key="item.id"
                class="realtor"
            >
              <div class="flex flex-row justify-between">
                <div>
                    <span>No.{{ i + 1 }}</span
                    ><span>{{ item.name }}</span>
                </div>
                <span>{{ item.proportion + '%' }}</span>
              </div>
              <div
                  class="realtor-progress"
                  :style="{ width: item.proportion + '%' }"
              ></div>
            </div>
<!--            需要加上一个尾巴，制造一个假轮播循环，尾巴数量===需要显示的个数-->
            <template #tail>
              <div v-for="i in 6" :key="i" class="realtor">
                <div class="flex flex-row justify-between">
                  <div>
                      <span>No.{{ i }}</span
                      ><span>{{ realtorData[i - 1].name }}</span>
                  </div>
                  <span>{{ realtorData[i - 1].proportion + '%' }}</span>
                </div>
                <div
                    class="realtor-progress"
                    :style="{ width: realtorData[i - 1].proportion + '%' }"
                ></div>
              </div>
            </template>
          </SwiperList>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script lang="tsx">
import { Component } from 'vue-property-decorator'
import EntityComponent from '../../../core/entity/entity.component'
import { Echarts } from '~/shared/inc-echart'
import SwiperList from '~/pages/statistics/components/SwiperList.vue'

@Component({
  components: {
    SwiperList,
  },
})
export default class SwiperListExample extends Vue<any> {
  realtorData = [
    { name: '均安', proportion: '53' },
    { name: '杏坛', proportion: '32' },
    { name: '龙江', proportion: '29' },
    { name: '乐从', proportion: '25' },
    { name: '勒流', proportion: '23' },
    { name: '伦教', proportion: '22' },
    { name: '北滘', proportion: '20' },
    { name: '陈村', proportion: '19' },
    { name: '大良', proportion: '18' },
    { name: '容桂', proportion: '15' },
  ]

}
</script>

<style scoped lang="less">

.realtor {
  padding: 10px 20px;

  .realtor-progress {
    background-color: #1370fb;
    height: 10px;
  }
}
</style>
