<template>
  <el-container>
    <!-- 这节的精华就是动态绑定 v-bind -->
    <!-- 头部 -->
    <el-header>
      <div class="header_log">
        <img src="../assets/heima.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse? '64px':'200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          active-text-color="red"
          text-color="#fff"
          :unique-opened = "true"
          :collapse = "iscollapse"
          :collapse-transition="false"
          :router = "true" 
          :default-active= "activePath"
        >
        <!-- 一级菜单  需动态绑定v-bind ='index'  让每个index值不同 达到单独展开的效果 
        ui的index 只接受字符串 故加个+ '' 转换为字符串类型-->
          <el-submenu :index="item.id + ''" v-for="item in MenuList" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 一级菜单文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级模板区 -->
            <el-menu-item :index=" '/'+ subitem.path " v-for="subitem in item.children" :key="subitem.id" @click="saveNavState('/'+ subitem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主体 -->
      <el-main>
        <!-- 实现组件嵌套 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 左侧菜单数据
      MenuList: [],
      // 左侧一级菜单图标
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠 false 默认不折叠
      iscollapse: false,
      // 高亮路由
      activePath: ''
    }
  },
  created() {
    this.getMenuList(),
    // 页面刷新再次获取高亮被点击路由
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 清除token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      let {data:res} =  await this.$http.get('/menus',()=>{})
      if (res.meta.status !=200) return this.message.error(res.meta.msg)
      this.MenuList = res.data
      // console.log(this.MenuList);
    },
    toggleCollapse() {
      this.iscollapse = !this.iscollapse
    },
    // 保存二级菜单链接高亮状态
    saveNavState(activePath) {
      this.heightPath = activePath
      window.sessionStorage.setItem('activePath',activePath)
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      font-size: 20px;
      color: #eee;
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
}
.el-header {
  background-color: #123;
}
.el-aside {
  background-color:#333744;
}

.el-main {
  background-color: #eee;
}
.el-menu {
  border-right: 0px;
}
.iconfont{
  margin-right: 10px;
}
.toggle_button{
  background-color: #4a5064;
  font-size: 10px;
  text-align: center;
  color: #fff;
  // 字母间的间距
  letter-spacing: 2px;
  cursor: pointer;
}
</style>
