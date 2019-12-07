import React from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { Menu, Icon, Row, Col } from 'antd';
// import {createStore} from 'redux'

import { Home } from './a';
import { Detail } from './b';
import { Login } from './login'
import { Information } from './yeyu'

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
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/renting" component={Detail} />
                    <Route exact path="/rentOut" component={Login} />
                    <Route exact path="/community" component={Information} />
                    {console.log('router')}
                </Switch>
            </HashRouter>
        )
    }
}



class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'mail',
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
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
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
            <div className="gutter-example">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                    <Col className="gutter-row" span={24}>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col className="gutter-row" span={2}>
                                2
            </Col>
                            <Col className="gutter-row" span={4}>
                                4
            </Col>
                            <Col className="gutter-row" span={12}>
                                <NavigationBar />
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Icon type="bell" />
                                <Icon type="user" />
                            </Col>
                            <Col className="gutter-row" span={2}>
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