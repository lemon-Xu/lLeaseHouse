import React from 'react';
import Cookies from 'js-cookie'
import { Icon, Row, Col, Button, DatePicker, Input, InputNumber, Select } from 'antd';
import { houseLeaseInf, floatRight, gridBar, gridBarBorderTop } from '../css/houseLeaseInf.css'
import { getHouseInfAPI1, postHouseInfAPI1 } from './ajaxAPI1'
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Avatar, addressCascaderOptions, PicturesWall, PicturesWallShow } from './public'

import { Cascader } from 'antd';

const {Option}  = Select

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


//发布订阅模式
class EventEmiter {
    constructor() {
        //维护一个对象
        this._events = {

        }
    }
    on(eventName, callback) {
        if (this._events[eventName]) {
            //如果有就放一个新的
            this._events[eventName].push(callback);
        } else {
            //如果没有就创建一个数组
            this._events[eventName] = [callback]
        }
    }
    emit(eventName, ...rest) {
        // console.log(...rest + 'rest的写法')
        // alert(...rest)
        if (this._events[eventName]) { //循环一次执行
            this._events[eventName].forEach((item) => {
                item.apply(this, rest)
            });
        }
    }
    removeListener(eventName, callback) {
        alert(callback)
        if (this._events[eventName]) {
            //当前数组和传递过来的callback相等则移除掉
            this._events[eventName] =
                this._events[eventName].filter(item => item !== callback);
        }
    }
    once(eventName, callback) {
        function one() {
            //在one函数运行原来的函数，只有将one清空
            callback.apply(this, arguments);
            //先绑定 执行后再删除
            this.removeListener(eventName, one);
        }
        this.on(eventName, one);
        //此时emit触发会执行此函数，会给这个函数传递rest参数
    }
}
// class Man extends EventEmiter { }
// let man = new Man()
// function findGirl() {
//     console.log('找新的女朋友')
// }
// function saveMoney() {
//     console.log('省钱')
//     console.log('arguments' + JSON.stringify(arguments));
// }

// man.on('失恋', saveMoney)
// man.on('失恋', findGirl)

// man.emit('失恋', ['wewe', 'jjj']);
// man.emit('失恋', ['wewe', 'jjj']);














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
                    <img src={this.props.coverImg}></img>
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
                console.log(data.length)
                for(let index in data){
                    console.log('-----')
                    let house = {
                        usersName: data[index].Users_Name,
                        houseID: data[index].House_ID,
                        landlordID: data[index].House_Users_ID,
                        title: data[index].House_Headline,
                        city: data[index].House_City,
                        district: data[index].House_District,
                        introuce: data[index].House_Profile,
                        leaseMoney: data[index].House_LeaseMoney,
                        leaseType: data[index].House_Mode,
                        coverImg: '/public/images/' + data[index].houseCoverImg[0].HouseCoverImg_FileName,
                        houseImgArray: new Array()
                    }
                    for(let index2 in data[index].houseImg){
                        house.houseImgArray.push(data[index].houseImg[index2].HouseImg_FileName)
                        console.log(data[index].houseImg[index2].HouseImg_FileName)
                    }
                    houseInf.push(house)
                }
               console.log('12312')
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
                inf.houseAllInf.coverImg = data.houseCoverImg[0].HouseCoverImg_FileName
                inf.houseAllInf.imgArray = new Array()
                for(let index in data.houseImg){
                    inf.houseAllInf.imgArray.push(data.houseImg[index].HouseImg_FileName)
                }
                console.log('123123212312')
                console.log(data.houseImg)

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
                    <Col span={24}>
                        <Row>
                            <Col span={4}>照片:</Col>
                            <Col span={18}><PicturesWallShow imgArray={this.props.imgArray}/></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
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





class InfManager{
    constructor(inf){
        this._inf = inf
        this.callback = {}
    }

    //设置this._inf[key]得值然后触发回调函数
    setInf(key, val){
        this._inf[key] = val
        let callback = this.callback[key]
        for(let index in callback){
            callback[index](this._inf[key])
        }
    }

    getInf(){
        return this._inf
    }

    //设置this._inf[key]的回调函数
    listenerKey(key, callback){
        if(key == null && key == undefined){
            throw 'key非法'
        }
        if(callback == null && callback == undefined){
            throw 'callback非法'
        }
        if(this.callback[key]){
            this.callback[key].push(callback)
        } else {
            this.callback[key] = [callback]
        }
    }

    getCallBack(){
        return this.callback
    }
}




// 房屋信息填写组件
class HouseInfInput extends React.Component{
    constructor(props){
        super(props)
        this.params = {
            houseAllInfInput: {},
            dealInfInput: {},
            loading: false,
            num: 0
        }
       this.infManager = new InfManager(this.params)
       this.infManager.listenerKey('houseAllInfInput', (value)=>{console.log(value)})
       console.log('-----inf===',this.infManager.getInf().num)
       this.infManager.listenerKey('num', (value)=>{
           if(this.infManager.getInf().num == 2){
               console.log('开始请求后端添加房屋信息')
               postHouseInfAPI1(
                   ()=>{console.log()},
                   ()=>{},
                   this.infManager.getInf()
               )
               this.infManager.setInf('num', 0)
           }
        })
    }

    handleChange(event){

    }

    handleHouseAllInputChange(event){
        
    }

    handleDealInfInputChange(event){
        
    }

