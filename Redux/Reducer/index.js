import {combineReducers} from 'redux'

import cartReducer from './Reducer'

let Reducer = combineReducers({
    cartReducer: cartReducer,
});

let rootReducer = (state,action) =>{
    return Reducer(state,action);
}

export default rootReducer;