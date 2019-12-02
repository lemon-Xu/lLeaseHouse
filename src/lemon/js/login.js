import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import styleLemon from '../css/login.css'
import {loginAPI1, usersRegisterAPI1} from './ajaxAPI1.js'

class Login_p extends React.Component{

  render(){
    var kids = React.Children.map(this.props.children, child => {
      return child
    })

    return <p className={styleLemon.login_p_a}>
       {kids}
    </p>
  } 
}

class Login_button extends React.Component{

  

  render(){
    var kids = React.Children.map(this.props.children, child => {
      return child
    })

    return <Button type="primary" className={styleLemon.login_button_input} onClick={this.props.onClick}>
      {kids}
    </Button>
  }
}

class Login_inputTest extends React.Component{

  render(){
    var kids = React.Children.map(this.props.children, child => {
      return child
    })

    return <input type="text" className={styleLemon.login_button_input} value={this.props.value} onChange={this.props.onChange}>
      {kids}
    </input>
  }
}

class Login_inputPassword extends React.Component{

  render(){
    var kids = React.Children.map(this.props.children, child => {
      return child
    })

    return <input type="password" className={styleLemon.login_button_input} value={this.props.value} onChange={this.props.onChange}>
      {kids}
    </input>
  }
}

class Board extends React.Component{
  render(){
    var kids = React.Children.map(this.props.children, child => {
      return child
    })

    return <div className={styleLemon.board}>
      {kids}
    </div>
  }
}



class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { usersName: '', usersPass: '' }
    this.usersNameChange = this.usersNameChange.bind(this)
    this.usersPassChange = this.usersPassChange.bind(this)
    this.login = this.login.bind(this)
  }

  usersNameChange(event) {
    this.setState({ usersName: event.target.value })
  }

  usersPassChange(event) {
    this.setState({ usersPass: event.target.value })
  }

  login() {
    console.log("usersName:" + this.state.usersName)
    console.log("usersPass:" + this.state.usersPass)
    loginAPI1((res)=>{
      console.log(res.data)
      if(res.data.length != 0)
        window.location.href = '/dist/home.html'
      else
        alert('错误')
    }), ()=>{},
    {
      "usersAccount": this.state.usersName,
      "usersPass": this.state.usersPass
    }
  }

  render() {
    return <div id='loginBody'>
      <Board>
        <h2>Sign in to HouseLease</h2>
        <Login_p><b>Username</b></Login_p>
        <Login_inputTest value={this.state.usersName} onChange={this.usersNameChange}></Login_inputTest>
        <p><b>Password</b><a className={styleLemon.floatRight}>Forgin password?</a></p>
        <Login_inputPassword value={this.state.usersPass}  onChange={this.usersPassChange}></Login_inputPassword>
        <br></br>
        <Login_button onClick={this.login}>Sign in</Login_button>
      </Board>
      <Board>
         <a>new to HouseLease? create HouseLease account</a>
      </Board>
    </div>
  }
}


class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usersName: '',
      usersPass: '',
    }
    this.usersNameChange = this.usersNameChange.bind(this)
    this.usersPassChange = this.usersPassChange.bind(this)
    this.register = this.register.bind(this)
  }

  usersNameChange(event){
    this.setState({"usersName": event.target.value})
  }

  usersPassChange(event){
    this.setState({"usersPass": event.target.value})
  }

  register(event){
    if(this.state.usersPass.length < 8 || this.state.usersPass.length >15) {
      alert("Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.")
      return
    }
    let para = {
      "usersAccount": this.state.usersName,
      "usersPass": this.state.usersPass,
      "usersRank": '游客'
    }
    usersRegisterAPI1(
      (res)=>{
        console.log(res.data)
        if(res.data.result){

        } else {
          alert(res.data.mess)
        }
      },
      ()=>{},
      para)
    console.log(para)
  }

  render(){
    return(
      
      <div id='registerBody'>
        <Board>
          <Login_p><b>Username</b></Login_p>
          <Login_inputTest value={this.state.usersName} onChange={this.usersNameChange}></Login_inputTest>
          <b>Password</b>
          <Login_inputPassword value={this.state.usersPass}  onChange={this.usersPassChange}></Login_inputPassword>
          <Login_p>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</Login_p>
          <Login_button onClick={this.register}>Sign up for HouseLease</Login_button>
        </Board>
     </div>


    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
)

ReactDOM.render(
  <Register />,
  document.getElementById('register')
)





export {Login}