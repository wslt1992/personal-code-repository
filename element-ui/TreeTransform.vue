<template>
  <div class="container">
    <div class="tree-container">
      <div class="title">
        未授权门禁
      </div>
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        show-checkbox
        node-key="id"
      >
      </el-tree>
    </div>
    <div class="btn-container">
      <el-button
        circle
        size="medium"
        icon="el-icon-d-arrow-right"
        @click="handleRightTransform"
      ></el-button
      ><br /><br />
      <el-button
        circle
        size="medium"
        icon="el-icon-d-arrow-left"
        @click="handleLeftTransform"
      ></el-button>
    </div>

    <div class="checked-container">
      <div class="title">
        已授权门禁
      </div>
      <el-checkbox-group v-model="rightCheckedNodes">
        <div v-for="item in rightNodes" :key="item.id" class="checked-item">
          <el-checkbox :label="item" style="width: 100%;">{{
            item.label
          }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
/*
*   用法
*         <TreeTransform></TreeTransform>
*/

import _, {cloneDeep} from 'lodash'
export default {
  name: 'TreeTransform',
  data() {
    return {
      rightCheckedNodes: [],
      rightNodes: [],
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      count: 1,
    }
  },
  methods: {
    filterNode(value, data) {
      return !data.disabled
    },
    //右移动
    handleRightTransform() {
      const checkedAllNode = this.$refs.tree.getCheckedNodes(false, false)
      const checkedNode = this.$refs.tree.getCheckedNodes(true, false)
      this.setNodesDisabled(checkedAllNode)
      this.rightNodes.push(...checkedNode)
      this.rightNodes = _.uniq(this.rightNodes)
      this.treeFilter()

      this.emitChange()
    },
    // 进行过滤操作
    treeFilter() {
      this.$refs.tree.filter()
    },
    // 蒋一组node禁用
    setNodesDisabled(arr) {
      arr.map(node => {
        node.disabled = true
      })
    },
    // 启用一组node
    setNodesCancelDisabled(arr) {
      arr.map(node => {
        this.setNodeParentCancelDisabled(node)
      })
    },
    // 禁用node节点的parentNode
    setNodeParentCancelDisabled(node) {
      node.disabled = false
      const realNode = this.$refs.tree.getNode(node)

      if (realNode && realNode.parent) {
        this.setNodeParentCancelDisabled(realNode.parent.data)
      }
    },
    // 左移动
    handleLeftTransform() {
      // 1.改变标记，item将在左侧显示
      this.setNodesCancelDisabled(this.rightCheckedNodes)
      // 2.清除右侧选中的checkbox
      _.pullAllBy(this.rightNodes, this.rightCheckedNodes, 'id')
      this.rightCheckedNodes = []
      this.treeFilter()

      this.emitChange()
    },
    // 发送数据到父组件
    emitChange() {
      const ids = this.rightNodes.map(item => item.id)
      this.$emit('change', ids, cloneDeep(this.rightNodes))
    },
  },
}
</script>

<style scoped lang="less">
.container {
  display: flex;

  .tree-container,
  .checked-container {
    display: flex;
    width: 100%;
    height: 300px;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    overflow: auto;

    &:hover {
      border: 1px solid #c0c4cc;
    }

    .title {
      margin: 0 auto;
    }
  }

  .btn-container {
    width: 130px;
    margin: auto 30px;
  }

  .checked-item {
    padding-left: 8px;
  }
}
</style>
