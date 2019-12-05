import React from 'react'
import ReactDOM from 'react-dom';
import {Button, Icon} from 'antd'
import {fontsize20px, margintop30px, marginbottom30px, right, width600px, textBlack, textAlign, borderBottomSolid, marginLeft, marginRightOne, marginRightTwo, button} from '../css/personaldata.css'
import {getUsersInfAPI1} from './ajaxAPI1'
/*
最上端“我的账户组件”
*/
class PersonalDataHead extends React.Component{
    constructor(props){
      super(props)
      this.click = this.click.bind(this)
    }


    click(event){
      let cb = this.props.clickCB
      console.log(cb)
      if(typeof(cb) == 'function')
        console.log('是个函数')
      else
        throw 'callBack必须是一个函数'
      cb(event)
    }


/*
渲染样式居中
*/
    render(){
      const abc =textAlign+" "+textBlack + " " + borderBottomSolid
      return(
        <div className={abc} onClick={this.click}>
          <span>{this.props.myAccount}</span>
        </div>
      )
    }
  }

/*
个人头像和资料组件
*/
  class PersonalDataSelf extends React.Component{
    constructor(props){
      super(props)
    }
/*
渲染样式居中，左边距，右边距
*/
    render(){
            const q=borderBottomSolid+" "+textBlack+" "
      return(
        <div  className={q}>
          <span className={marginLeft}><img src={this.props.imgSrc}></img></span>
          <span className={right}><Icon type="caret-right" /></span>
          <span className={right}>{this.props.rightText}</span>
        </div>
      )
    }
  }

/*
中间信息组件
*/
  class  PersonalDataBody extends React.Component{
      constructor(props){
        super(props)
        this.click=this.click.bind(this)
      }
      click(event){
        let cb = this.props.clickCB
        console.log(cb)
        if(typeof(cb) == 'function')
          console.log('是个函数')
        else
          throw 'callBack必须是一个函数'
        cb(event)
      }
/*
渲染样式左边距，右边距
*/

      render(){
        const aaa=borderBottomSolid+" "+textBlack+" "+ this.props.className
        return(
          <div onClick={this.click} className={aaa} >
            <span className={marginLeft}>{this.props.leftText}</span>
            <span className={right}><Icon type="caret-right" /></span>
            <span className={right}>{this.props.rightText}</span>
          </div>
        )
      }
  }
/*
结尾按钮组件
*/
  class PersonalDataEnd extends React.Component{
    constructor(props){
      super(props)
      this.click=this.click.bind(this)
    }

    click(event){
      let cb = this.props.clickCB
      console.log(cb)
      if(typeof(cb) == 'function')
        console.log('是个函数')
      else
        throw 'callBack必须是一个函数'
      cb(event)
    }
    render(){
      const bbb =textAlign+" "+textBlack
      return(
        <div className={bbb} onClick={this.click}>
          <Button className={button}>{this.props.logOut}</Button>
        </div>
      )
    }
  }

function a(event){
  console.log(event.target)
  console.log('被点击')
}


class Information extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usersPhone: '请绑定手机',
      usersEmail: '接受电子账单',
      usersLoginHis: '账户安全',
      usersCommunityAss: ' ',
      usersCommunityStatus: '游客',
      usersMemberBank: '普通会员',
      medalOfHonour: '更多勋章等你收集'
    }
  }

  componentDidMount(){
    this.toGetUsersInf()
  }

  toGetUsersInf(id){
    let params = {
      usersId: id,
      usersRank: '游客'
    }
    getUsersInfAPI1(
      (res)=>{
        let data = res.data
        console.log(data)
        let state = {

        }
        this.setState(data)
      },
      ()=>{},
      params)
  }

  render(){
    const style2 = width600px+" "+fontsize20px
    return(
      <div className={style2}>
      <PersonalDataHead  myAccount="我的账户" clickCB={a} />
      <PersonalDataSelf  rightText="完善个人资料" clickCB={a} />
      <PersonalDataBody  leftText="绑定手机" rightText={this.state.usersPhone} clickCB={a}/>
      <PersonalDataBody  leftText="绑定邮箱" rightText={this.state.usersEmail} clickCB={a}/>
      <PersonalDataBody  className={marginbottom30px} leftText="登录历史" rightText={this.state.usersLoginHis} clickCB={a}/>
      <PersonalDataBody  className={margintop30px} leftText={this.state.usersAccountAss}  clickCB={a}/>
      <PersonalDataBody  leftText="社区身份" rightText={this.state.usersCommunityStatus} clickCB={a}/>
      <PersonalDataBody  leftText="会员等级" rightText={this.state.usersMemberBank} clickCB={a}/>
      <PersonalDataBody  className={marginbottom30px} leftText="荣誉勋章" rightText={this.state.medalOfHonour} clickCB={a}/>
      <PersonalDataEnd   className={margintop30px}logOut="修改登录密码" clickCB={a} />
      </div>
    )
  }
}

export {Information}