import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
// import Index from './pages/select'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [

      'pages/index/index',
      'pages/login/login',
      'pages/qa/index',
      'pages/select/index',
      'pages/task/index',
      'pages/task/chat',
      'pages/nearby/index',
      'pages/nearby/add',
      'pages/me/index',
      'pages/friend/index',
      'pages/integral/index'
      
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    cloud: true,
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/tab0.png",
          selectedIconPath: "./assets/images/tab_selected0.png"
        },
        {
          pagePath: "pages/friend/index",
          text: "主人",
          iconPath: "./assets/images/tab2.png",
          selectedIconPath: "./assets/images/tab_selected2.png"
        },
        {
          pagePath: "pages/me/index",
          text: "我",
          iconPath: "./assets/images/tab1.png",
          selectedIconPath: "./assets/images/tab_selected1.png"
        },
      ],
      color: '#888888',
      selectedColor: '#000000',
      backgroundColor: '#fff',
      borderStyle: 'black'
    },
    permission: {
      'scope.userLocation': {
        desc: "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
