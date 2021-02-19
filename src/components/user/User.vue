<template>
  <div>
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 layout布局 gutter间距20  -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 查询参数query  clearable清空参数-->
          <el-input
            placeholder="请输入内容"
            v-model="form.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserVisible = 'true'"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 用户列表  border边框 stripe隔行变色-->
      <el-table :data="userList" :border="true" :stripe="true">
        <!-- 索引 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 获取这整行数据 change事件是elui监测 switch的方法 -->
            <!-- {{scope.row}} -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editusername(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="romoveUserByid(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="form.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="addUserRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="提示" :visible.sync="editdialogVisible" width="50%" @close="editDialogClosed">
      <el-form
        :model="editUserForm"
        :rules="editUserRules"
        ref="editUserRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    // 自定义验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 自定义验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      // users 请求参数
      form: {
        query:'',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      // 用户列表数据
      userList:[],
      // 共有几条数据
      total: 0,
      // 控制添加用户对话框显示隐藏
      addUserVisible: false,
      // 添加用户数据绑定对象
      addUserForm:{
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户数据规则验证对象
      addUserRules:{
        username: [
          { required: true, message: '请输入用户名名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 自定义规则使用方法 validator
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制修改用户对话框显示隐藏
      editdialogVisible:false,
      // 获取用户信息
      editUserForm:{},
      // 编辑用户数据规则验证对象
      editUserRules:{
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 自定义规则使用方法 validator
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    // 获取用户列表
    async getUsersList() {
      let {data:res} =  await this.$http.get('/users',{params:this.form})
      if (res.meta.status !== 200) return this.message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 获取当前页选择几条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.form.pagesize = val
      this.getUsersList()
    },
    // 获取当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.form.pagenum = val
      this.getUsersList()
    },
    // 修改用户状态
    async changeSwitch(userinfo) {
      // console.log(userinfo);
      const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        if (res.meta.status !== 200) {
          userinfo.mg_state =!userinfo.mg_state
          return this.$message.error("状态修改失败")
        }

        this.$message.success(res.meta.msg)
    },
    // 关闭时重置添加用户表单
    addDialogClosed() {
      this.$refs.addUserRef.resetFields();
    },
    // 添加用户 使用预验证
    addUser(){
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) return this.$message.error('添加用户失败')
        const{data:res}  = await this.$http.post('/users',this.addUserForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addUserVisible = false
        // 重新获取用户列表数据
        this.getUsersList()
      })
    },
    // 编辑用户name
    async editusername(id) {
      this.editdialogVisible = true
      const {data:res} = await this.$http.get(`users/${id}`)
      this.editUserForm = res.data
    },
    // 编辑用户信息并提交 使用预验证
    edituser(){
      this.$refs.editUserRef.validate(async valid => {
        if (!valid) return this.$message.error('编辑用户信息失败')
        // 发起修改用户数据请求
        const{data:res}  = await this.$http.put(`users/${this.editUserForm.id}`,{
          // 修改提交操作
          email:this.editUserForm.email,
          mobile:this.editUserForm.mobile,
        })
        if (res.meta.status !== 200) {
          this.$message.error('编辑用户信息失败！')
        }

        this.$message.success('编辑用户信息成功！')
        // 隐藏编辑用户的对话框
        this.editdialogVisible = false
        // 刷新用户列表数据
        this.getUsersList()
      })
    },
    // 关闭时重置添加用户表单
    editDialogClosed() {
      this.$refs.editUserRef.resetFields();
    },
    // 删除用户
    async romoveUserByid(id){
      let confirm =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).catch(err => err)
      console.log(confirm);
      if (confirm !=='confirm') return this.$message.info('已取消删除')
      this.$http.delete(`users/${id}`)
      this.$message.success('已确认删除')
      this.getUsersList()
    },
  },
}
</script>

<style lang="less" scoped></style>
