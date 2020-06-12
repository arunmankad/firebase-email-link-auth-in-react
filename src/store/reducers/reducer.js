// import {produce} from 'immer';
// import * as actionTypes from '../actions';

// const initailState = {
//     loadingData: true,
//     data: {}
// }


import secondReducer from './secondReducer';
import authReducer from './authReducer';
import {firebaseReducer} from 'react-redux-firebase';

import {combineReducers} from 'redux';

const reducer = combineReducers({
    second: secondReducer,
    auth: authReducer,
    firebase: firebaseReducer
})

export default reducer;