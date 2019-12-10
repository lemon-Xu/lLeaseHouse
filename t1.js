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
class Man extends EventEmiter { }
let man = new Man()
function findGirl() {
    console.log('找新的女朋友')
}
function saveMoney() {
    console.log('省钱')
    console.log('arguments' + JSON.stringify(arguments));
}

man.on('失恋', saveMoney)
man.on('失恋', findGirl)

man.emit('失恋', ['wewe', 'jjj']);
man.emit('失恋', ['wewe', 'jjj']);


class InfManager{
    constructor(inf){
        this._inf = inf
        this.callback = {}
    }

    setInf(key, val){
        this._inf[key] = val
        let callback = this.callback[key]
        for(let index in callback){
            callback[index](inf[key])
        }
    }

    getInf(){
        return this._inf
    }

    listenerInf(key, callback){
        if(inf == null && inf == undefined){
            throw 'inf非法'
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
let inf = {
    houseInput:{
        houseID: 1,
        usersName: 'lemon'
    },
    usersID:{
        usersID: 2,
        usersName: 'yeyu',
        date: '2018-5-9'
    }
}
let infManager = new InfManager(inf)

infManager.setInf('houseInput', {hosueID:2, usersNmae:'lemon2'})
infManager.listenerInf('houseInput', (inf)=>{
    let a = inf
    console.log(typeof(inf))
    console.log(inf.hosueID)
})
infManager.setInf('houseInput', {hosueID:2, usersNmae:'lemon2'})