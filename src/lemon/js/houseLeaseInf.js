import React from 'react';
import Cookies from 'js-cookie'
import { Icon, Row, Col, Button, DatePicker, Input } from 'antd';
import { houseLeaseInf, floatRight, gridBar, gridBarBorderTop } from '../css/houseLeaseInf.css'
import { getHouseInfAPI1 } from './ajaxAPI1'
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';

import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}

// ReactDOM.render(
//   <Cascader options={options} onChange={onChange} placeholder="Please select" />,
//   mountNode,
// );




moment.locale('zh-cn');

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

class GridBarBorder extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Col span={24} >
                <Row>
                    <Col span={1}><p></p></Col>
                    <Col span={22} className={gridBarBorderTop}><p></p></Col>
                    <Col span={1}><p></p></Col>
                </Row>
            </Col>
        )
    }
}


// 房源最小信息组件
class HouseBriefInf extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            followIcon: 'outlined'
        }
    }
    handleClick(event){
        console.log('被点了')
        let followIcon = this.state.followIcon == 'filled' ? 'outlined' : 'filled'
        this.setState({followIcon: followIcon})
        
    }
    render(){
        return(
            <div className={houseLeaseInf}>
                <div>
                    <img src="/public/images/logo.png"></img>
                </div>
                <div>
                    <p>{this.props.title}</p>
                    <p><span>{this.props.city}</span><span>{this.props.district}</span></p>
                    <p>{this.props.introduce}</p>
                </div>
                <div>
                    <Link to={"/renting/" + this.props.houseID + '/' + this.props.usersName}>详情</Link>
                    <p>{this.props.leaseMoney}<span>/{this.props.leaseType}</span></p>
                    <span>
                        <Icon type="heart" theme={this.state.followIcon} className={floatRight} onClick={this.handleClick}></Icon>
                    </span>
                </div>
            </div>
        )
    }
} 

class HouseBriefInfArray extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inf: new Array()
        }
        this.state.inf.push({
            houseId: 1,
            title: '房源',
            street: '百草路',
            district: '1号',
            introuce: '很懒',
            leaseMoney: '800',
            leaseType: '月'
        })
    }
    componentDidMount(){
        this.toGetHouseInf()
    }
    toGetHouseInf(){
        let params = {
            House_IsBan: 0
        }
        getHouseInfAPI1(
            (res)=>{
                let data = res.data
                if(data == '查询错误'){
                    console.log('房屋信息查询错误')
                    return
                }
                console.log(data)
                let houseInf = new Array()
                for(let index in data){
                    let house = {
                        usersName: data[index].Users_Name,
                        houseID: data[index].House_ID,
                        landlordID: data[index].House_Users_ID,
                        title: data[index].House_Headline,
                        city: data[index].House_City,
                        district: data[index].House_District,
                        introuce: data[index].House_Profile,
                        leaseMoney: data[index].House_LeaseMoney,
                        leaseType: data[index].House_Mode
                    }
                    houseInf.push(house)
                }
               this.setState({
                   inf: houseInf
               })
            },
            (err)=>{},
            params
            )
    }
    render(){
        let array = new Array;
        console.log(this.state.inf)
        for(let index in this.state.inf){
            array.push(<HouseBriefInf {...this.state.inf[index]} />)
        }
        return(
            <div>
                {
                    array.map((item, index)=>{
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
        )
    }
}


class HouseInfInputPanel extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div></div>
        )
    }
}


