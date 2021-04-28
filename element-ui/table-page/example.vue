<template>
  <div>
    <table-page :query="search" :url="url" uniqueKey="date">
      <template v-slot:header>
        <div style="display:flex;justify-content:space-between;margin-bottom: 30px;width: 100%">
          <span>
          名字：
          <el-input
            v-model="search.name">
          </el-input>
        </span>
          <span>
          所属组织：
          <el-input
            v-model="search.group">
          </el-input>
        </span>
<!--          <button @click="click1" type="primary" table="confirm">提交</button>-->
          <el-button type="primary" table="confirm">提交</el-button>
          <el-button type="primary" table="reset">重置</el-button>
          <el-button type="warning" table="deleterows">删除</el-button>
        </div>

      </template>
      <template v-slot:table="tableData">
        <el-table
          :data="tableData">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column label="配送信息">
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column label="地址">
              <el-table-column
                prop="province"
                label="省份"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编"
                width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px" v-copy-icon="scope.row.zip">{{ scope.row.zip }}</span>
                  <span style="margin-left: 10px" v-copy-icon="{value:scope.row.zip,tips:'点击复制邮编'}">{{ scope.row.zip }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template v-slot:footer>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </template>
    </table-page>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TableEvent } from '@/components/table/src/helper'

export default Vue.extend({
  name: 'about',
  components: {
  },
  data () {
    return {
      total: 500,
      url: 'http://localhost:8080/data.json',
      search: {
        name: '',
        group: ''
      }
    }
  },
  methods: {
    click1 () {
      console.log('click1')
    },
    handleCurrentChange (val: string) {
      console.log(`当前页: ${val}`)
    }
  }
})
</script>
<style>
.el-input {
  max-width: 100px;
}
</style>
