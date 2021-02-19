<template>
  <div>
    <!-- 商品列表组件 -->
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请选择日期"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table 表格 -->
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="">
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
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

    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped></style>
