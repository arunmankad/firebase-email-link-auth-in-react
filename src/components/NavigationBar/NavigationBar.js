import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux'
import firebase from '../../config/fbConfigs';

const displayEmail = (hello)=>{
return (<Nav.Link>{hello}</Nav.Link>)
}

const NavigationBar = (props)=>{
    const { auth, authError, authSuccess } = props;
    function handleSignOut(){
        let result = window.confirm('Are you sure?')
        if(result){
            firebase.auth().signOut();
        }
    }
    return(
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Magic Link Test App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#features">Menu1</Nav.Link>
    <Nav.Link href="#pricing">Menu2 </Nav.Link>
               
                </Nav>
                <Nav>
                <Nav.Link >Menu 3</Nav.Link>
                {props.currentAuthStatus?(
                    displayEmail(props.email)
                ): null}
                {props.currentAuthStatus?(
                    <Nav.Link onClick={handleSignOut}>
                        SignOut
                    </Nav.Link>
                ): 
                    <Nav.Link ><NavLink to="/generatemagiclink">SignIn</NavLink></Nav.Link>
                }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return{
        authError : state.auth.authError,
        authSuccess: state.auth.authSuccess,
        auth: state.firebase.auth
    }
  }

export default connect(mapStateToProps)(NavigationBar);