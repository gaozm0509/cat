import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import chat_left from '../../assets/images/chat_left.svg'
import chat_right from '../../assets/images/chat_right.svg'

import './chat.scss'

export default class Chat extends Taro.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            historyChatList: [],
            userInfo: {},
            user: {}, //聊天对象
            chatList: ['我', '你', '好', '不', '啊', '哦', '来', '去', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '零', '😄', '😷', '😂', '😝', '😳', '😱', '😔', '😒', '👻', '🙏', '💪', '🎉', '🎁'],
        }
    }

    componentWillMount() {
        this.state.user = JSON.parse(this.$router.params.user || '')
        Taro.setNavigationBarTitle({
            title: this.state.user.name
        })
        this.state.userInfo = Taro.getStorageSync('userInfo')

    }

    updateIntegral = () => {
        if (this.state.historyChatList.length != 0) {
            return
        }
        let id = Taro.getStorageSync('id')
        let db = Taro.cloud.database()
        db.collection('users').doc(id).update({
            data: {
                integral: 0
            }
        }).then(res => {

        })
    }


    textItemClick = (text, isMe) => {
        this.updateIntegral()
        let randomIndex = Math.floor(Math.random() * 10)
        if (randomIndex < 6) {
            text = '喵喵~'
        }
        let dic = {
            isMe: isMe,
            chat: text,
        }
        let list = [].concat(this.state.historyChatList)
        list.push(dic)
        this.setState({
            historyChatList: list
        })
        Taro.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            Taro.pageScrollTo({
                scrollTop: rect.height
            })
        }).exec()


        let randomDic = {
            isMe: false,
            chat: this.state.chatList[randomIndex],
            user: this.state.user
        }

        list.push(randomDic)
        this.setState({
            historyChatList: list
        })
        Taro.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            Taro.pageScrollTo({
                scrollTop: rect.height
            })
        }).exec()

    }
    render() {
        let avatarUrl = this.state.userInfo.avatarUrl
        let historyViews = this.state.historyChatList.map((item, index) => {
            //

            if (item.isMe) {
                return (
                    <View className='historyItemView historyItemViewMe'>
                        <View className='historyItemViewContainerMe historyItemViewContainer' >
                            <View className='chatView'>
                                <View className='historyItemText historyItemTextMe' >
                                    <Text>
                                        {item.chat}
                                    </Text>
                                </View>
                                <Image className='triangle' src={chat_right}></Image>
                            </View>
                            <Image className='avatar' src={avatarUrl}></Image>
                        </View>

                    </View >
                )
            }
            return (
                <View className='historyItemView'>
                    <View className='historyItemViewContainer' >
                        <Image className='avatar' src={item.user.avatar}></Image>
                        <View className='chatView'>
                            <Image className='triangle' src={chat_left}></Image>
                            <View className='historyItemText' >
                                <Text>
                                    {item.chat}
                                </Text>
                            </View>
                        </View>
                    </View>

                </View >
            )
        })

        let cahtList = this.state.chatList
        let chatText = cahtList.map((item, index) => {
            return (
                <View onClick={this.textItemClick.bind(this, item, true)} className={index % 8 == 0 ? 'textView textViewFirst' : 'textView'} key={index}>
                    <Text className='text'>{item}</Text>
                </View>
            )
        })
        let historyChatPaddingBottom = (cahtList.length / 8) * 88 + 30
        return (
            <View className='index' id='j_page'>
                <View className='historyChat' style={{ paddingBottom: historyChatPaddingBottom + 'rpx' }}>
                    {historyViews}
                </View>
                <View className='chatTextView'>
                    {chatText}
                </View>
            </View>
        )
    }
}