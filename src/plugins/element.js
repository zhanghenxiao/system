import Vue from 'vue'
import { 
  Button,Form, FormItem,Input,
  Container,Header,Aside,Main,
  Menu, Submenu, MenuItem,
  Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,MessageBox,
  Tag,Tree,Alert,Cascader,Tabs,TabPane
} from 'element-ui'
import { Message } from 'element-ui'

Vue.use(Button)
// 不能以Vue.use(Form，FormItem)这样方式导出样式不会生效
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Tabs)
Vue.use(TabPane)






Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

