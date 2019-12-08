import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { usersFollowPanel, usersFollowPanelImg, usersFollowPanelP, usersFollowPanelArray, usersFollowPanelButton } from '../css/firia.css'
import { getUsersFollowInfAPI1 } from './ajaxAPI1'
import { panel } from '../css/public.css'

// lemon
class UsersFollowPanel extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    console.log('求关注')
  }

  render(){
    return(
    <div className={usersFollowPanel}>
        <div className={usersFollowPanelImg}>
          <img src={this.props.imgSrc}></img>
        </div>
        <div className={usersFollowPanelP}>
          <p>{this.props.usersName}</p>
          <p>{this.props.usersProfile}</p>
        </div>
        <div className={usersFollowPanelButton}>
          <button onClick={this.handleClick}>关注</button>
        </div>
    </div>
   )
  }
}
// lemon
class UsersFollowPanelArray extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usersFollowArray: new Array()
    }
  }

  componentDidMount(){
    this.toGetUsersFollowInf()
  }

  toGetUsersFollowInf(){
    console.log('拉取关注列表')
    let params = {
      
    }
    console.log(1)
    getUsersFollowInfAPI1(
      (res)=>{
        let data = res.data
        console.log(data)
        if(data == '查询错误'){
          return
        }
        let usersFollowArray = new Array()
        for(let index in data){
          let inf = {
            imgSrc: '/public/images/logo.png',
            usersName: data[index].Users_Name,
            usersProfile: data[index].Users_Profile
          }
          usersFollowArray.push(inf)
        }
        console.log(this)
        console.log(usersFollowArray)
        this.setState({usersFollowArray: usersFollowArray})
        console.log(this.state.usersFollowArray)
      },
      (err)=>{},
      params
    )
  }
  
  render(){


    return(
      <div className={panel}>
        <div>
          <span>推荐用户</span>
          <span>更多</span>
        </div>
        <div className={usersFollowPanelArray}>
          {
            this.state.usersFollowArray.map((item, index)=>{
              console.log(item)
              console.log(index)
              return <UsersFollowPanel key={index} {...item}/>
            })
          }
        </div>
      </div>
    )
  }
}

export { UsersFollowPanelArray }