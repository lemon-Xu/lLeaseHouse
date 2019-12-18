import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import { Menu, Icon, Button, Row, Col, Modal, Upload, message, Form, Input, Checkbox, Select, Tooltip, Cascader, AutoComplete, Radio } from 'antd';
import { HouseBriefInf, HouseBriefInfArray, HouseInf, HouseInfInput } from './houseLeaseInf'
import { getUsersInfAPI1, getHouseInfAPI1, usersRegisterAPI1 } from './ajaxAPI1'

const { SubMenu } = Menu;



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


        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandlordContent} />
                    <Route exact path="/home" component={LandlordContent}  />
                    <Route exact path="/landlord" component={LandlordContent} />
                    <Route exact path="/ternant" component={TernantContent}  />
                    <Route exact path="/houseInf" component={HouseInfContent}  />
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
    console.log(this.handleSubmit)
    this.props.onGetSubmit(this.handleSubmit);
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
         <Form.Item label="Stats">
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
        return {
          status: Form.createFormField({
            ...props.status,
            value: props.status,
          }),
        };
      }
  }) (RegistrationForm);



class LandlordContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      landlordInfo: [],
      title: ['添加房东','删除房东','修改房东信息','房东详细信息'],
      modalKids: [<LandlordRegistrationForm status="房东" onGetSubmit={this.addSubmitReceiver}/>,<WrappedRegistrationForm/>,<WrappedRegistrationForm/>,<WrappedRegistrationForm/>],
      titleNum: 3,
      visible: false,
      confirmLoading: false
    }
    this.onOkHandle = new Array()
  }
  addSubmitReceiver=(fun)=>{
    console.log(this.onOkHandle)
    this.onOkHandle.push(fun)
  }
  handleOk=()=>{
    this.onOkHandle[0]()
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
  }
  edit=(value)=>{
    this.setState({visible: true, titleNum: 2})
    console.log(this.state)
    console.log(value)
  }
  info=(value)=>{
    this.setState({visible: true, titleNum: 3})
    console.log(value)
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
    const { title, titleNum, visible, confirmLoading, modalKids} = this.state
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

ReactDOM.render(<App />, document.getElementById('app'));

