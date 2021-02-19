<template>
  <!-- 角色列表 -->
  <div>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolesList" style="100%;" :border="true" :stripe="true">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 格式化对象格式 -->
            <!-- <pre>{{scope.row}}</pre> -->
            <el-row
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
              :class="['b_bottom', i1 === 0 ? 'b_top' : '', 'v-center']"
            >
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="item2 in item1.children"
                  :key="item2.id"
                  :class="['b_bottom']"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 注意整个结构 不要给col加循环 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      :closable="true"
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引 -->
        <el-table-column type="index"></el-table-column>
        <!-- prop="authName" 需要与响应的参数名一致 否则无法渲染 -->
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="300px">
          <!--作用域插槽 这是el ui的特性 -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="getTreeList(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="treedialogVisible" width="50%">
      <!-- tree 树形控件 -->
      <el-tree
        :data="treeDate"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        :default-expanded-keys='defaultTree'
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="treedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="treedialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 所有角色列表数据
      rolesList:[],
      // 控制分配权限对话框显示与隐藏
      treedialogVisible: false,
      // 所有权限列表
      treeDate: '',
      // 节点
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前角色拥有的权限
      defaultTree: [101,104,105]
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
    let {data:res} =  await this.$http.get('roles')
    this.rolesList = res.data
    },
    // 根据id删除角色指定权限
    async removeRightById(role,rightid) {
    // 弹窗确认是否删除
    const resConfirm =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(()=>{})
      if(resConfirm !== 'confirm'){
        return this.$message('用户已取消删除')
      }
    // 用户已确认删除,发起请求删除
    const {data : res} = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
    console.log(res);
    if (res.meta.status !== 200) return this.$message.error('删除权限失败！')
    this.$message.success('成功删除权限')
    // 删除权限成功后 会导致重新刷新页面
    // this.getRolesList()
    // 数据更改，不重新刷新页面
    role.children = res.data
    },
    // 获取分配权限列表
    async getTreeList(row) {
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败！')
      this.treeDate = res.data
      // console.log(res.data);
      this.treedialogVisible = true
      console.log(row);
    }
  },
}
</script>

<style lang="less" scoped>
.b_bottom {
  border-bottom: 1px solid #eee;
}
.b_top {
  border-top: 1px solid #eee;
}
.el-tag {
  margin-left: 10px;
}
.v-center {
  display: flex;
  // 默认主轴为x,align-items设置y轴单行
  align-items: center;
}
</style>
