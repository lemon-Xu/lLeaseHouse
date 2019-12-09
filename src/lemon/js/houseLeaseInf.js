import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Icon, Row, Col, Button } from 'antd';
import { houseLeaseInf, floatRight } from '../css/houseLeaseInf.css'
import { getHouseInfAPI1 } from './ajaxAPI1'
import { Link } from 'react-router-dom'

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
                        <Col span={24}>/</Col>
                        <HouseAllInf {...this.state.inf.houseAllInf} />
                        <Col span={24}>/</Col>
                        <DealInf {...this.state.inf.dealInf} />
                        <Col span={24}>/</Col>
                        <Col span={24}>
                            <Button>租赁</Button>
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
                        <Col span={24}>/</Col>
                        <HouseAllInf {...houseAllInf} />
                        <Col span={24}>/</Col>
                        <DealInf {...dealInf} />
                        <Col span={24}>/</Col>
                        <Col span={24}>
                            <Button>租赁</Button>
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
                    <Col span={24}>房东信息<span></span></Col>
                    <Col span={24}>手机号码:<span>{this.props.landlordPhone}</span></Col>
                    <Col span={24}>房东名称:<span>{this.props.landlordName}</span></Col>
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
                    <Col span={24}>房源信息<span></span></Col>
                    <Col span={24}>地址:<span>{this.props.address}</span></Col>
                    <Col span={24}>面积:<span>{this.props.area}</span><span>{this.props.areaType}</span></Col>
                    <Col span={24}>简介:<span>{this.props.introduction}</span></Col>
                    <Col span={24}>照片:<span>{this.props.imgArray}</span></Col>
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
                    <Col span={24}>交易信息<span></span></Col>
                    <Col span={24}>租赁方式:<span>{this.props.leaseMoney}</span>/<span>{this.props.leaseType}</span></Col>
                    <Col span={24}>押金:<span>{this.props.cashDeposit}</span></Col>
                    <Col span={24}>电子合同:<span>{this.props.electronicContract}</span></Col>
                </Row>
            </div>  
        )
    }
}

export { HouseBriefInf, HouseBriefInfArray, HouseInfInputPanel, HouseInf }