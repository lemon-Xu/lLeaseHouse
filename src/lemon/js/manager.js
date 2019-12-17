import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import { Menu, Icon, Button, Row, Col } from 'antd';
import { HouseBriefInf, HouseBriefInfArray, HouseInf, HouseInfInput } from './houseLeaseInf'
import { getUsersInfAPI1 } from './ajaxAPI1'
const { SubMenu } = Menu;

class Navigation extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
      // let params = this.props.match.params
      // let primary = params.primary
      // let secondary = params.secondary   
      // let selectedKeys = 'home'
      // let openKeys = ''   
      // if(primary != undefined){
      //   openKeys = primary
      // }
      // if(secondary != undefined && primary != undefined){
      //   selectedKeys = '#/' + params.primary + '/' + params.secondary
      // }
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          // defaultSelectedKeys={[selectedKeys]}
          // defaultOpenKeys={[openKeys]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="#/">
            <span>home</span>
          </Menu.Item>
          <SubMenu
            key="landlord"
            title={
              <span>
                <span>landlord</span>
              </span>
            }
          >
            <Menu.Item key="#/landlord/add"><a href={'#/landlord/add'}>增</a></Menu.Item>
            <Menu.Item key="#/landlord/delete"><a href={'#/landlord/delete'}>删</a></Menu.Item>
            <Menu.Item key="#/landlord/set"><a href={'#/landlord/set'}>改</a></Menu.Item>
            <Menu.Item key="#/landlord/select"><a href={'#/landlord/select'}>查</a></Menu.Item>
          </SubMenu>
          <SubMenu
            key="tenant"
            title={
              <span>
                <span>tenant</span>
              </span>
            }
          >
            <Menu.Item key="#/tenant/add"><a href={'#/tenant/add'}>增</a></Menu.Item>
            <Menu.Item key="#/tenant/delete"><a href={'#/tenant/delete'}>删</a></Menu.Item>
            <Menu.Item key="#/tenant/set"><a href={'#/tenant/set'}>改</a></Menu.Item>
            <Menu.Item key="#/tenant/select"><a href={'#/tenant/select'}>查</a></Menu.Item>
          </SubMenu>
          <SubMenu
            key="houseInf"
            title={
              <span>
                <span>houseInf</span>
              </span>
            }
          >
             <Menu.Item key="#/houseInf/add"><a href={'#/houseInf/add'}>增</a></Menu.Item>
            <Menu.Item key="#/houseInf/delete"><a href={'#/houseInf/delete'}>删</a></Menu.Item>
            <Menu.Item key="#/houseInf/set"><a href={'#/houseInf/set'}>改</a></Menu.Item>
            <Menu.Item key="#/houseInf/select"><a href={'#/houseInf/select'}>查</a></Menu.Item>
          </SubMenu>
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
                    <Route exact path="/" component={HouseBriefInf} />
                    <Route exact path="/home" component={App} />
                    <Route exact path="/landlord" component={LandlordContent} />
                    <Route exact path="/tenant" component={App} />
                    <Route exact path="/houseInf" component={App} />
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
                    {/* <Route exact path="/:primary/" component={Navigation} />
                    <Route exact path="/:primary/:secondary" component={Navigation} /> */}
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
        {/* <Col span={2}>{plus}</Col> */}
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

ReactDOM.render(<App />, document.getElementById('app'));

