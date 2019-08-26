import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './add.scss'

export default class Add extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: 0,
            avatar: ''
        }
    }
    componentWillMount() {
        Taro.setNavigationBarTitle({
            title: '添加'
        })
        this.state.name = this.$router.params.name
        this.state.location = this.$router.params.location
        this.state.avatar = this.$router.params.avatar

    }
    addClick = () => {
        Taro.showToast({
            title: '已发送'
        })
    }
    render() {
        return (
            <View className='add'>
                <View className='top'>
                    <Image src={this.state.avatar} className='avatar' />
                    <View className='right'>
                        <Text className='name'>{this.state.name}</Text>
                        <Text className='location'>距离：{this.state.location}m</Text>
                    </View>
                </View>
                <View className='signature'>
                    <Text className='title'>个性签名：</Text>
                    <Text className='signatureContent'>别低头，皇冠会掉</Text>
                </View>
                <Text className='addText' onClick={this.addClick}>向他撒娇</Text>
            </View>
        )
    }
}