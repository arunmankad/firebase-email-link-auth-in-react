import {produce} from 'immer';
// import * as actionTypes from '../actions/actions';
const initailState = {
    cool: 1
}

const secondReducer = (state=initailState, actionTypes)=>{
    return produce(state, draft=>{
        return draft;
    })
}

export default secondReducer;