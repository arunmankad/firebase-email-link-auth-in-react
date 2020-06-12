
import React, { Component } from 'react';

import { withRouter, matchPath, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {Toast} from 'react-bootstrap';

// import * as actionTypes from './store/actions/actions';

import logo from "./logo.svg";
import "./App.css";


import ConfirmEmail from './components/ConfirmEmail';
import Home from './components/Home';
import firebase from './config/fbConfigs';

import GenerateMagicLink from './components/GenerateMagicLink/GenerateMagicLink';

import style from './Style'


import NavigationBar from './components/NavigationBar/NavigationBar';

class App extends Component {
  
  // constructor(props) {
  //   super(props);
  // }
  state = {
    currentAuthStatus: false,
    email: ''
  }
  componentDidMount(){
    
    
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log('Email =>', user.email)
        this.setState({
          currentAuthStatus: true,
          email: user.email
        })
      }else{
        console.log('Not logged in ');
        // this.props.history.push("generatemagiclink");
        this.setState({
          currentAuthStatus: false,
          email: ''
        })
      }
    });
  }
  render(){
    
    return (
      <React.Fragment>
         <NavigationBar cool={'hello'} email={this.state.email} currentAuthStatus={this.state.currentAuthStatus}/>
      <div className="App-Container">
        {/* <Header/> */}
       
        <Switch>
          <Route path="/generatemagiclink" component={()=><GenerateMagicLink />}/>
          <Route path="/home" component={()=><Home/>}/>
          <Route path="/email" component={()=>  <ConfirmEmail/>}  />
          <Route path="/finishes/:languageCode/:countryCode/:productId" component={()=>  <div>Finishes</div>}  />
          <Redirect exact from='/' to='/home' />
      </Switch>
      </div>
      
      </React.Fragment>
    )
  }
}
const mapStateToPorps = state => {
  return {
    
    auth: state.firebase.auth
  }
} 
// const mapDispatchToProps = dispatch => {
//   return {
//     getData: () => dispatch(actionTypes.getData()),
//     loadingData: ()=> dispatch(actionTypes.loadingData())
//   }
// }


// export default App;

export default connect(mapStateToPorps, null)((withRouter(App)));
