import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// import {createStore} from 'redux'

import {Home} from './a';
import {Detail} from './b';
import {Login} from './login'
import {Information} from './yeyu'

// const store = createStore(fn)
// const state = store.getState()
// const action = {
//     type: 'ADD_TODO',
//     payload: 'Learn Redux'
// }
// const ADD_TODO = '添加 TODO'
// function addTodo(text) {
//     return {
//         type: ADD_TODO,
//         text
//     }
// }
// const action = addTodo('Learn Redux')
// store.dispatch(action)
// const redducer = function(state, action){
//     return new_state
// }

class BasicRoute extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/detail" component={Detail}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/usersInformation" component={Information}/>
                    {console.log('router')}
                </Switch>
            </HashRouter>
        )
    }
    
}

export {BasicRoute};