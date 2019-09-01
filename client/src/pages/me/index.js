import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import arrow from '../../assets/images/arrow.svg'
import setting from '../../assets/images/setting.svg'
import level from '../../assets/images/level.svg'
import integral from '../../assets/images/integral.svg'


export default class Index extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            integral: 0,
        }
    }


    componentDidShow = () => {
        let _this = this
        Taro.getStorage({
            key: 'id',
            success: res => {
                let db = Taro.cloud.database()
                db.collection('users').doc(res.data).get().then(res => {
                    _this.setState({
                        integral:res.data.integral
                    })
                })
            }
        })
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

    choseImage = () => {
        Taro.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                this.addIntegral()
            }
        })
    }
    addIntegral = () => {
        let id = Taro.getStorageSync('id')
        let db = Taro.cloud.database()
        db.collection('users').doc(id).update({
            data: {
                integral: 10
            }
        }).then(res => {
            Taro.showLoading({
                title: '审核中。。。',

            })
            setTimeout(() => {
                Taro.hideLoading()
                Taro.showToast({
                    title: '审核通过，更多积分可以解锁更多技能哦',
                    icon: 'none',
                    success: res => {
                        this.setState({
                            integral: 10
                        })
                    }
                })
            }, 3000);
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
        } else if (index == 2) {
            // Taro.navigateTo({
            //     url: '../integral/index'
            // })
            this.choseImage()
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
                    <View className='optionViewItem' onClick={this.ItemClick.bind(this, 2)}>
                        <View className='optionViewItemLeft'>
                            <Image src={level} />
                            <Text>积分</Text>
                        </View >
                        <View className='optionViewItemReft'>
                            <Text>{this.state.integral}</Text>
                            <Image src={arrow} />
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}