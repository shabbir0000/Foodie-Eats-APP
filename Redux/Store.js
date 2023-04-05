import {createStore} from 'redux'

import rootReducer from './Reducer/index'

export default function configurestore (initialState){
   const store = createStore(rootReducer,initialState);
   return store;
}

