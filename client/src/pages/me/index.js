import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import arrow from '../../assets/images/arrow.svg'
import setting from '../../assets/images/setting.svg'
import level from '../../assets/images/level.svg'

export default class Index extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {}
        }
    }
    componentDidMount() {

        Taro.setNavigationBarTitle({
            title: '我的'
        })
        Taro.getStorage({
            key: 'userInfo',
            success: res => {
                this.setState({
                    userInfo: res.data
                })
            }
        })
    }
    ItemClick = (index) => {
        if (index == 0) {
            Taro.showToast({
                title: '设置',
                icon: 'none'
            })
        } else if (index == 1) {
            Taro.showToast({
                title: '等级',
                icon: 'none'
            })
        }
    }
    render() {
        return (
            <View className='index'>
                <View className='topView'>
                    <Image className='avatar' src={this.state.userInfo.avatarUrl} />
                    <Text className='name'>{this.state.userInfo.nickName}</Text>
                </View>
                <View className='optionView' >
                    <View className='optionViewItem' onClick={this.ItemClick.bind(this, 0)}>
                        <View className='optionViewItemLeft'>
                            <Image src={setting} />
                            <Text>设置</Text>
                        </View>
                        <Image src={arrow} />
                    </View>
                    <View className='optionViewItem' onClick={this.ItemClick.bind(this, 1)}>
                        <View className='optionViewItemLeft'>
                            <Image src={level} />
                            <Text>等级</Text>
                        </View>

                        <Image src={arrow} />
                    </View>
                </View>
            </View>
        )
    }
}