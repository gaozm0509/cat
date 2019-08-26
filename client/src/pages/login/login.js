import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import '../login/login.scss'

export default class Login extends Taro.Component {

    config = {
        navigationBarTitleText: '登录'
    }
    constructor(props) {
        super(props)
    }
    componentWillMount() { }

    componentDidMount() {
    }
    

    getLogin = () => {
        return new Promise((resolve, reject) => {
            Taro.cloud
                .callFunction({
                    name: "login",
                    data: {}
                })
                .then(res => {
                    resolve(res.result)
                })
                .catch(e => {
                    reject(e)
                })
        })

    }

    db_addUserInfo = (userInfo) => {
        let db = Taro.cloud.database()
        db.collection('users').add({
            data: userInfo,
            success: res => {
                Taro.setStorageSync('id', res._id)
                Taro.hideLoading()
                // Taro.redirectTo({
                //     url: '../index/index'
                // })
                Taro.navigateBack()
            },
            fail: res => {
                Taro.hideLoading()
                Taro.showToast({
                    title: res.errMsg,
                    icon: 'none'
                })
            }
        })
    }

    getUserInfo = () => {
        Taro.showLoading({
            title: 'loading'
        })
        Taro.getUserInfo({
            success: res => {
                let userInfo = res.userInfo
                this.getLogin().then(loginRes => {
                    userInfo['openId'] = res.openid
                    userInfo['qa'] = 0
                    Taro.setStorageSync('openId', loginRes.openid)
                    Taro.setStorageSync('userInfo', userInfo)
                    this.db_addUserInfo(userInfo)
                })
            }
        })
    }
    render() {
        return (
            <View className='index'>
                <Button className='loginButton' openType='getUserInfo' onGetUserInfo={this.getUserInfo}>微信授权登录</Button>
            </View>
        )
    }
}