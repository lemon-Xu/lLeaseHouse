import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import {Text_name_style, Text_main_style, Picture_style,Text_style,Button_style, usersFollowPanel, usersFollowPanelImg, usersFollowPanelP, usersFollowPanelArray, usersFollowPanelButton} from '../css/firia.css'
import { getTwoToneColor } from 'antd/lib/icon/twoTonePrimaryColor';


class Textbox extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <p className={Text_style}>{this.props.leftText}</p>
   )
  }
}

class Users extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div className="Users1">
        <div className={Picture_style}>
          <img src={this.props.imgSrc} ></img>
        </div>
        
        <div className={Text_name_style}>
          <Textbox leftText={this.props.usersName}/>
          <div className={Text_main_style}>
            <Textbox leftText={this.props.introduction}/>
          </div>
        </div>
        <Button className={Button_style}>关注ta</Button>
    </div>
   )
  }
}

// lemon
class UsersFollowPanel extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div className={usersFollowPanel}>
        <div className={usersFollowPanelImg}>
          <img src="/public/images/logo.png"></img>
        </div>
        <div className={usersFollowPanelP}>
          <p>Firia</p>
          <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈这是我的简介</p>
        </div>
        <div className={usersFollowPanelButton}>
          <button>关注</button>
        </div>
    </div>
   )
  }
}
// lemon
class UsersFollowPanelArray extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className={usersFollowPanelArray}>
        <UsersFollowPanel />
        <UsersFollowPanel />
        <UsersFollowPanel />
        <UsersFollowPanel />
        <UsersFollowPanel />
      </div>
    )
  }
}

class Users_1 extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <Users usersNmae="用户1" introduction="用户1简介" />
        <Users usersNmae="用户2" introduction="用户2简介" />
      </div>
   )
  }
}
ReactDOM.render(
  <Users_1 imgSrc="/public/images/logo.png"/>,
  document.getElementById('Users_1')
)
ReactDOM.render(
  <UsersFollowPanelArray />,
  document.getElementById('Users_1')
)