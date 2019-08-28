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
            userString:''
        }
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
            if (this.state.currFeelingCount >= 20) {
                Taro.showToast({
                    title: '好感度达到20，可以去聊天',
                    icon: 'none'
                })
                this.setState({
                    isChatShow: true
                })
            }
        })
        this.selectImageTouch()
    }

    chat = () => {
        Taro.navigateTo({
            url: './chat?user=' + this.state.userString
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
                <Text className='selectDes currFeelingCount'>当前好感度{this.state.currFeelingCount}</Text>
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