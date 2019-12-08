import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Icon } from 'antd';
import { houseLeaseInf } from '../css/houseLeaseInf.css'
import { getHouseInfAPI1 } from './ajaxAPI1'
class HouseBriefInf extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={houseLeaseInf}>
                <div>
                    <img src="/public/images/logo.png"></img>
                </div>
                <div>
                    <p>{this.props.title}</p>
                    <p><span>{this.props.street}</span>街道<span>{this.props.district}</span>区</p>
                    <p>{this.props.introduce}</p>
                </div>
                <div>
                    <p>{this.props.leaseMoney}<span>/{this.props.leaseType}</span></p>
                    <span>
                        <Icon type="heart"></Icon>
                    </span>
                </div>
            </div>
        )
    }
} 

class HouseBriefInfArray extends React.Component{
    constructor(props){
        super(props)
        this.inf = new Array()
        this.inf.push({
            title: '房源',
            street: '百草路',
            district: '1号',
            introuce: '很懒',
            leaseMoney: '800',
            leaseType: '月'
        })
    }
    toGetHouseInf(){
        let params = {
            
        }
        getHouseInfAPI1(
            (res)=>{},
            (err)=>{},
            params
            )
    }
    render(){
        let array = new Array;
        for(let index in this.inf){
            array.push(<HouseBriefInf {...this.inf[index]} />)
        }
        return(
            <div>
                {
                    array.map((item, index)=>{
                        return <div key={item}>{item}</div>
                    })
                }
            </div>
        )
    }
}

export {HouseBriefInf, HouseBriefInfArray}