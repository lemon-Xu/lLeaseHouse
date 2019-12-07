import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Icon } from 'antd';
import {houseLeaseInf} from '../css/houseLeaseInf.css'
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
                    <p>房源标题</p>
                    <p><span>1</span>街道<span>2</span>区</p>
                    <p>巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉芭芭拉</p>
                </div>
                <div>
                    <p>369/月</p>
                    <span>
                        <Icon></Icon>
                        <Icon></Icon>
                    </span>
                </div>
            </div>
        )
    }
} 

export {HouseBriefInf}