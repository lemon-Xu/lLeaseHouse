import React from 'react';
import { Icon, Row, Col, Button, DatePicker } from 'antd';
import { gridBar } from '../css/houseLeaseInf.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'L';



class GridBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const kids = React.Children.map(this.props.children, child => {
                        return child
                    })
        console.log(kids)
        for(let index = kids.length; index < 5; index++){
            kids.push(<p></p>)
        }
        return(
            <Col span={24}>
                <Row className={gridBar}>
                    <Col span={4}>{kids[0]}</Col>
                    <Col span={6}>{kids[1]}</Col>
                    <Col span={4}>{kids[2]}</Col>
                    <Col span={6}>{kids[3]}</Col>
                    <Col span={2}>{kids[4]}</Col>
                </Row>
            </Col>
        )
    }
}
