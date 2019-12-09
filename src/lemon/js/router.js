import React from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { Menu, Icon, Row, Col } from 'antd';
// import {createStore} from 'redux'

import { Home } from './a';
import { Detail } from './b';
import { Login, Register } from './login'
import { Information } from './yeyu'
import { HouseBriefInf, HouseBriefInfArray, HouseInf } from './houseLeaseInf'
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
                    <Route exact path="/renting/:houseID/:usersID" component={HouseInf} />
                    <Route exact path="/rentOut" component={Login} />
                    <Route exact path="/community" component={Information} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
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
        this.state = {
            current: 'home',
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                <Menu.Item key="home">
                    <a href="#/home"><Icon type="home" />home</a>
                </Menu.Item>
                <Menu.Item key="renting">
                    <a href="#/renting">renting</a>
                </Menu.Item>
                <Menu.Item key="rentOut">
                    <a href="#/rentOut">rentOut</a>
                </Menu.Item>
                <Menu.Item key="community">
                    <a href="#/community">community</a>
                </Menu.Item>
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
                                <NavigationBar />
                            </Col>
                            <Col className="gutter-row" span={4} className={headerBar}>
                                <Icon type="bell" />
                                <Icon type="user" />
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