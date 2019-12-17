import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Upload, Icon, message, Button, Form, Input, Checkbox, Select, Tooltip, Cascader, Row, Col, AutoComplete, Radio } from 'antd';
import styleLemon from '../css/login.css';
import {loginAPI1, usersRegisterAPI1, getHouseInfAPI1, postHouseInfImgAPI1} from './ajaxAPI1.js';

const registerURL = '#/register'

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
    let params = {
      "usersAccount": this.state.usersName,
      "usersPass": this.state.usersPass
    }
    loginAPI1((res)=>{
      let data = res.data[0]
      console.log(data)
      if(data != '查询错误') {
        window.location.href = '#/home'
        Cookies.set('usersID', data.Users_ID)
        console.log(document.cookie)
      }
      else
        alert('错误')
    }, (err)=>{},
    params)
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
         <a href={registerURL}>new to HouseLease? create HouseLease account</a>
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



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this)
  }
 
  handleChange(info){
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:3000/api1/img"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let params = {
          Users_Name: values.nickname,
          Users_Account: values.account,
          Users_PassWord: values.password,
          Users_Email: values.email,
          Users_Rank: values.status,
          Users_Profile: '用户很懒',
          Users_Phone: values.phone
        }
        console.log(params)
        usersRegisterAPI1(
          (res)=>{
            let data = res.data
            if(data.mess=='名字已被注册'){
              alert('名字已被注册')
            } else if(data.mess=='成功'){
              alert('成功')
              window.location.href = '#/login'
            }
            console.log(data)
          },
          (err)=>{},
          params
        )
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Account">
          {getFieldDecorator('account', {
            rules: [
              {
                max: 20,
                message: 'The max is 20!',
              },
              {
                required: true,
                message: 'Please input your Account!',
              },
              {
                required: false,
                pattern: /^[\w\d]+$/,
                message: 'Only character Numbers are supported!',
              },
            ],
          })(<Input />)}
        </Form.Item>
         <Form.Item label="Radio.Group">
          {getFieldDecorator('status',{
            rules: [
              {
                required: true,
                message: 'Please select your Status!',
              },
            ],
          })(
            <Radio.Group>
              <Radio value="房东">房东</Radio>
              <Radio value="租客">租客</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);



// ReactDOM.render(
//   <Login />,
//   document.getElementById('login')
// )

// ReactDOM.render(
//   <Register />,
//   document.getElementById('register')
// )
// ReactDOM.render(<Avatar />, document.getElementById('avatar'));
export {Login, Register, WrappedRegistrationForm}
