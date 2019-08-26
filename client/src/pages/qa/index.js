import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Loading } from '../../components/loading'
import './index.scss'

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      questions: [],
      options: {},
      isComplete: false,
      selects: []

    }
  }

  componentWillMount() { }
  componentDidMount() {
    this.state.questions = JSON.parse(this.$router.params.questions)
    this.dbGetOptions()
  }

  groupList = (array) => {
    // 获取所有的quetionsIds
    let quetionsIds = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (index == 0) {
        quetionsIds.push(element.question)
      } else {
        if (quetionsIds.indexOf(element.question) == -1) {
          quetionsIds.push(element.question)
        }
      }
    }
    let dic = {}
    for (let index = 0; index < quetionsIds.length; index++) {
      this.state.selects.push(-1)
      const quetionId = quetionsIds[index];
      let groupitem = []
      let groupQuetionIds = [quetionId]
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (groupQuetionIds.indexOf(element.question) != -1) {
          groupitem.push(element)
        }
      }
      dic[quetionId] = groupitem
    }
    return dic
  }

  dbGetOptions = () => {
    const db = Taro.cloud.database()
    db.collection('options')
      .get({
        success: res => {

          db.collection('options')
            .skip(20)
            .get({
              success: lastRes => {
                let list = res.data.concat(lastRes.data)
                let dic = this.groupList(list)
                this.setState({
                  options: dic,
                  isLoaded: true
                })
              }
            })

        },
        fail: res => {
          Taro.showToast({
            icon: 'none',
            title: res.errMsg
          })
        }
      })
  }

  selectOptions = (index, num) => {
    this.state.selects[index] = num
    this.setState({
      selects: this.state.selects
    })
  }


  next = () => {
    if (this.state.selects.indexOf(-1) != -1) {
      Taro.showToast({
        title: '第' + (this.state.selects.indexOf(-1) + 1) + '项没选择',
        icon: 'none'
      })
      return
    }
    const db = Taro.cloud.database()
    let id = Taro.getStorageSync('id')
    db.collection('users').doc(id)
      .update({
        data: {
          qa: 1,
        },
        success: res => {
          Taro.redirectTo({
            url: '../select/index?qa=' + 1
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

    if (!this.state.isLoaded) {
      return (<Loading></Loading>)
    }
    let orderLetter = ['A', 'B', 'C']
    let _questions = this.state.questions
    let views = _questions.map((question, i) => {
      let selectIndex = this.state.selects[i]
      let _options = this.state.options[question._id]
      return (
        <View className='qaItem' style={{ marginTop: '20rpx' }}>
          <Text className='question'>{(i + 1) + '、' + question.question}</Text>
          <View className='optionView'>
            {
              _options.map((item, index) => {
                return (
                  <Text className={selectIndex == index ? 'option optionSelect' : 'option'} onClick={this.selectOptions.bind(this, i, index)}>{orderLetter[index] + '：' + item.name}</Text>
                )
              })
            }
          </View>
        </View>
      )
    })
    return (
      <View className='index'>
        {views}
        <View className='nextView' >
          <Text onClick={this.next}> 完成</Text>
        </View>
      </View>
    )
  }
}