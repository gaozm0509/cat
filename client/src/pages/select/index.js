import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import cat1 from '../../assets/images/cat1.png'
import cat2 from '../../assets/images/cat2.jpg'
import cat3 from '../../assets/images/cat3.jpg'
import cat4 from '../../assets/images/cat4.jpg'

import './index.scss'
export default class Index extends Taro.Component {
    config = {
        navigationBarTitleText: '选择角色'
    }
    constructor(props) {
        super(props)
        this.state = {
            qa: 0,
            selectIndex: -1
        }
    }
    componentDidMount() {
        this.state.qa = this.$router.params.qa
    }
    imageClick = (index) => {
        this.setState({
            selectIndex: index
        })
    }
    selected = () => {
        const db = Taro.cloud.database()
        let id = Taro.getStorageSync('id')
        db.collection('users').doc(id)
            .update({
                data: {
                    selected: this.state.selectIndex + 1,
                },
                success: res => {
                    Taro.navigateBack({
                        delta: 2,
                    })
                    Taro.redirectTo({
                        url: '../index/index?select=' + this.state.selectIndex + 1
                    })
                },
                fail: res => {
                    Taro.showToast({
                        title: res.errMsg,
                        icon: 'none'
                    })
                }
            })
    }


    render() {
        let desList = ['该角色性格xxx,技能xxx']
        let imagesList = [cat1, cat2, cat3, cat4].map((item, index) => {
            return (
                <Image src={item} className={index == this.state.selectIndex ? 'image' + index + ' selectImage' + ' image' : 'image' + index + ' image'} onClick={this.imageClick.bind(this, index)} />
            )
        })
        return (
            <View className='index'>
                <Text className='des'>根据您的性格测试，系统推荐您一下几个角色，每个角色将有不同的性格。。。</Text>
                <View className='imageView'>
                    {imagesList}
                </View>
                <Text className='selectDes' style={{ display: this.state.selectIndex == -1 ? 'none' : 'block' }}>
                    您即将选择{this.state.selectIndex + 1}号，该就角色性格xxx,拥有xxx技能
                </Text>
                <Text onClick={this.selected} className='selectText' style={{ display: this.state.selectIndex == -1 ? 'none' : 'block' }}>
                    选择
                </Text>
            </View>
        )
    }
}