    handleDateChange(event){
        
    }
    click=()=>{
        console.log(this)
        this.infManager.setInf('loading', true)
        console.log(this.infManager.getInf())
    }
    toSetHouseLeaseInf(){
        let params = this.params
        postHouseInfAPI1(
            ()=>{},
            ()=>{},
            params
        )
        console.log(params)

    }


    render(){
        return(
            <div>
                <Row>
                    <HouseAllInfInput infManager={this.infManager} />
                    <GridBarBorder />
                    <DealInfInput  infManager={this.infManager} />
                    <GridBarBorder />
                    <Col span={24}>
                        <Button type="primary" block onClick={this.click}>租赁</Button>
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
        this.handleChange = this.handleChange.bind(this)

        if(Cookies.get('usersID') == undefined){
            alert('请先登陆')
            window.location.href = '#/login'
        }
        this.params = {
            title: null,
            area: null,
            areaType: null,
            city: null,
            address: null,
            profile: null,
            imgArray: null,
            coverImg: null,
            province: null,
            district: null,
            usersID: Cookies.get('usersID')
        }
        this.changeInfManager = this.changeInfManager.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.areaTypeChange = this.areaTypeChange.bind(this)
        this.cascaderChange = this.cascaderChange.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.profileChange = this.profileChange.bind(this)

        this.infManager = this.props.infManager
        this.infManager.listenerKey('loading', this.changeInfManager)  
    }
    handleChange(event){
        this.props.handleChange(event)
    }
    titleChange(event){
        this.params.title = event.target.value
        console.log(this.params)
    }
    areaChange=(value)=>{
        this.params.area = value
    }
    areaTypeChange=(value, options)=>{
        this.params.areaType = value
    }
    cascaderChange(value, options){
        if(value.length == 3)
            this.params.province = value[0]
            this.params.city = value[1]
            this.params.district = value[2]
        console.log('-----------------',value,' cascader ',options,'-------------------')
       
    }
    addressChange(event){
        this.params.address = event.target.value
        console.log(event.target.value)
    }
    profileChange(event){
        this.params.profile = event.target.value
    }
    imgGetRes=(res)=>{
        this.params.imgArray = res
    }
    coverImgGetRes=(res)=>{
        this.params.coverImg = res
    }
    changeInfManager=(value)=>{
        if(value){
            this.infManager.setInf('houseAllInfInput', this.params)
            this.infManager.setInf('num',this.infManager.getInf().num + 1)
        }
    }
    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>房源信息</p></GridBar>
                    <GridBar><p>标题:</p><Input placeholder="标题" onChange={this.titleChange}/></GridBar>
                    <GridBar>
                        <p>面积:</p><InputNumber min={0} max={10000000}  onChange={this.areaChange}/>
                        <div>
                            <Select placeholder="面积类型" style={{ width: 120 }} onSelect={this.areaTypeChange}>
                                <Option value="平方米">平方米</Option>
                                <Option value="平方英尺" disabled>平方英尺</Option>
                            </Select>
                        </div>
                        </GridBar>
                    <Col span={24}>
                        <Row>
                            <Col span={4}>地址:</Col>
                            <Col span={10}><Cascader size={"large"} options={addressCascaderOptions} placeholder="Please select" onChange={this.cascaderChange} /></Col>
                            <Col span={8}><Input placeholder="如：百草路1号-10栋-404" onChange={this.addressChange}/></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={4}>简介:</Col>
                            <Col span={18}><Input.TextArea rows={10} onChange={this.profileChange}/></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <GridBar><p>封面照片:</p><Avatar getResponse={this.coverImgGetRes}/></GridBar>
                    <Col span={24}>
                        <Row>
                            <Col span={4}>房屋照片</Col>
                            <Col span={18}><PicturesWall getResponse={this.imgGetRes}/></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                </Row>
            </div> 
        )
    }
}

// 交易信息填写组件
class DealInfInput extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.infManager = this.props.infManager
        this.params = {
            leaseType: null,
            leaseMoney: null,
            cashDeposit: null,
            electronicContract: null,
        }
        this.infManager.setInf('dealInfInput', this.params)
        this.infManager.listenerKey('loading', this.changeInfManager)

    }
    handleChange(event){

    }
    leaseType = (event)=>{
        this.params.leaseType = event.target.value
    }

    leaseMoney = (value)=>{
        this.params.leaseMoney = value
    }

    cashDeposit = (value)=>{
        this.params.cashDeposit = value
    }

    electronicContract = (event)=>{
        this.params.electronicContract = event.target.value
    }

    changeInfManager=(value)=>{
        if(value){
            this.infManager.setInf('dealInfInput', this.params)
            this.infManager.setInf('num',this.infManager.getInf().num + 1)
        }
    }

    render(){
        return(
            <div>
                <Row>
                    <GridBar><p>交易信息</p></GridBar>
                    <GridBar><p>租赁方式:</p><InputNumber placeholder="800" onChange={this.leaseMoney} /><Input placeholder="month" onChange={this.leaseType} /><p></p></GridBar>
                    <GridBar><p>押金:</p><InputNumber placeholder="400" onChange={this.cashDeposit}/></GridBar>
                    <GridBar><p>电子合同:</p><Input placeholder="无" onChange={this.electronicContract}/></GridBar>
                </Row>
            </div>
        )
    }
}

export { HouseBriefInf, HouseBriefInfArray, HouseInfInputPanel, HouseInf, HouseInfInput }