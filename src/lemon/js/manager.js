import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import { Menu, Icon, Button, Row, Col, Modal, Upload, message, Form, Input, Checkbox, Select, Tooltip, Cascader, AutoComplete, Radio } from 'antd';
import { HouseBriefInf, HouseBriefInfArray, HouseInf, HouseInfInput } from './houseLeaseInf'
import { getUsersInfAPI1, getHouseInfAPI1, usersRegisterAPI1, putUsersInfAPI1, deleteUsersInfAPI1, loginAPI1 } from './ajaxAPI1'
import Cookies from 'js-cookie'
const { SubMenu } = Menu;


import styleLemon from '../css/login.css';
const registerURL = '#/register'

class Navigation extends React.Component {
  constructor(props){
    super(props)
    let params = this.props.match.params
    let primary = params.primary
    console.log(primary)
    this.selectedKeys = ['home']
    this.openKeys = []   
    if(primary != undefined){
      console.log(primary)
      this.selectedKeys = [primary]
    }
    console.log(this.selectedKeys)
  }
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
     
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={this.selectedKeys}
          defaultOpenKeys={this.openKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="#/">
            <span>home</span>
          </Menu.Item>
          <Menu.Item key="landlord"><a href={'#/landlord'}>房东</a></Menu.Item>
          <Menu.Item key="ternant"><a href={'#/ternant'}>租客</a></Menu.Item>
          <Menu.Item key="houseInf"><a href={'#/houseInf'}>房屋信息</a></Menu.Item>
        </Menu>
      </div>
    );
  }
}

class ContentRouter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
      if(!Cookies.get('usersID')){
        alert('请先登入')
        window.location.href="#/login"
      }

        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandlordContent} />
                    <Route exact path="/home" component={LandlordContent}  />
                    <Route exact path="/landlord" component={LandlordContent} />
                    <Route exact path="/ternant" component={TernantContent}  />
                    <Route exact path="/houseInf" component={HouseInfContent}  />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={RootWrappedRegistrationForm} />
                </Switch>
            </HashRouter>
        )
    }
}

class NavigationRouter extends React.Component{
    constructor(props){
      super(props)
    }
    render(){


        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Navigation} />
                    <Route exact path="/:primary" component={Navigation} />
                </Switch>
            </HashRouter>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Row>
                <Col span={8}> <NavigationRouter/></Col>
                <Col span={16}><ContentRouter/></Col>
            </Row>
        )
    }
}


class HeadItem extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const label = { xs: 8, sm: 16, md: 24}
    const item = this.props.item
    let content = new Array()
    for(let index in item){
      let a = <Col span={3} key={index}>{item[index]}</Col>
      content.push(a)
    }
    return(
      <Row gutter={label}>
        <Col span={2}></Col>
        {
         content
        }
        <Col span={2}></Col>
      </Row>
    )
  }
}

