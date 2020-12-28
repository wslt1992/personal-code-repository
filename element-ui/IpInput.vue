<template>
  <div>
    <div class="ip-row">
      <el-input v-model="ip1" :maxlength="3" /><span>.</span>
      <el-input v-model="ip2" :maxlength="3" /><span>.</span>
      <el-input v-model="ip3" :maxlength="3" /><span>.</span>
      <el-input v-model="ip4" :maxlength="3" />
    </div>
  </div>
</template>

<script>
/**
 <IpInput v-model="active.ip"></IpInput>
 */
import {toNumber} from 'lodash'
function ipWatch(i) {
  function notify() {
    let ip = this.ip1
    for (let j = 2; j <= 4; j++) {
      const item = this['ip' + j]
      if (item !== '') {
        ip += '.' + item
      }
    }
    this.$emit('input', ip)
  }
  return function(newValue, oldValue) {
    if (newValue === '') {
      notify.apply(this)
      return
    }
    let newValueNum = toNumber(newValue)
    if (newValueNum > 255) {
      this['ip' + i] = oldValue
      notify.apply(this)
      return
    }
    if (newValueNum < 0) {
      this['ip' + i] = oldValue
      notify.apply(this)

      return
    }
    if (!newValueNum) {
      this['ip' + i] = oldValue
      notify.apply(this)
    }
    notify.apply(this)
  }
}
export default {
  name: 'IpInput',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ip1: '',
      ip2: '',
      ip3: '',
      ip4: '',
    }
  },
  watch: {
    ip1: ipWatch(1),
    ip2: ipWatch(2),
    ip3: ipWatch(3),
    ip4: ipWatch(4),
    value: {
      handler: function(newValue) {
        if (newValue === '' || !newValue) {
          return
        }
        newValue.split('.').forEach((item, index) => {
          this['ip' + (index + 1)] = item
        })
      },
    },
  },
}
</script>

<style scoped lang="less">
.ip-row {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  span {
    height: 24px;
    padding: 0 4px;
  }
}
</style>
