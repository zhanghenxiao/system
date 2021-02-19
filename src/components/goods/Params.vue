<template>
  <div>
    <!-- 分类参数组件 -->
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 警告 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
      </el-alert>
      <span>选择商品分类：</span>
      <!-- 级联选择器 -->
      <el-cascader
        expand-trigger="hover"
        v-model="selectValue"
        :options="paramsList"
        :props="paramsProps"
        @change="handleChange"
      ></el-cascader>
      <!-- 标签页 -->
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" :disabled="isDisabled">添加参数</el-button>
          <el-table :data="manyTableDate" style="width: 100%;">
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" width="50">
    </el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="180px">
              <el-tag type="success" v-for="(item,i) in manyTableDate.attr_vals" :key="i"></el-tag>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="">
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" :disabled="isDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 级联选择框双向绑定到的数组
      selectValue: '',
      // 分类列表
      paramsList:[],
      // 级联选择框的配置对象
      paramsProps:{
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //
      activeName:'first',
      // 动态参数
      manyTableDate: [],

      // 静态属性
      onlyTableDate: [],
      // 
      attr_vals: [],
    }
  },
  created() {
    this.getCateParamsList()
  },
  methods: {
    // 获取分类列表
    async getCateParamsList() {
    const {data:res} = await this.$http.get('categories')

    if(res.meta.status !==200) return this.$message.error('获取分类数据失败');
    this.paramsList = res.data
    // console.log(this.paramsList);
    },
    // 级联选择框选中项变化，会触发这个函数
    handleChange(value){
      if(this.selectValue.length !==3) return this.selectValue = []
      console.log(1);
      this.getManyTableDate()

    },
    // 获取动态参数
    async getManyTableDate() {
      const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'many'}})
      if(res.meta.status !==200) return this.$message.error('获取参数失败！')

      // this.manyTableDate = res.data
      res.data.forEach(item =>{
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
      })
      console.log(res.data);
    },
    handleClick() {

    }
    

  },
  computed: {
    // 获取三级分类ID
    cateId() {
      if (this.selectValue.length === 3) return this.selectValue[2]
      return null
    },
    // isDisabled true 为禁用
    isDisabled() {
      if (this.selectValue.length !== 3) return true
      return false
    }
  },
}
</script>

<style lang="less" scoped>
.el-alert {
  margin-bottom: 15px;
}
.el-tabs {
  margin-top: 15px;
}
</style>