class ContentItem extends React.Component{
  constructor(props){
    super(props)
  }
  plusHandle = ()=>{
    this.props.pluse(this.props.callParams)
  }
  closeHandle = ()=>{
    this.props.close(this.props.callParams)
  }
  infoHandle = ()=>{
    this.props.info(this.props.callParams)
  }
  editHandle = ()=>{
    this.props.edit(this.props.callParams)
  }
  render(){
    const plus = <Button type="primary" size="small" icon="plus" onClick={this.plusHandle}></Button>
    const close = <Button type="danger" size="small" icon="close" onClick={this.closeHandle}></Button>
    const info = <Button type="default" size="small" icon="info" onClick={this.infoHandle}></Button>
    const edit = <Button type="dashed" size="small" icon="edit" onClick={this.editHandle}></Button>
    const label = { xs: 8, sm: 16, md: 24}
    const item = this.props.item
    let content = new Array()
    for(let index in item){
      let a = <Col span={3} key={index}>{item[index]}</Col>
      content.push(a)
    }
    return(
      <Row gutter={label}>
        <Col span={2}></Col>
        {
          content
        }
        <Col span={2}>{plus}</Col>
        <Col span={2}>{close}</Col>
        <Col span={2}>{edit}</Col>
        <Col span={2}>{info}</Col>
        <Col span={2}></Col>
      </Row>
    )
  }
}

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidMount() {
    // console.log(this.props.form.validateFieldsAndScroll)
    this.props.onGetSubmit(this.props.form.validateFieldsAndScroll);
  }

  handleSubmit = e => {
    // e.preventDefault();
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
         <Form.Item label="Status">
          {getFieldDecorator('status',{
            rules: [
              {
                required: true,
                message: 'Please select your Status!',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={"房东"}>房东</Radio>
              <Radio value={"租客"}>租客</Radio>
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
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
const LandlordRegistrationForm = Form.create(
  { 
    name: 'register' ,
    // onFieldsChange(props, fields) { // 监听表单数字变化
    //   for(let key in fields){
    //     let field = fields[key]
    //     let params = {
    //       name: field.name,
    //       value: field.value,
    //       err: field.errors
    //     }
    //     props.onFieldsChange(params)
    //   }
    //  },
      mapPropsToFields(props) {
        console.log(props)
        let fields = ['account', 'status', 'password', 'confirm', 'nickname', 'phone']
        let ret = {}
        for(let index in fields){
          let field = fields[index]
          console.log(props[field])
          if(!props[field])
            continue
          ret[field] =  Form.createFormField({
            field,
            value: props[field],
          })
        }
        console.log('ret:',ret)
        return {
          ...ret
          // status: Form.createFormField({
          //   ...props.status,
          //   value: props.status,
          // }),
          // Account: Form.createFormField({
          //   ...props.status,
          //   value: props.status,
          // }),
        };
      }
  }) (RegistrationForm);



class LandlordContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      landlordInfo: [],
      title: ['添加房东','删除房东','修改房东信息','房东详细信息'],
      titleNum: 3,
      visible: false,
      confirmLoading: false,
      info: {}
    }
    this.validateFieldsAndScroll = ()=>{}
  }
  submitReceiver=(fun)=>{
    this.validateFieldsAndScroll = fun
  }
  handleOk=()=>{
    switch(this.state.titleNum){
      case 0:
        this.validateFieldsAndScroll((err, values)=>{
          if (!err) {
            this.setState({confirmLoading: true})
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
    
            usersRegisterAPI1(
              (res)=>{
                let data = res.data
                if(data.mess=='名字已被注册'){
                  alert('名字已被注册')
                } else if(data.mess=='成功'){
                  this.setState({confirmLoading: false})
                } 
              },
              (err)=>{},
              params
            )
          }
        })
        break
      case 1:
        console.log('删除')
        this.validateFieldsAndScroll((err, values)=>{
  
          this.setState({confirmLoading: true})
          console.log('Received values of form: ', values);
          let params = {
            Users_Name: values.nickname,
            Users_Account: values.account,
          }
  
          console.log(params)
          deleteUsersInfAPI1(
            (res)=>{
              let data = res.data
              if(data.mess=='删除失败'){
                alert('删除失败')
              } else if(data.mess=='删除成功'){
                this.setState({confirmLoading: false})
              } 
            },
            (err)=>{},
            params
          )
          
        })
        break
      case 2:
        this.validateFieldsAndScroll((err, values)=>{
          if (!err) {
            this.setState({confirmLoading: true})
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
            putUsersInfAPI1(
              (res)=>{
                let data = res.data
                if(data.mess=='修改失败'){
                  alert('修改失败')
                } else if(data.mess=='修改成功'){
                  this.setState({confirmLoading: false})
                } 
              },
              (err)=>{},
              params
            )
          }
        })
        break
      case 3:
        break
      default:
        this.setState({visible:false})
    }
    
  }
  componentDidMount(){
    this.getLandlordInf()
  }
  handleCancel=()=>{
    this.setState({visible: false})
  }
  pluse=(value)=>{
    this.setState({visible: true, titleNum: 0})
    console.log(value)
  }
  close=(value)=>{
    this.setState({visible: true, titleNum: 1})
    console.log(value)
    let info = {
      account: value.info.Users_Account,
      status: value.info.Users_Rank,
      'e-mail': value.info.Users_Email,
      password: value.info.Users_PassWord,
      confirm: value.info.Users_PassWord,
      nickname: value.info.Users_Name,
      phone: value.info.Users_Phone
    }
    this.setState({info: info})
  }
  edit=(value)=>{
    this.setState({visible: true, titleNum: 2})
    console.log(value.info)
    let info = {
      account: value.info.Users_Account,
      status: value.info.Users_Rank,
      'e-mail': value.info.Users_Email,
      password: value.info.Users_PassWord,
      confirm: value.info.Users_PassWord,
      nickname: value.info.Users_Name,
      phone: value.info.Users_Phone
    }
    this.setState({info: info})
  }
  info=(value)=>{
    this.setState({visible: true, titleNum: 3})
    console.log(value)
    let info = {
      account: value.info.Users_Account,
      status: value.info.Users_Rank,
      'e-mail': value.info.Users_Email,
      password: value.info.Users_PassWord,
      confirm: value.info.Users_PassWord,
      nickname: value.info.Users_Name,
      phone: value.info.Users_Phone
    }
    this.setState({info: info})
  }
  getLandlordInf(){
    let params = {
      Users_Rank: '房东'
    }
    getUsersInfAPI1(
      (res)=>{
        let data = res.data
        this.setState({landlordInfo: res.data})
        console.log(data)
      },
      ()=>{},
      params
    )
  }
  reload=()=>{
    this.getLandlordInf()
    alert('刷新')
  }
  render(){
    const reload = <Button onClick={this.reload} type="primary" size="small" icon="reload"></Button>
    const headItem = ['昵称', '账号', '邮箱', '电话', reload]
    const { title, titleNum, visible, confirmLoading} = this.state
    let modalKids = [<LandlordRegistrationForm status="房东" onGetSubmit={this.submitReceiver}/>,<LandlordRegistrationForm onGetSubmit={this.submitReceiver} {...this.state.info} />,<LandlordRegistrationForm {...this.state.info} onGetSubmit={this.submitReceiver}/>,<LandlordRegistrationForm  {...this.state.info} onGetSubmit={this.submitReceiver}/>]
    const headItemParams = {
      item: headItem
    }
    const contentItemHandle = {
      pluse: this.pluse,
      close: this.close,
      edit: this.edit,
      info: this.info
    }
    const landlordInfo = this.state.landlordInfo
    const contentItemArray = new Array()
    for(let index in landlordInfo){
      let info = landlordInfo[index]
      let params = {
        item: [info.Users_Name, info.Users_Account, info.Users_Email, info.Users_Phone],
        callParams: {
          info: info
        }
      }
      let kids =  <ContentItem key={index} {...params} {...contentItemHandle}/>
      contentItemArray.push(kids)
    }
    return(
      <div>
        <HeadItem {...headItemParams}/>
        {
          contentItemArray
        }
        <Modal
          title= {title[titleNum]}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {modalKids[titleNum]}
        </Modal>
      </div>
    )
  }
}


class TernantContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      landlordInfo: []
    }
  }
  componentDidMount(){
    this.getTernantInf()
  }
  pluse=(value)=>{
    window.location.href = '/dist/index.html#/register'
    console.log(value)
  }
  close=(value)=>{
    console.log(value)
  }
  edit=(value)=>{
    console.log(value)
  }
  info=(value)=>{
    console.log(value)
  }
  getTernantInf(){
    let params = {
      Users_Rank: '租客'
    }
    getUsersInfAPI1(
      (res)=>{
        let data = res.data
        this.setState({landlordInfo: res.data})
        console.log(data)
      },
      ()=>{},
      params
    )
  }
  reload=()=>{
    this.getLandlordInf()
    alert('刷新')
  }
  render(){
    const reload = <Button onClick={this.reload} type="primary" size="small" icon="reload"></Button>
    const headItem = ['昵称', '账号', '邮箱', '电话', reload]
    const headItemParams = {
      item: headItem
    }
    const contentItemHandle = {
      pluse: this.pluse,
      close: this.close,
      edit: this.edit,
      info: this.info
    }
    const landlordInfo = this.state.landlordInfo
    const contentItemArray = new Array()
    for(let index in landlordInfo){
      let info = landlordInfo[index]
      let params = {
        item: [info.Users_Name, info.Users_Account, info.Users_Email, info.Users_Phone],
        callParams: {
          usersID: info.Users_ID
        }
      }
      let kids =  <ContentItem key={index} {...params} {...contentItemHandle}/>
      contentItemArray.push(kids)
    }
    return(
      <div>
        <HeadItem {...headItemParams}/>
        {
          contentItemArray
        }
      </div>
    )
  }
}

class HouseInfContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      landlordInfo: []
    }
  }
  componentDidMount(){
    this.getHouseInf()
  }
  pluse=(value)=>{
    window.location.href = '/dist/index.html#/register'
    console.log(value)
  }
  close=(value)=>{
    console.log(value)
  }
  edit=(value)=>{
    console.log(value)
  }
  info=(value)=>{
    console.log(value)
  }
  getHouseInf(){
    let params = {
      
    }
    getHouseInfAPI1(
      (res)=>{
        let data = res.data
        this.setState({landlordInfo: res.data})
        console.log(data)
      },
      ()=>{},
      params
    )
  }
  reload=()=>{
    this.getLandlordInf()
    alert('刷新')
  }
  render(){
    const reload = <Button onClick={this.reload} type="primary" size="small" icon="reload"></Button>
    const headItem = ['标题', '省份', '押金', '租赁方式', reload]
    const headItemParams = {
      item: headItem
    }
    const contentItemHandle = {
      pluse: this.pluse,
      close: this.close,
      edit: this.edit,
      info: this.info
    }
    const landlordInfo = this.state.landlordInfo
    const contentItemArray = new Array()
    for(let index in landlordInfo){
      let info = landlordInfo[index]
      let params = {
        item: [info.House_Headline, info.House_Province, info.House_CashDeposit, info.House_LeaseMoney + ' / ' + info.House_Mode],
        callParams: {
          houseID: info.House_ID
        }
      }
      let kids =  <ContentItem key={index} {...params} {...contentItemHandle}/>
      contentItemArray.push(kids)
    }
    return(
      <div>
        <HeadItem {...headItemParams}/>
        {
          contentItemArray
        }
      </div>
    )
  }
}


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
      "usersPass": this.state.usersPass,
      Users_Rank: '管理员'
    }
    loginAPI1((res)=>{
      let data = res.data
      console.log(data)
      if(data != '查询错误') {
        window.location.href = '#/home'
        Cookies.set('usersID', data[0].Users_ID)
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





class RootRegistrationForm extends React.Component {
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
          Users_Rank: '管理员',
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

const RootWrappedRegistrationForm = Form.create({ name: 'register' })(RootRegistrationForm);




ReactDOM.render(<App />, document.getElementById('app'));

