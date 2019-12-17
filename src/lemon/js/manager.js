import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import { Menu, Icon, Button, Row, Col } from 'antd';
import { HouseBriefInf, HouseBriefInfArray, HouseInf, HouseInfInput } from './houseLeaseInf'
import { getUsersInfAPI1, getHouseInfAPI1 } from './ajaxAPI1'
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

class LandlordContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      landlordInfo: []
    }
  }
  componentDidMount(){
    this.getLandlordInf()
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

