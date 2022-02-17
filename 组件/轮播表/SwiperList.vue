<template>
  <div class="swiper" :style="heightStyle">
    <div class="item-y-offset" :style="topStyle">
      <slot> </slot>
      <slot name="tail"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
  name: 'SwiperList',
})
export default class SwiperList extends Vue {
  @Prop({
    type: Array,
    required: true,
    // default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9],
  })
  list!: number[]

  @Prop({
    type: Number,
    required: true,
  })
  listLength!: number

  @Prop({ type: Number, required: true, default: 5 }) showLength!: number
  @Prop({ type: Number, default: 2000 }) intervalTime!: number

  /*  get listLength() {
    return this.list.length
  } */

  get showTailLength() {
    return this.showLength - 1
  }

  height = 0
  itemHeight = 0
  get heightStyle() {
    return { height: this.height + 'px' }
  }

  calculateTheHeight() {
    this.$nextTick(() => {
      const listEl = this.$el.querySelector('.item-y-offset')
      if (!listEl) {
        return
      }
      const heightTotal = listEl.clientHeight
      const itemHeight = (this.itemHeight =
        heightTotal / (this.listLength + this.showLength))
      this.height = itemHeight * this.showLength
    })
  }

  handleInterval!: any
  mounted() {
    this.calculateTheHeight()
    this.handleInterval = setInterval(() => {
      if (this.top === -this.itemHeight * this.listLength) {
        this.top = 0
        return
      }
      this.top = this.top - this.itemHeight
    }, this.intervalTime)
  }

  top = 0

  get topStyle() {
    if (this.top === -this.itemHeight * this.listLength) {
      setTimeout(() => {
        this.top = 0
      }, 1500)
      return { top: this.top + 'px' }
    }
    if (this.top === 0) {
      return { transition: 'all 0s', top: this.top + 'px' }
    }
    return {
      top: this.top + 'px',
    }
  }

  destroy() {
    clearInterval(this.handleInterval)
  }
}
</script>

<style scoped lang="less">
.swiper {
  overflow: hidden;

  .item-y-offset {
    position: relative;
    top: 0;
    transition: all 1s;
  }

  .swiper-item {
  }
}
</style>
