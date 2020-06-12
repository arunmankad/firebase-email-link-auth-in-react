import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter, Link, Redirect} from 'react-router-dom'
import {Spinner} from 'react-bootstrap';
import {verifySignIn} from '../store/actions/authConfirmActions';
import {Alert} from 'react-bootstrap';
import firebase from '../config/fbConfigs';

class ConfirmEmail extends Component{
     componentDidMount(){
        const {auth} = this.props.auth
        let myObj = {}
        let email = localStorage.getItem('email') || '';
        myObj.href = window.location.href;
        myObj.email = email
        if(firebase.auth().isSignInWithEmailLink(window.location.href)){
            if(!email){
                email =   window.prompt('Please eneter your email ') 
            }
            this.props.verifySignIn(myObj)
        }else {
            alert('Error')
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if(user){
              console.log('Email =>', user.email)
              console.log('Not logged in ');
              this.props.history.push("home");
            }else{
              
            }
        });
        
        //  firebase.auth().signInWithEmailLink(
        //     'arun.muralidharan@ust-global.com', myObj.href
        // ).then((result)=>{
        //         console.log('RESULT', result)
        //     }
        //  )
        console.log('AUTH',this.props.auth);
       
    }
    render() {
        const {errorMessage} = this.props
        return(
            <div>
                <p>{window.location.href}</p>
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
                <Alert  variant="danger">
                  {errorMessage}
                </Alert> 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      errorMessage: state.auth.errorMessage
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        verifySignIn: (creds) => dispatch(verifySignIn(creds))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmEmail));