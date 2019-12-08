import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Icon } from 'antd';
import { houseLeaseInf, floatRight } from '../css/houseLeaseInf.css'
import { getHouseInfAPI1 } from './ajaxAPI1'
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

export {HouseBriefInf, HouseBriefInfArray}