const path = require("path");
const fs = require("fs");
const mysql2 = require("mysql2")
const winston = require('winston')


class SqlSessionFactoryBuilder{
    
    constructor(){
        this.sqlMapConfigUrl = path.resolve(__dirname, 'sqlMapConfig.json')
        this.parsed = false
        this.config = null
        this.connectionConfig = new Object()
        this.pool = null
    }

    getResource(resource){
        if(this.config != null)
            throw '不能重复加载SqlSessionFactoryBuilder配置文件'
        var data = fs.readFileSync(resource)
        this.config = JSON.parse(data)
    }
    
    getResource(){
        if(this.config != null)
            throw '不能重复加载SqlSessionFactoryBuilder配置文件'
        var data = fs.readFileSync(this.sqlMapConfigUrl)
        this.config = JSON.parse(data)
    }
    
    configToSting(){
        if(this.connectionConfig == null)
            throw '没有构建SQLSession'
        return JSON.stringify(this.connectionConfig)
    }

    build(){
        if(this.parsed)
            throw '不能重复构建SQLSession'
        if(this.config == null)
            throw '配置文件为空，请使用getResourceAsReader读入sqlSessionFactoryBuilder配置文件'
        this.connectionConfig.host = this.config.host 
        this.connectionConfig.user = this.config.user
        this.connectionConfig.password = this.config.password
        this.connectionConfig.database = this.config.database

        this.connectionConfig.waitForConnections = this.config.waitForConnections | null 
        this.connectionConfig.connectionLimit = this.config.connectionLimit | null
        this.connectionConfig.queueLimit = this.config.queueLimit | null
        try{
            this.pool = mysql2.createConnection(this.connectionConfig)
        } catch(err) {
            console.log(err);
            console.log('创建数据库池失败请检查SqlSessionFactoryBuilder配置文件')
        }
       return this.pool;
    }

}

class Logger{
    constructor(id){
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: {},
            transports: [
                new winston.transports.File({
                    name: 'sql',
                    filename: __dirname + '/log/sql-' + id + '.log',
                    json: true,
                    level: 'debug',
                    maxsize: 1024 * 1024 * 10 // 10MB
                })
            ]
        })
    }

    debug(mess){
        var m = {
            "sqlParser": mess,
            "date": this.date()
        }
        this.logger.debug(m)
    }

    date(){
        var date =new Date();
        var day= date.getDate();
        var month= date.getMonth();
        var year= date.getFullYear();
        var hours= date.getHours();

        var minutes= date.getMinutes();
        var seconds= date.getSeconds();
        var date = {
            "day": day,
            "month": month,
            "year": year,
            "time": hours + '-' + minutes + '-' + seconds
        }
        return date
    }
}

class MapperSQLParser{
    constructor(){
        this.url = path.resolve(__dirname, 'mapperSQL.json')
        this.config = null // 配置文件转换后的JS对象
        this.mapperSQL = new Map()
    }

    getResource(resource){
        if(this.config != null)
            throw '不能重复加载mapperSQL配置文件'
        var data = fs.readFileSync(resource)
        this.config = JSON.parse(data)
    }
    
    getResource(){
        if(this.config != null)
            throw '不能重复加载mapperSQL配置文件'
        var data = fs.readFileSync(this.url)
        this.config = JSON.parse(data)
    }

    mapperSQLToSting(){
        if(this.config == null)
            throw '没有读入mapperSQL配置文件'
        return JSON.stringify(this.config)
    }

    build(){
        for(var id in this.config){
            let b = new SqlNodeParser(this.config[id], id) 
            this.mapperSQL.set(id, b)
            b.build()
        }
    }

    getRetSQL(id,parameter){
        var sqlNodeParser = this.mapperSQL.get(id)
        if(sqlNodeParser == undefined)
            throw 'sqlNodeParser: ' + id + ' 没有注册'
        return this.mapperSQL.get(id).getRetSQL(parameter)
    }
}

