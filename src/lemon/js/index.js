import React from 'react';
import ReactDOM from 'react-dom';
import { BasicRoute, HeaderBar, CentreContent } from './router';
import { Menu, Icon, Row, Col } from 'antd';

import { UsersFollowPanelArray } from './firia'
import { rightContent } from '../css/index.css'

const { SubMenu } = Menu;

class RightContent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={rightContent}>
        <UsersFollowPanelArray />
      </div>
    )
  }
}



class Content extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="gutter-example">
                <Row>
                    <Col className="gutter-row" span={24}>
                        <Row>
                            <Col className="gutter-row" xl={2} lg={0} md={0} sm={0} xs={0}>
                                2
            </Col>
                            <Col className="gutter-row" xl={4} lg={2} md={0} sm={0} xs={0}>
                                4
            </Col>
                            <Col className="gutter-row" xl={12} lg={13} md={16} sm={24} xs={24}>
                              <CentreContent />
                            </Col>
                            <Col className="gutter-row" xl={4} lg={9} md={8} sm={0} xs={0}>
                              <RightContent />
                            </Col>
                            <Col className="gutter-row" xl={2} lg={0} md={0} sm={0} xs={0}>
                                2
            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <HeaderBar />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);