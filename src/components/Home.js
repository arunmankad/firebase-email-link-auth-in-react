import React, { Component } from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import firebase from '../config/fbConfigs';

 class Home extends Component{
    componentDidMount(){
        console.log('')
    }
    render() {
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to='/generatemagiclink' /> 
        {console.log('cool')}
        {console.log('cool',firebase.auth().currentUser || '')}
        return (
            <div className="content_section">
                <p>Home</p>
            </div>
        )
    }
 }
 const mapStateToPorps = state => {
    return {
      
      auth: state.firebase.auth
    }
  } 
 export default connect(mapStateToPorps, null)(Home);