class SqlNodeParser{
    constructor(sqlNode, id){
        this.sql = sqlNode['sql']
        this.set = null
        this.where = null
        this.values = null
        this.end = null
        this.retSQL = ''
        this.id = id
        this.type = sqlNode['type']
        this.logger = new Logger(id)
        if(sqlNode['values'] != null)
            this.values = new ValuesNodeParser(sqlNode['values'])
        if(sqlNode['set'] != null)
            this.set = new setNodeParser(sqlNode['set'])
        if(sqlNode['where'] != null && this.type != 'insert into')
            this.where = new whereNodeParser(sqlNode['where'])
        // if(sqlNode['end'] != null)
        //     this.end = new whereNodeParser(sqlNode['end'])

        this.retSQL = "";
        // console.log(sqlNode['where'])
    }

    build(){
        // if(this.if != null)
        //     this.if.build()
        // if(this.when != null)
        //     this.when.build()
        // if(this.otherwise != null)
        //     this.otherwise.build()
        if(this.values != null)
            this.values.build()
        if(this.set != null)
            this.set.build()
        if(this.where != null)
            this.where.build()
        // if(this.end != null)
        //     this.end.build()
        // if(this.foreach != null)
        //     this.foreach.build()
    }

    getRetSQL(parameter){
        let retSQL = ''
        // if(this.if != null)
        //     this.retSQL += this.if.getRetSQL(parameter)
        // if(this.when != null)
        //     this.retSQL += this.when.getRetSQL(parameter)
        // if(this.otherwise != null)
        //     this.retSQL += this.otherwise.getRetSQL(parameter)
        if(this.values != null)
            retSQL += this.values.getRetSQL(parameter)
        if(this.set != null)
            retSQL += this.set.getRetSQL(parameter)
        if(this.where != null)
            retSQL += this.where.getRetSQL(parameter)
        // if(this.end != null)
        //     this.retSQL += this.end.getRetSQL(parameter)
        // if(this.foreach != null)
        //     this.retSQL += this.foreach.getRetSQL(parameter)

        let ret = this.sql +' ' + retSQL
        this.logger.debug({
            "id": this.id,
            "parameter": parameter,
            "ret": ret
        })
        return ret
    }

}

class nodeParser{
    constructor(node){
        this.logic = new Array();
        this.sql = new Array();
        this.parserSQL = null;
        // console.log(node)
        if(node == undefined){
            return null
        }
        for(let a in node){
            this.logic.push(node[a]['logic'])
            this.sql.push(node[a]['sql'])
        }
        // console.log('node:   '+node)
        this.tokenSQL = new Array()
    }

    build(){
        let lexer = new Lexer()
        for(let a in this.logic){
            if(this.logic[a] == undefined)
                continue
            lexer.setProject(this.logic[a])
            lexer.scannerProject()
            this.tokenSQL.push(lexer.getTokenArray())
        }
    }

    getRetSQL(parameter){
        let sqlArray = new Array()
        let parameterNameArray = new Array() // 保存#{...}的真实名称
        let parameterValueArray = new Array() // 保存#{...}对应的value值
        // console.log(this.logic)
        for(var a in this.logic){
            var isTrue = this.getBoolean(this.tokenSQL[a], parameter) // 判断logic节点的逻辑表达式
            if(isTrue)
                sqlArray.push(this.getRealSQL(this.sql[a], parameter, parameterNameArray, parameterValueArray)) // 将sql节点中的#{。。。}替换成parameter中的值
        }
        // console.log(this.logic)
        return this.altRealSQL(sqlArray, parameterNameArray, parameterValueArray) // 根据节点解析需要进行变换
    }

    getBoolean(tokenArray, heap){
        let syntacticAnalyzer = new SyntacticAnalyzer()
        syntacticAnalyzer.setTokenArray(tokenArray)
        let ret = syntacticAnalyzer.scanner(heap)
        // console.log(ret)
        return ret
    }

    getRealSQL(sql, parameter, parameterNameArray, parameterValueArray){
        let a = /#{[a-zA-Z_][a-zA-Z_0-9]*}/g
        let retSQL
        let parameterArray = sql.match(a) 
        if(parameterArray == null)
            return sql
        for(let a in parameterArray){
            var str = ''
            for(let b in parameterArray[a]){ // 取真正的parameterName
                if(b<2 || b > parameterArray[a].length - 2)
                    continue
                str += parameterArray[a][b]
            }
            let para = parameter[str] // 
            
            // console.log(typeof(para))
            if(typeof(para) != 'number'){
                para = '\'' + para + '\''
            }

            parameterNameArray.push(str)
            parameterValueArray.push(para)

            retSQL = sql.replace(parameterArray[a], para)
        }
        return retSQL == undefined ? '' : retSQL

    }