class HouseInf extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inf: '',
            loading: true
        }
    }


    toAnalysisInf(){
        
    }

    toGetInf(houseID, usersName){
        console.log(!this.state.loading)
        if(!this.state.loading)
            return
        let landlordInf
        let houseAllInf
        let dealInf

        let params = {
            House_ID: houseID,
            Users_Name: usersName,
            House_IsBan: 0
        }

        getHouseInfAPI1(
            (res)=>{
                console.log('----------HouseAllInf------------------')
                let data = res.data
                if(data == '查询错误'){
                    console.log('房屋信息查询错误')
                    return
                }
                console.log(data)
                let inf = {
                    landlordInf: {},
                    houseAllInf: {},
                    dealInf: {}
                }
                data=data[0]
                inf.landlordInf.landlordPhone = data.Users_Phone
                inf.landlordInf.landlordName = data.Users_Name

                inf.houseAllInf.address = data.House_Address
                inf.houseAllInf.area = data.House_Area
                inf.houseAllInf.areaType = data.House_AreaType
                inf.houseAllInf.introduction = data.House_Profile

                inf.dealInf.cashDeposit = data.House_CashDeposit
                inf.dealInf.leaseMoney = data.House_LeaseMoney
                inf.dealInf.leaseType = data.House_Mode
                inf.dealInf.electronicContract = data.House_ElectronicContractTemplate

                this.setState({
                    inf: inf,
                    loading: false
                })
                console.log('----------HouseAllInf------------------')
            },
            (err)=>{},
            params
            )
    }

    render(){
        const houseID = this.props.match.params.houseID
        const usersID = this.props.match.params.usersID
        let landlordInf = this.props.landlordInf
        let houseAllInf = this.props.houseAllInf
        let dealInf = this.props.dealInf

        console.log(houseID,usersID)

        if(houseID != null && houseID != undefined && usersID != null && usersID != undefined){
            this.toGetInf(houseID, usersID)
            console.log({...this.state.inf.landlordInf})
            console.log({...this.state.inf.houseAllInf})
            console.log({...this.state.inf.dealInf})
            return(
                <div>
                    <Row>
                        <LandlordInf {...this.state.inf.landlordInf} />
                        <GridBarBorder />
                        <HouseAllInf {...this.state.inf.houseAllInf} />
                        <GridBarBorder />
                        <DealInf {...this.state.inf.dealInf} />
                        <GridBarBorder />
                        <Col span={24}>
                            <RangePicker defaultValue={[moment(moment().format(dateFormat), dateFormat), moment(moment().format(dateFormat), dateFormat)]} format={dateFormat}/>
                        </Col>
                        <Col span={24}>
                        <Button type="primary" block>租赁</Button>
                        </Col>
                    </Row>
                </div>
            )
        } 
        else {
            return(
                <div>
                    <Row>
                        <LandlordInf {...landlordInf} />
                        <GridBarBorder />
                        <HouseAllInf {...houseAllInf} />
                        <GridBarBorder />
                        <DealInf {...dealInf} />
                        <GridBarBorder />
                        <Col span={24}>
                            <RangePicker defaultValue={[moment(moment().format('L'), 'L'), moment('2015/01/01', dateFormat)]} format={dateFormat}/>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" block>租赁</Button>
                        </Col>
                    </Row>
                </div>
            )
        }

        
    }
}

// 房东信息组件
class LandlordInf extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>房东信息:</p></GridBar>
                    <GridBar><p>房东名称:</p><p>{this.props.landlordName}</p></GridBar>
                    <GridBar><p>手机号码:</p><p>{this.props.landlordPhone}</p></GridBar>
                </Row>
            </div>
        )
    }
}

//房源组件
class HouseAllInf extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>房源信息</p></GridBar>
                    <GridBar><p>地址:</p><p>{this.props.address}</p></GridBar>
                    <GridBar><p>面积:</p><p>{this.props.area}<span>{this.areaType}</span></p></GridBar>
                    <GridBar><p>简介:</p><p>{this.props.introduction}</p></GridBar>
                    <GridBar><p>照片:</p><p>{this.props.imgArray}</p></GridBar>
                </Row>
            </div> 
        )
    }
}

//交易信息组件
class DealInf extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>交易信息</p></GridBar>
                    <GridBar><p>租赁方式:</p><p>{this.props.leaseMoney}<span>{this.props.leaseType}</span></p></GridBar>
                    <GridBar><p>押金:</p><p>{this.props.cashDeposit}</p></GridBar>
                    <GridBar><p>电子合同:</p><p>{this.props.electronicContract}</p></GridBar>
                </Row>
            </div>  
        )
    }
}

// 房屋信息填写组件
class HouseInfInput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Row>
                    <HouseAllInfInput />
                    <GridBarBorder />
                    <HouseAllInf  />
                    <GridBarBorder />
                    <DealInf  />
                    <GridBarBorder />
                    <Col span={24}>
                        <RangePicker defaultValue={[moment(moment().format('L'), 'L'), moment('2015/01/01', dateFormat)]} format={dateFormat}/>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" block>租赁</Button>
                    </Col>
                </Row>
            </div> 
        )
    }
}

//房源信息填写组件
class HouseAllInfInput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>房源信息</p></GridBar>
                    <GridBar><p>标题:</p><Input placeholder="标题" /></GridBar>
                    <GridBar><p>面积:</p><Input placeholder="" /></GridBar>
                    <Col span={24}>
                        <Row>
                            <Col span={4}>地址:</Col>
                            <Col span={9}><Cascader options={options} onChange={onChange} placeholder="Please select" /></Col>
                            <Col span={9}><Input placeholder="如：百草路1号-10栋-404" /></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={4}>简介:</Col>
                            <Col span={18}><Input.TextArea rows={10}/></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <GridBar><p>照片:</p></GridBar>
                </Row>
            </div> 
        )
    }
}

// 交易信息填写组件
class DealInfInput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div></div>
        )
    }
}

export { HouseBriefInf, HouseBriefInfArray, HouseInfInputPanel, HouseInf, HouseInfInput }