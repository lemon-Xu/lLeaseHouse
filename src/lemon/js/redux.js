import { createStore } from 'redux'

const defaultState = 0;
const reducer = (state = defaultState, action) => {
    switch (action.type) {
    case 'ADD':
        return state + action.payload;
    default: 
        return state;
    }
};

const store = createStore(reducer)
const state = store.getState()
const action = {
    type: 'ADD_TODO',
    payload: 'Learn Redux'
}
store.dispatch({
    type: 'ADD_TODO',
    payload: 'Learn Redux'
});



const state = reducer(1, {
type: 'ADD',
payload: 2
});