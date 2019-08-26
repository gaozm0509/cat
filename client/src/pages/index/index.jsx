import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Loading } from '../../components/loading'

import cat1 from '../../assets/images/cat1.png'
import cat2 from '../../assets/images/cat2.jpg'
import cat3 from '../../assets/images/cat3.jpg'
import cat4 from '../../assets/images/cat4.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      selected: -1,
      qa: 0,
      isImageTouch: false,
      selectImageTouch: false
    }
  }
  componentDidShow() {
    let id = Taro.getStorageSync('openId')
    if (!id) {
      Taro.navigateTo({
        url: '../login/login'
      })
    }
    this.getSelectStatus()
  }
  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })

  }
  componentWillMount() {


  }
  getSelectStatus = () => {
    let db = Taro.cloud.database()
    let id = Taro.getStorageSync('id')
    db.collection('users').doc(id).get({
      success: res => {
        if (res.data.selected <= 0 && res.data.qa == 1) {
          Taro.redirectTo({
            url: '../select/index'
          })
        } else {
          this.setState({
            selected: res.data.selected,
            qa: res.qa,
            isLoaded: true
          })
        }

      }
    })
  }

  goQa = () => {
    Taro.showLoading({
      title: 'loading...'
    })
    Taro.cloud.database().collection('questions').get({
      success: res => {
        Taro.hideLoading()
        Taro.navigateTo({
          url: '../qa/index?questions=' + JSON.stringify(res.data)
        })
      },
      fail: res => {
        Taro.hideLoading
        Taro.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  }

  selectImageTouch = () => {
    this.setState({
      selectImageTouch: true
    })
  }
  animationEnd = () => {
    this.setState({
      selectImageTouch: false
    })
  }

  nearby = () => {
    Taro.navigateTo({
      url: '../nearby/index?selectIndex=' + this.state.selected
    })
  }
  reSet = () => {
    Taro.navigateTo({
      url: '../task/index?selectIndex=' + this.state.selected
    })
    // const db = Taro.cloud.database()
    // let id = Taro.getStorageSync('id')
    // db.collection('users').doc(id)
    //   .update({
    //     data: {
    //       selected: 0,
    //     },
    //     success: res => {
    //       Taro.redirectTo({
    //         url: '../select/index?qa=' + 1
    //       })
    //     },
    //     fail: res => {
    //       Taro.showToast({
    //         title: res.errMsg,
    //         icon: 'none'
    //       })
    //     }
    //   })
  }


  render() {
    if (!this.state.isLoaded) {
      return (<Loading></Loading>)
    }

    if (this.state.selected > 0) {
      let images = [cat1, cat2, cat3, cat4]
      let image = images[this.state.selected - 1]
      return (
        <View className='index'>
          <Image onAnimationEnd={this.animationEnd} onClick={this.selectImageTouch} src={image} className={this.state.selectImageTouch ? 'selectImage selectImageTouch' : 'selectImage'}></Image>
          <Text className='selectDes'>
            您当前角色，属性xxx，技能xxx
          </Text>
          <Text className='nearby goQa' onClick={this.nearby}>查看附近玩家</Text>

          {/* <Text className='selectReset goQa' onClick={this.reSet}>去做任务</Text> */}
        </View>
      )
    }
    return (
      < View className='index' >
        <Text className='des'>
          欢迎来打xx世界，在探索xx世界之前，请您先创建角色。系统将通过询问您几个问题，为您创建适合的角色，点击下面按钮继续。
        </Text>
        <Text className='goQa' onClick={this.goQa}>
          开始答题
        </Text>
      </View >
    )
  }
}
