<template>
  <div>
    <div ref="box" :style="boxHW" class="box">
      <img
        ref="img"
        :style="position"
        :src="src"
        alt="复审图片"
        draggable="false"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ImageScaleFacade from './image-scale-facade'

export default {
  name: 'ImageScale',
  props: {
    width: {
      type: Number,
      default: 520,
    },
    height: {
      type: Number,
      default: 340,
    },
    src: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      top: 0,
      left: 0,
    }
  },
  computed: {
    position() {
      let top = this.top
      let left = this.left
      return {top: top + 'px', left: left + 'px', ...this.imgHW}
    },
    imgHW() {
      return {
        width: this.scaleWidth + 'px',
        height: this.scaleHeight + 'px',
      }
    },
    scaleWidth() {
      return this.width * this.scale
    },
    scaleHeight() {
      return this.height * this.scale
    },
    boxHW() {
      return {width: this.width + 'px', height: this.height + 'px'}
    },
  },
  watch: {
    scale: {
      /**
       *  倍数变化，重新设置边界
       * @param newValue
       */
      handler: function(newValue) {
        this.$nextTick(() => {
          this.imageScaleFacade.setScale(newValue)
        })
      },
      immediate: true,
    },
    height() {
      this.init()
    },
    width() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.imageScaleFacade.destroy()
  },
  methods: {
    init() {
      this.imageScaleFacade = new ImageScaleFacade(this, this.$refs.box)
    },
    plus() {
      this.scale += 0.1
    },
    sub() {
      this.scale -= 0.1
    },
  },
}
</script>

<style scoped lang="less">
.box {
  position: relative;
  font-size: 0;
  overflow: hidden;
  //width: 520px;
  //height: 340px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    //height: 340px;
    vertical-align: middle;
  }
}
</style>
