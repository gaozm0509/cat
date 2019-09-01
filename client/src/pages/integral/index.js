import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Index extends Taro.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.choseImage()
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
            Taro.navigateBack()
        })
    }
    render() {
        return (
            <View className='index'>

            </View>
        )
    }
}