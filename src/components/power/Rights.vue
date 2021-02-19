<template>
  <!-- 权限列表 -->
  <div>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-table
        :data="rightsList"
        style="width: 100%;"
        :border="true"
        :stripe="true"
      >
        <!-- 索引 -->
        <el-table-column type="index"></el-table-column>
        <!-- prop="authName" 需要与响应的参数名一致 否则无法渲染 -->
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路劲"> </el-table-column>
        <el-table-column prop="pid" label="权限等级">
          <!--作用域插槽 这是el ui的特性 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0"
              >一级</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 获取所有权限列表
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
    let {data:res} =  await this.$http.get('rights/list')
    this.rightsList = res.data
    }
  },
}
</script>

<style lang="less" scoped></style>
