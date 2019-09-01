import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Loading } from '../../components/loading'

import cat1 from '../../assets/images/cat1.png'
import cat2 from '../../assets/images/cat2.jpg'
import cat3 from '../../assets/images/cat3.jpg'
import cat4 from '../../assets/images/cat4.jpg'

import './index.scss'


export default class Index extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: -1,
            isImageTouch: false,
            selectImageTouch: false,
            currFeelingCount: 0,
            isLoaded: false,
            isChatShow: false,
            user: {},
            userString: '',
            integral: 0

        }
    }

    // componentWillMount() {
    //     this.state.user = JSON.parse(this.$router.params.user || '')
    //     Taro.setNavigationBarTitle({
    //         title: this.state.user.name
    //     })
    //     this.state.userInfo = Taro.getStorageSync('userInfo')

    // }


    componentDidShow = () => {
        let _this = this
        Taro.getStorage({
            key: 'id',
            success: res => {
                let db = Taro.cloud.database()
                db.collection('users').doc(res.data).get().then(res => {
                    _this.state.integral = res.data.integral
                })
            }
        })
    }
    componentWillMount() {
        this.state.userString = this.$router.params.user
        this.state.user = JSON.parse(this.state.userString)
        Taro.setNavigationBarTitle({
            title: '任务'
        })
        this.getSelectStatus()
    }

    getSelectStatus = () => {
        let db = Taro.cloud.database()
        let id = Taro.getStorageSync('id')
        db.collection('users').doc(id).get({
            success: res => {
                this.setState({
                    selected: res.data.selected,
                    qa: res.qa,
                    isLoaded: true,
                    isLoaded: false,
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

    selectImageTouch = () => {
        this.setState({
            selectImageTouch: true,
            isImageTouch: false,
        })
    }
    animationEnd = () => {

        this.setState({
            selectImageTouch: false
        })
    }

    skillClick = (index) => {
        Taro.showToast({
            title: '好感度+' + (index + 1),
            icon: 'none'
        })
        this.setState({
            currFeelingCount: this.state.currFeelingCount + index + 1
        }, () => {
            if (this.state.currFeelingCount >= 1) {
                Taro.showToast({
                    title: '好感度达到1，可以去聊天',
                    icon: 'none'
                })
                this.setState({
                    isChatShow: true
                })
            }
        })
        this.selectImageTouch()
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
                    title: '审核通过，可以去愉快的聊天了',
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


    chat = () => {
        if (this.state.integral >= 10) {
            Taro.navigateTo({
                url: './chat?user=' + this.state.userString
            })
            return
        }
        Taro.showModal({
            title: '提示',
            content: '积分不足，上传小票，获取积分',
            success: res => {
                if (res.confirm) {
                    this.choseImage()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

    render() {
        let images = [cat1, cat2, cat3, cat4]
        let image = images[this.state.selected - 1]
        let skills = ['打滚', '喵喵', '捉老鼠', '玩耍']
        let skillView = skills.map((item, index) => {
            return (
                <Text key={index} className='selectReset skillText' onClick={this.skillClick.bind(this, index)}>{item}</Text>
            )
        })
        return (
            <View className='index'>
                <Image onAnimationEnd={this.animationEnd} onClick={this.selectImageTouch} src={image} className={this.state.selectImageTouch ? 'selectImage selectImageTouch' : 'selectImage'}></Image>
                <Text className='selectDes currFeelingCount'>当前好感度，互动可以提高好感度，好感度达到一定等级可以解锁更多技能{this.state.currFeelingCount}</Text>
                <View className='skillView'>{skillView}</View>
                <Text className='selectDes'>
                    {'1、每个技能可以提升好感度，每个技能都有CD\n'}
                    {'2、提升好感度可以获得等级提升\n'}
                    {'3、高等级可以获得更多的权益\n'}
                    {'4、。。。。。。'}
                </Text>
                <Text className='selectReset ' style={{ display: this.state.isChatShow ? 'blcok' : 'none' }} onClick={this.chat}>去聊天</Text>
            </View >
        )
    }
}