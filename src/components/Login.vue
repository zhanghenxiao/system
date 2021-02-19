<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src='../assets/logo.png' alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" label-width="0px" class="login_from" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password"> 
          <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 登录框 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象 v-model
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是登录表单的验证对象 prop
      loginFormRules:{
        username: [
          { required: true, message: '请输入用户名名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // 表单重置
    resetForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    // 表单预验证,回调函数
    login() {
      this.$refs.loginFormRef.validate(async valid =>{
        if (!valid) return;
        // 解构对象别名为res ， awiat 简化promise
        let {data: res} = await this.$http.post('/login',this.loginForm)
        // if() {return 一行代码}可简写 {}
        if(res.meta.status != 200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        // 保存token 至浏览器下 seeion，token是后端传回来的，用来保持识别用户
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')

      })
    }
  },
}
</script>

<style lang="less" scoped>
.login-container{
  background-color: #2b4b6b;
  height: 100%;
  .login-box{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: #fff;
    // 单独一个盒子水平居中，定位是必须的
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    .avatar-box{
      // 头像盒子 translate(-50%,-50%)相对于 宽高的一半
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      //参数x  y 模糊距离
      box-shadow:0 0 10px #eee ;
      background-color: #fff;
      img{
        width: 100%;
        // 这个可省去
        // height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}

.login_from{
  // 移至底部
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  // 默认为content-box
  box-sizing: border-box;
}

.btns{
  display: flex;
  // 尾部开始排列
  justify-content: flex-end;
}

</style>
