import Taro from '@tarojs/taro'
import { View, Map, Button } from '@tarojs/components'

import './index.scss'

export default class Index extends Taro.Component {
    config = {
        navigationBarTitleText: '附近'
    }
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            latitude: 23.099994,
            longitude: 113.324520,
            userInfo: {},
            isLocationButtonShow: false
        }
    }
    componentWillMount = () => {
        this.state.userInfo = Taro.getStorageSync('userInfo')
        this.getLocation()
    }

    getLocation = () => {
        Taro.getLocation({
            type: 'wgs84',
            success: res => {
                let color = '#D00000'
                let display = 'ALWAYS'
                let borderColor = '#D00000'
                let borderRadius = 5
                let borderWidth = 1
                let padding = 2
                let avatar = this.state.userInfo.avatarUrl
                let user0 = {
                    iconPath: avatar,
                    id: 0,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    width: 44,
                    height: 44,
                    callout: {
                        content: this.state.userInfo.nickName,
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }


                let user1 = {
                    iconPath: 'https://wx.qlogo.cn/mmhead/Vh9jibqXngf8RLQzCuJX7yeFS1y9uxG1XUDCru8ibmp50/132',
                    id: 1,
                    latitude: res.latitude + 0.002,
                    longitude: res.longitude + 0.002,
                    width: 44,
                    height: 44,
                    callout: {
                        content: '勇敢的猫',
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }
                let user2 = {
                    iconPath: 'https://wx.qlogo.cn/mmhead/rR00TCsWE0CKDUK1trI2OTkXSWLldE4O4xVF9ZPY3uU/132',
                    id: 2,
                    latitude: res.latitude + 0.002,
                    longitude: res.longitude - 0.002,
                    width: 44,
                    height: 44,
                    callout: {
                        content: 'cat',
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }
                let user3 = {
                    iconPath: 'https://wx.qlogo.cn/mmhead/ykn76iaG5WXBgmChLicT9u9hl4IuaGtfb5zS6iaOiaCTA2U/132',
                    id: 3,
                    latitude: res.latitude - 0.002,
                    longitude: res.longitude - 0.002,
                    width: 44,
                    height: 44,
                    callout: {
                        content: 'litte',
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }
                let user4 = {
                    iconPath: 'https://wx.qlogo.cn/mmhead/b4IVtguzpFswy7WNhZ5DZ97NFhqfC1NXZiblVjvMrib0Y/132',
                    id: 4,
                    latitude: res.latitude - 0.002,
                    longitude: res.longitude + 0.002,
                    width: 44,
                    height: 44,
                    callout: {
                        content: 'love',
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }
                let user5 = {
                    iconPath: 'https://wx.qlogo.cn/mmhead/QVQexGwzIhH0xohOiaWGL6KK6C9MuDvGLSh63wqHC3as/132',
                    id: 5,
                    latitude: res.latitude - 0.002,
                    longitude: res.longitude - 0.003,
                    width: 44,
                    height: 44,
                    callout: {
                        content: 'mac',
                        color: color,
                        display: display,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                        borderWidth: borderWidth,
                        padding: padding
                    }
                }
                let markers = [user0, user1, user2, user3, user4, user5]
                this.setState({
                    markers: markers,
                    latitude: res.latitude,
                    longitude: res.longitude,
                })
                // var speed = res.speed
                // var accuracy = res.accuracy
                this.setState({
                    isLocationButtonShow: false
                })
            },
            fail: () => {
                this.setState({
                    isLocationButtonShow: true
                })
            }
        })
    }
    markertap = (e) => {
        let markerId = e.markerId
        if (markerId == 0) {
            return
        }
        let marker = this.state.markers[markerId]
        let name = marker.callout.content
        let location = 100
        let avatar = marker.iconPath
        Taro.navigateTo({
            url: './add?name=' + name + '&location=' + location + '&avatar=' + avatar
        })
    }
    openSetting = () => {
        console.log('openSetting')
        Taro.openSetting({
            success: (res) => {
                console.log('=======')
                this.getLocation()
            }
        })
    }
    render() {
        return (
            <View className='index'>
                <Map markers={this.state.markers} onMarkerTap={this.markertap.bind(this)} longitude={this.state.longitude} latitude={this.state.latitude} className='mapView'></Map>
                <Button style={{ display: this.state.isLocationButtonShow ? 'block' : 'none' }} className='setting' onClick={this.openSetting} >获取位置失败，点击设置</Button>
            </View>
        )
    }
}