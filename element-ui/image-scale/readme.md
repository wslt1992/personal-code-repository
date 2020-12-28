图片放大缩小组件，放大后，可以上下左右拖动

```vue
<image-scale
            :src="dataDetail.imgUrl"
            :scale="auditScale"
            :height="height"
            :width="width"
          >
            <!--            <div :style="redBox"></div>-->
          </image-scale>
scale是放大倍数，1为原始大小
height可以不设置
```