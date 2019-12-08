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
                              <CentreContent />
                            </Col>
                            <Col className="gutter-row" span={4}>
                              <RightContent />
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