    altRealSQL(sqlArray, parameterNameArray, parameterValueArray){
        let c = ''
        for(var b in sqlArray){
            c += ' ' + sqlArray[b]
        }
        return c
    }
}

class ifNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }
}

class whenNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }
}

class otherwiseNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }
}


class setNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }

    altRealSQL(sqlArray, parameterNameArray, parameterValueArray){
        let b = sqlArray[sqlArray.length - 1]
        let c = b.replace(',', ' ')
        sqlArray[sqlArray.length - 1] = c
        let ret = ''
        for(let a in sqlArray){
            ret += sqlArray[a]
        }
        return ret
    }
}

class ValuesNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }

    altRealSQL(sqlArray, parameterNameArray, parameterValueArray){
        var c = new Array()
        if(sqlArray.length == 0)
            return ' '
        c.push('(')
        for(var a in parameterNameArray){
            c.push(parameterNameArray[a])
            c.push(',')
        }
        c.pop()
        c.push(')')
        c.push('VALUES')
        c.push('(')
        for(var b in parameterValueArray){
            c.push(sqlArray[b])
            c.push(',')
        }
        c.pop()
        c.push(')')
        return c.join(' ')
    }
}

class whereNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }

    altRealSQL(sqlArray, parameterNameArray){
        var c = ''
        // console.log(sqlArray)
        if(sqlArray.length == 0)
            return ' '
        else
            c += 'WHERE '
        c += sqlArray[0].replace(/(AND |OR )/i, '')
        for(var b = 1; b < sqlArray.length; ++b){
            c += ' ' + sqlArray[b]
        }
        return c
    }
}

class foreachNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }
}

class endNodeParser extends nodeParser{
    constructor(node){
        super(node)
    }
}


class Token{
    constructor(string, num){
        if(string == null)
            throw '单词不能为空'
        if(num < 0)
            throw '种别码不能是负数'
        this.string = string
        this.num = num
    }
    toString(){
        return '<'+ this.string +',' + this.num + '>'
    }
    getString(){
        return this.string
    }
    getNum(){
        return this.num
    }
}

class Lexer{
    constructor(){
        this.reserveWord = new Array('null', 'true', 'false') // 保留字表 0-2
        this.operatorOrDelimiter = new Array('!', '(', ')', '>', '<', '>=', '<=', '==', '!=', '&&', '||') // 界符运算符表 3 - 9
        this.singleOperatorOrDelimiter = new Array('!', '(', ')','>', '<') //单字符界位运算符表  3 - 7
        this.doubleOperatorOrDelimiter = new Array('>=', '<=','==', '!=', '&&', '||') //双字符界位运算符表 8 - 13
        this.firstOperatorOrDelimiter = new Array('!', '(', ')', '=', '&', '|', '<', '>') // 界符运算符首字符表
        this.IDentifierTb = new Array() // 标识符表   100
    }
    
    setProject(project){
        this.project = project // 要扫描的文本
        this.ip = -1 // 扫描指针
        this.tokenArray = new Array()
    }

    searchReserve(word){ // 查找保留字
        for(var a in this.reserveWord) {
            if(word == this.reserveWord[a])
                return parseInt(a)
        }
        return -1
    }

    isLetter(word){ // 判断字母
        if(word >= 'a' && word <= 'z' || word >= 'A' && word <= 'Z')
            return true
        return false
    }

    isDigit(word){ // 判断数字
        if(word >= '0' && word <= '9')
            return true
        return false
    }

    isSingleOperatorOrDelimiter(word){ // 判断单界位符运算符
        if(this.singleOperatorOrDelimiter.indexOf(word) == -1)
            return false
        return true
    }

    isDoubleOperatorOrDelimiter(word){ // 判断双界位符运算符
        if(this.doubleOperatorOrDelimiter.indexOf(word) == -1)
            return false
        return true
    }

    isFirstOperatorOrDelimiter(word){ // 判断界位符运算符的首字符
        if(this.firstOperatorOrDelimiter.indexOf(word) == -1)
            return false
        return true
    }

    
    filterResource(){ // 编译预处理 去除无关字符  换行和注释
       
    }

    scannerProject(){
        while(this.ip < this.project.length)
            this.scanner()
    }

    scanner(){
        var receiver = ''
        var ch = this.project[++this.ip] // 读入的字符

        while(ch == ' '){ // 过滤空格
            ch = this.project[++this.ip]
        }

        if(this.isLetter(ch)){ // 开头为字母
            receiver += ch // 收集
            ch = this.project[++this.ip] //下移
            while(this.isLetter(ch) || this.isDigit(ch) || ch == '_') { // 后跟字母或数字或下划线
                receiver += ch 
                ch = this.project[++this.ip]
            }
            var syn = this.searchReserve(receiver)
            if(syn == -1){  // 是标识符
                var token = new Token(receiver, 100)
                this.tokenArray.push()
                this.tokenArray.push(token)
                this.IDentifierTb.push(token)
                return 
            }
            this.tokenArray.push(new Token(receiver, syn)) // 关键字
            return 
        }
        else if(this.isDigit(ch)){ // 首字符为数字
            receiver += ch
            ch = this.project[++this.ip]
            while(this.isDigit(ch)){ // 后跟数字
                receiver += ch
                ch = this.project[++this.ip]
            }
            this.tokenArray.push(new Token(receiver, 99)) // 常数
            return  
        }
        else if(this.isFirstOperatorOrDelimiter(ch)){ //为界位符运算符首字符
            receiver += ch
            ch = this.project[++this.ip]
            var ch2 = this.project[this.ip - 1] + ch
            if(this.isDoubleOperatorOrDelimiter(ch2)) {// 为双界位符运算符
                receiver += ch
                this.tokenArray.push(new Token(receiver, this.reserveWord.length + this.singleOperatorOrDelimiter.length + this.doubleOperatorOrDelimiter.indexOf(ch2) + 1) )
                return 
            }
            else{ // 为单位界位运算符
                this.tokenArray.push(new Token(receiver, this.reserveWord.length + this.singleOperatorOrDelimiter.indexOf(ch) + 1) )
                return 
            }
        }
    }

    getTokenArray(){
        return this.tokenArray
    }

    IDentifierTbToString(){
        return this.IDentifierTb
    }
}

class SemanticSymbol{
    constructor(symbol, behavior){
        this.symbol = symbol
        this.behavior = behavior
    }

    toBehavior(){
        this.behavior()
    }
}

class SemanticBehavior{
    constructor(string, fun){
        this.string = string
        this.fun = fun
    }
    execute(variableHeap, stack, id){
        this.fun(variableHeap, stack, id)
    }
    
}

class stringObject{
    constructor(string){
        this.string = string
    }

    toString(){
        return this.string
    }
}

const analyzerLogger = {
    "logger":  winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {},
        transports: [
            new winston.transports.File({
                name: 'analyzer',
                filename: __dirname + '/log/analyzer.log',
                json: true,
                level: 'debug',
                maxsize: 1024 * 1024 * 10 // 10MB
            })
        ]
    }),
    "isToLog": true,
    "debug": function (mess){
        if(!this.isToLog)
            return
        this.logger.debug(mess)
    }
}
var analyzerJSON = {
    "stack": null,
    "variableStack": null,
    "log": null
}

class SyntacticAnalyzer{
    constructor(tokenArray){
        this.COUNT = 99
        this.ID = 100
        this.predictiveAnTb = new Map() // 预测表
        this.terminalSymbol = new Array('E', 'B', 'F', 'C', 'O') // 非终结符

        this.predictiveAnTb.set('E,null', new Array('E', '-', '>', 'F', 'O', 'F', new stringObject('{a1}'), 'B') ) 
        this.predictiveAnTb.set('E,ID', new Array('E', '-', '>', 'F', 'O', 'F', new stringObject('{a1}'), 'B') )
        this.predictiveAnTb.set('E,COUNT', new Array('E', '-', '>', 'F', 'O', 'F', new stringObject('{a1}'), 'B') )

        this.predictiveAnTb.set('B,&&', new Array('B', '-', '>', 'C', 'E', new stringObject('{a7}')))
        this.predictiveAnTb.set('B,||', new Array('B', '-', '>', 'C', 'E', new stringObject('{a7}')))
        this.predictiveAnTb.set('B,ε', new Array('B', '-', '>', 'ε') )

        this.predictiveAnTb.set('F,null', new Array('F','-','>','null', new stringObject('{a3}')))
        this.predictiveAnTb.set('F,ID', new Array('F', '-', '>', 'ID', new stringObject('{a4}')))
        this.predictiveAnTb.set('F,COUNT', new Array('F', '-', '>', 'COUNT', new stringObject('{a8}')))

        this.predictiveAnTb.set('O,==', new Array('O', '-', '>', '==', new stringObject('{a5}')))
        this.predictiveAnTb.set('O,!=', new Array('O', '-', '>', '!=', new stringObject('{a5}')))
        this.predictiveAnTb.set('O,>', new Array('O', '-', '>', '>', new stringObject('{a5}')))
        this.predictiveAnTb.set('O,<', new Array('O', '-', '>', '<', new stringObject('{a5}')))
        this.predictiveAnTb.set('O,>=', new Array('O', '-', '>', '>=', new stringObject('{a5}')))
        this.predictiveAnTb.set('O,<=', new Array('O', '-', '>', '<=', new stringObject('{a5}')))

        this.predictiveAnTb.set('C,&&', new Array('C', '-', '>', '&&', new stringObject('{a6}')))
        this.predictiveAnTb.set('C,||', new Array('C', '-', '>', '||', new stringObject('{a6}')))


        this.semanticSymbol = new Array() // 语义符号
        this.semanticSymbolSize = 8 
        this.semanticSymbolTb = new Map()
        this.semanticStack = new Array()
        
        for(var i = 1; i <= this.semanticSymbolSize; i++){
            this.semanticSymbol.push('{a' + i + '}')    
        }
        
        this.semanticSymbolTb.set('{a1}', new SemanticBehavior('{a1}', function(variableHeap, stack, id){ 
            var v
            if(stack[stack.length - 2] == '=='){
                v = stack[stack.length - 3] == stack[stack.length - 1]
            }
            else if(stack[stack.length - 2] == '!='){
                v = stack[stack.length - 3] != stack[stack.length - 1]
            }
            else if(stack[stack.length - 2] == '>'){
                v = stack[stack.length - 3] > stack[stack.length - 1]
            }
            else if(stack[stack.length - 2] == '>='){
                v = stack[stack.length - 3] >= stack[stack.length - 1]
            }
            else if(stack[stack.length - 2] == '<'){
                v = stack[stack.length - 3] < stack[stack.length - 1]
            }
            else if(stack[stack.length - 2] == '<='){
                v = stack[stack.length - 3] <= stack[stack.length - 1]
            }
            // console.log('xxxxxxxxxxxxxx                      ' + v)
            for(var i = 1; i <= 3; i++)
                stack.pop()
            stack.push(v)
        }))
        this.semanticSymbolTb.set('{a2}', new SemanticBehavior('{a2}', function(variableHeap, stack, id){
            // id {&&, ||}
            stack.push(id)
         }))
        this.semanticSymbolTb.set('{a3}', new SemanticBehavior('{a3}', function(variableHeap, stack, id){
            stack.push(null) 
           
        }))
        this.semanticSymbolTb.set('{a4}', new SemanticBehavior('{a4}', function(variableHeap, stack, id){
            stack.push(variableHeap[id]) 
        }))
        this.semanticSymbolTb.set('{a5}', new SemanticBehavior('{a5}', function(variableHeap, stack, id){
           stack.push(id)
        }))
        this.semanticSymbolTb.set('{a6}', new SemanticBehavior('{a6}', function(variableHeap, stack, id){
            stack.push(id)
        }))
        this.semanticSymbolTb.set('{a7}', new SemanticBehavior('{a7}', function(variableHeap, stack, id){
            var oIndex = 0
            for(;oIndex < stack.length; oIndex++){
                if(stack[oIndex] == '&&')
                    break
            }
            if(oIndex == stack.length)
                oIndex = 1
            var o = stack[oIndex]
            var L = oIndex - 1
            var R = oIndex + 1
            var v 
            if(o == '&&'){
                v = stack[L] && stack[R]
            }
            else if(o == '||'){
                v = stack[L] || stack[R]
            }
            // console.log('xxxxxxxxxxxx                                                ' + v +'   '+oIndex)
            if(oIndex != 0){
                stack.splice(L,1)
                stack.splice(L,1)
                stack.splice(L,1)
                stack.splice(L,0,v)
            }
            else{
                stack.shift()
                stack.shift()
                stack.shift()
                stack.unshift(v)
            }
           
        }))
        this.semanticSymbolTb.set('{a8}', new SemanticBehavior('{a8}', function(variableHeap, stack, id){
            stack.push(parseFloat(id))
        }))

    }

    setTokenArray(tokenArray){
        this.tokenArray = tokenArray
        this.tokenArray = tokenArray // token序列
        this.tokenArray.push(new Token('ε', 111))// ε =  Alt + 42693
        this.tokenArray.push('$')
        this.stack = new Array(new stringObject('$'),'E')
        this.outPut = new Array()
        this.ip = -1 // 扫描指针
        this.variableStack = new Array()
    }

    selectPATb(a, b){
        return this.predictiveAnTb.get(a+','+b)
    }

    selectSSTb(a){
        return this.semanticSymbolTb.get('{' + a + '}')
    }

    toSemantic(x, variableHeap, stack, id){
        // console.log(x)
        var a = this.semanticSymbolTb.get(x)
        if(a == undefined)
            throw '语义动作不存在:' + x
        //console.log(a)
        a.execute(variableHeap, stack, id)
    }

  
    toAltToken(ch){
        // console.log('ch:  '+ch)
        // console.log(this.ip)
        // console.log(this.tokenArray[this.ip])
        if(ch.getNum() == this.COUNT)
            return ch = new Token('COUNT', this.COUNT)
        else if(ch.getNum() == this.ID)
            return ch = new Token('ID', this.ID)
        return ch
    }

    scanner(variableHeap){
        var x = this.stack[this.stack.length - 1] // 栈顶符号
        var ch = this.tokenArray[++this.ip]
        var saveCh = null
        while(x != '$'){ // 栈非空
            ch = this.tokenArray[this.ip]
            analyzerJSON.staack = this.stack
            analyzerJSON.variableStack = this.variableStack
            if(this.semanticSymbol.indexOf(x.toString()) != -1){ // x在语义行为符号表中
              
               
                this.toSemantic(x.toString(), variableHeap, this.variableStack, saveCh.getString())
                this.stack.pop()
                
                x = this.stack[this.stack.length - 1]
               
                continue
            }
        
            saveCh = ch
            var chToken = this.toAltToken(ch)
           
            var selectPAValue = this.selectPATb(x, chToken.getString())
            var b = (x + ',' + chToken.getString())
            if(x == chToken.getString()){ // X等于ip所指的符号chToken,执行栈的弹出操作
                
                this.stack.pop()
                this.ip++ // 指针下移
            }
            else if(this.terminalSymbol.indexOf(x) == -1){ // x不在非终结符表中
               
                throw 'error, 语法错误: \'' + x + '\' 不在非终结符表中'
            }
            else if(selectPAValue == undefined){
                //console.log(this.predictiveAnTb)
                
                throw 'error, 语法错误: '  + b + ' 是一个报错条目'
            }
            else { // 输出产生式， 弹出栈顶符号
                // console.log(b +':  ' + selectPAValue)
                this.stack.pop()
                for(var a = selectPAValue.length - 1; a >= 0; a--){ // 把生成式倒序压入栈中
                    if(selectPAValue[a] == '>'){
                        if(selectPAValue[a - 1] == '>'){
                            this.stack.push('>')
                        }
                        break;
                    }
                    this.stack.push(selectPAValue[a])
                }

                // 打印生成式
                var log = ''
                for(var b in selectPAValue){
                    if(selectPAValue[b] != ',')
                        log += selectPAValue[b]
                }
                analyzerJSON.log = log
            }
            analyzerLogger.debug({"mess": analyzerJSON})
            x = this.stack[this.stack.length - 1]
        }
        // console.log('成功')
        //console.log(this.stack)
        //console.log(this.variableStack)
        return this.variableStack[0]
    }

    tbToString(){
        return this.predictiveAnTb
    }
    
    equalToken(string, token){
        // console.log(string, token.getString())
        if(string == token.getString())
            return true
        else if(string == 'COUNT' && token.getNum() == this.COUNT)
            return true
        else if(string == 'ID' && token.getNum() == this.ID)
            return true
        else
            return false
    }
}

