<template>
  <div :class="directionClass">
    <el-form-item
      :style="itemWidthStyle"
      :label="countryLabel"
      class="xm_flex_1"
      prop="country"
      width="100"
    >
      <el-select
        v-model="countryOptions.value"
        :allow-create="isAllowCreate"
        :filterable="isAllowCreate"
        class="xm_input_auto_100"
        placeholder="国家"
        @change="handleChangeCountry"
      >
        <el-option
          v-for="(item, index) in countryOptions.options"
          :key="index"
          :label="item.toString()"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      :style="itemWidthStyle"
      :label="cityLabel"
      el-form-item
      class="xm_flex_1"
      prop="city"
    >
      <el-select
        v-model="cityOptions.value"
        :allow-create="isAllowCreate"
        :filterable="isAllowCreate"
        class="xm_input_auto_100"
        placeholder="城市"
        @change="handleChangeCity"
      >
        <el-option
          v-for="(item, index) in cityOptions.options"
          :key="index"
          :label="item.toString()"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="isShowCommunity"
      :label="communityLabel"
      :style="itemWidthStyle"
      el-form-item
      prop="community"
    >
      <el-select
        v-model="communityOptions.value"
        :allow-create="isAllowCreate"
        :filterable="isAllowCreate"
        class="xm_input_auto_100"
        placeholder="社区"
        @change="handleChangeCommunity"
      >
        <el-option
          v-for="item in communityOptions.options"
          :key="item.communityId"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import {getCites, getCommunity, getCountries} from '~/api/country-api'
import {find} from 'lodash'


/**
 *
 *
 用法1：
 <select-address
 :country.sync="active.country"
 :city.sync="active.city"
 :is-allow-create="true"
 :is-show-community="false"
 style="width: 100%;"
 ></select-address>

 用法2：
 <select-address
 :country.sync="extraQuery.country"
 :city.sync="extraQuery.city"
 :community.sync="extraQuery.community"
 ></select-address>

 */
export default {
  name: 'SelectAddress',
  props: {
    direction: {
      type: String,
      default: 'default',
    },
    isAllowCreate: {
      type: Boolean,
      default: false,
    },
    isShowCommunity: {
      type: Boolean,
      default: true,
    },
    itemWidth: {
      type: Number,
      default: 0,
    },
    notLabel: {
      // 不显示label
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    community: {
      type: String,
      default: '',
    },
    communityId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      countryOptions: {
        options: [],
        value: this.country,
      },
      cityOptions: {
        options: [],
        value: this.city,
      },
      communityOptions: {
        options: [],
        value: this.community,
      },
    }
  },
  computed: {
    countryLabel() {
      return this.notLabel ? '' : '所属国家'
    },
    cityLabel() {
      return this.notLabel ? '' : '所属城市'
    },
    communityLabel() {
      return this.notLabel ? '' : '所属社区'
    },
    itemWidthStyle() {
      return this.itemWidth === 0 ? {} : {width: this.itemWidth + 'px'}
    },
    directionClass() {
      return this.direction === 'row'
        ? {row: true}
        : this.direction === 'column'
        ? {column: true}
        : {default: true}
    },
  },
  created() {
    this.countrySearch()
    this.initCity()
    this.initCommunity()
  },
  methods: {
    // 初始化城市选项
    initCity() {
      this.citySearch(this.country)
    },
    // 初始化社区选项
    initCommunity() {
      this.communitySearch(this.city)
    },

    countrySearch() {
      getCountries().then(data => {
        this.countryOptions.options = data
      })
    },
    citySearch(value) {
      getCites({country: value}).then(data => {
        this.cityOptions.options = data
      })
    },
    communitySearch(value) {
      if (!this.isShowCommunity) return

      getCommunity({city: value, country: this.country.value}).then(data => {
        this.communityOptions.options = data
      })
    },
    handleChangeCountry(value) {
      this.$emit('update:country', value)
      this.citySearch(value)
      this.clearCity()
      this.clearCommunity()
    },
    handleChangeCity(value) {
      this.$emit('update:city', value)
      this.communitySearch(value)
      this.clearCommunity()
    },
    handleChangeCommunity(value) {
      const options = this.communityOptions.options
      const item = find(options, {name: value}) || {name: '', communityId: ''}
      this.$emit('update:community', item.name)
      this.$emit('update:communityId', item.communityId)

      // 修改country的值，
      this.countryOptions.value = item.country || ''
      this.$emit('update:country', this.countryOptions.value)

      // 修改city的值，
      this.cityOptions.value = item.city || ''
      this.$emit('update:city', this.cityOptions.value)
    },
    clearCountry() {
      this.countryOptions.value = ''
    },
    clearCity() {
      this.cityOptions.value = ''
    },
    clearCommunity() {
      if (this.isShowCommunity) {
        this.communityOptions.value = ''
      }
    },
  },
}
</script>

<style scoped>
.el-form-item__label {
  line-height: 32px;
}

.row {
  display: flex;
  flex-direction: row;
}

.default {
  display: inline-block;
}
</style>
