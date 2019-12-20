import React from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { Menu, Icon, Row, Col } from 'antd';
// import {createStore} from 'redux'

import { Home } from './a';
import { Detail } from './b';
import { Login, Register, WrappedRegistrationForm } from './login'
import { Information } from './yeyu'
import { HouseBriefInf, HouseBriefInfArray, HouseInf, HouseInfInput, OrderForm } from './houseLeaseInf'
import { Users_1, UsersFollowPanelArray } from './firia'

import { headerBar, iconSize} from '../css/router.css'
const { SubMenu } = Menu;

class BasicRoute extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/detail" component={Detail} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/usersInformation" component={Information} />
                    {console.log('router')}
                </Switch>
            </HashRouter>
        )
    }

}





class CentreContent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={HouseBriefInfArray} />
                    <Route exact path="/tenant/reting/:houseID/:usersID" component={HouseInf} />
                    <Route exact path="/tenant/orderForm" component={OrderForm} />
                    <Route exact path="/renter/renting" component={HouseInfInput} />
                    <Route exact path="/community" component={Information} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={WrappedRegistrationForm} />
                </Switch>
            </HashRouter>
        )
    }
}

class LoginOrRegister extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </HashRouter>
        )
    }
}


class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        let current = ''
        let who = ''
        let what = ''
        console.log('match', this.props.match.params)
        if(this.props.match.params.who)
            who = '/'+this.props.match.params.who
        if(this.props.match.params.what)
            what = '/'+this.props.match.params.what
        current = who + what
        if(current == '')
            current = 'home'
        console.log('current: ',current)
        this.state = {
            current: current,
        };
        this.handleClick = this.handleClick.bind(this)
        console.log(current)
    }

    handleClick(e) {
        window.location.href = '#'+e.key
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        const { current } = {...this.state}
        console.log(current)
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme="dark">
                <Menu.Item key="/home">主页</Menu.Item>
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                        租客
                        </span>
                    }
                    key="tenant"
                    >
                    <Menu.Item key="/tenant/reting">租房</Menu.Item>
                    <Menu.Item key="/tenant/orderForm">查看历史订单</Menu.Item>
                </SubMenu>
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                        房东
                        </span>
                    }
                    key="renter"
                    >
                    <Menu.Item key="/renter/renting">出租</Menu.Item>
                </SubMenu>
                <Menu.Item key="/community">community</Menu.Item>
                {/* <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Navigation Three - Submenu
              </span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          </Menu.Item> */}
            </Menu>
        );
    }
}



class HeaderBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gutter-example" >
                <Row>
                    <Col className="gutter-row" span={24} className={headerBar}>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col className="gutter-row" span={2} className={headerBar}>
                                2
            </Col>
                            <Col className="gutter-row" span={4} className={headerBar}>
                                4
            </Col>
                            <Col className="gutter-row" span={12}>
                                <HashRouter>
                                    <Switch>
                                        <Route path="/:who/:what" component={NavigationBar} />
                                        <Route path="/:who" component={NavigationBar} />
                                        <Route exact path="/" component={NavigationBar} />
                                        
                                        
                                        {/* <Route exact path="/:navigation" component={NavigationBar} /> */}
                                    </Switch>
                                </HashRouter>
                            </Col>
                            <Col className="gutter-row" span={4} className={headerBar}>
                               <a href="#/login">登陆</a>
                               <span>|</span>
                               <a href="#/register">注册</a>
                            </Col>
                            <Col className="gutter-row" span={2} className={headerBar}>
                                2
            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export { BasicRoute, HeaderBar, CentreContent };