var session
var mapperSQL

var first = true
if(first){
    var sqlSession = new SqlSessionFactoryBuilder()
    sqlSession.getResource();
    session = sqlSession.build();

    mapperSQL = new MapperSQLParser()
    mapperSQL.getResource()
    mapperSQL.build()
    first = false
} 

function query(sql, fun){
    session.query(sql, function(err, rows, fields){
        fun(err,rows,fields)
    })
}

function getRetSQL(id, parameter){
    if(id == null || id == undefined || parameter == null || parameter == undefined)
        throw 'id和parameter不能为null或undefined'
    return mapperSQL.getRetSQL(id, parameter)
}

exports.getSQL = getRetSQL
exports.query = query
exports.a = console.log('a')

var a = -1

if(a == 4){
    var b = mapperSQL.getRetSQL("updateUsers",{
        "Users_IsBan": 0,
        "Users_Name": "管理员4",
        "Users_Account": "x123456",
        "Users_PassWord": 123456,
        "Users_ID": 6
    })

    console.log(b)
    query(b, function(err, rows, fields){
        console.log('err:')
        console.log(err)
        console.log('rows')
        console.log(rows)
    })
}

if(a == 1){
    // console.log(mapperSQL.mapperSQLToSting())
    var b = mapperSQL.getRetSQL("selectUsers",{
        "Users_IsBan": 0,
        "Users_Name": "管理员1",
        "Users_Account": "root",
        "Users_PassWord": 1234
    })

    console.log(b)
    query(b, function(err, rows, fields){
        console.log('err:')
        console.log(err)
        console.log('rows')
        console.log(rows)
    })

    var c = mapperSQL.getRetSQL('insertUsers',{
        "Users_Name": '游客5',
        "Users_Account": 'x123456',
        "Users_PassWord": '123456'
    })
    console.log(c)
    query(c, function(err, rows, fields){
        console.log('err:')
        console.log(err)
        console.log('rows')
        console.log(rows)
    })
}

if(a == 3){
    var b = mapperSQL.getRetSQL("selectUsers",{
        "Users_IsBan": 0,
        "Users_Name": "管理员1",
        "Users_Account": "root",
        "Users_PassWord": 1234
    })

    console.log(b)
    
    b = mapperSQL.getRetSQL("selectUsers",{
        
    })
    // var b = mapperSQL.getRetSQL("selectUsers",{})
    console.log(b)
}


if(a == 2){
    var project = 'user_Name == null && user_ID != 12 || users_Name != root'
    var project2 = 'users_password != null && users_id >= 3 '
    var project3 = 'users_IsBan == 1 || users_Name != null && 2 > 4 || 3 > 5 && 6 < 7'
    var heap = {
        'user_Name': 'lemon',
        'user_ID': '12',
        'users_Name': 'lemon',
        'root': 'root2'
    }
    
    var heap2 = {
        'users_password': '123',
        'users_id': 4
    }
    
    var heap3 = {
        "users_IsBan": 1,
        "users_Name": null
    }
    
    var lexer = new Lexer()
    lexer.setProject(project)
    lexer.scannerProject()
    
    console.log('----------------------------------------------------------------------')
    var syntacticAnalyzer = new SyntacticAnalyzer()
    syntacticAnalyzer.setTokenArray(lexer.getTokenArray())
    syntacticAnalyzer.scanner(heap)
    console.log('lemon'== null && 12 != 12 || 'lemon' != 'root2')
    
    console.log('----------------------------------------------------------------------')
    lexer.setProject(project2)
    lexer.scannerProject()
    syntacticAnalyzer.setTokenArray(lexer.getTokenArray())
    syntacticAnalyzer.scanner(heap2)
    console.log('123' != null && 4 >= 3 )
    
    console.log('----------------------------------------------------------------------')
    lexer.setProject(project3)
    lexer.scannerProject()
    syntacticAnalyzer.setTokenArray(lexer.getTokenArray())
    console.log(lexer.getTokenArray())
    syntacticAnalyzer.scanner(heap3)
    console.log(1 == 1 || null != null && 2 > 4 || 3 > 5 && 6 < 7) // true || false && false
    console.log(syntacticAnalyzer.variableStack)
}