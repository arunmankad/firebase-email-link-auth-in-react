import {produce} from 'immer';
import * as authActionTypes from '../actions/authActions';
import * as authConfirmActionTypes from '../actions/authConfirmActions';
const initialState ={
    authError: null,
    errorMessage: ''
}

const authReducer = (state=initialState, action)=>{
   return produce(state,draft=>{
        switch(action.type){
        case 'LOGIN_ERROR':
            draft.authError = 'Login failed'
            break;    
        case "LOGIN_SUCCESS":
                draft.authError= null
                break;
        case authActionTypes.REGISTER_LINK_SUCCESS:
                draft.authSuccess = true
                break;
        case authConfirmActionTypes.SIGN_IN_WITH_EMAIL_ERROR:
                console.log("DADADADA",action.payload)
                draft.errorMessage = action.payload.message
                break;
        default:
            return draft;
        }
    });
}

export default authReducer;