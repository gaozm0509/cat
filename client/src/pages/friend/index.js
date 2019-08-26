import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default class Index extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    avatar: 'https://wx.qlogo.cn/mmhead/Vh9jibqXngf8RLQzCuJX7yeFS1y9uxG1XUDCru8ibmp50/132',
                    name: '高富帅',
                    lastTime: '2019/9/16',
                    lastChat: '好可爱哦',
                },
                {
                    avatar: 'https://wx.qlogo.cn/mmhead/ykn76iaG5WXBgmChLicT9u9hl4IuaGtfb5zS6iaOiaCTA2U/132',
                    name: '鱼鱼鱼',
                    lastTime: '2019/9/15',
                    lastChat: '好可爱哦',
                },
                {
                    avatar: 'https://wx.qlogo.cn/mmhead/b4IVtguzpFswy7WNhZ5DZ97NFhqfC1NXZiblVjvMrib0Y/132',
                    name: '猫🐱',
                    lastTime: '2019/9/14',
                    lastChat: '好可爱哦',
                },
                {
                    avatar: 'https://wx.qlogo.cn/mmhead/QVQexGwzIhH0xohOiaWGL6KK6C9MuDvGLSh63wqHC3as/132',
                    name: '你大爷',
                    lastTime: '2019/5/10',
                    lastChat: '好可爱哦',
                },
            ]
        }
    }

    componentWillMount() {
        Taro.setNavigationBarTitle({
            title: '主人',
        })
    }

    itemClick = () => {
        Taro.navigateTo({
            url: '../task/index'
        })
    }
    render() {
        let listView = this.state.data.map((item, index) => {
            return (
                <View className='item' onClick={this.itemClick}>
                    <View className='left'>
                        <Image src={item.avatar} className='avatar' />
                        <View className='left-right'>
                            <Text className='name'>{item.name}</Text>
                            <Text className='lastChat'>{item.lastChat}</Text>
                        </View>
                    </View>
                    <Text className='lastTime'></Text>
                </View>
            )
        })
        return (
            <View className='index'>
                {listView}
            </View>
        )
    }
}