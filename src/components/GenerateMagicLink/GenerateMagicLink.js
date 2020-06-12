import React, { Component } from 'react'
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {generateMagicLinkAction} from '../../store/actions/authActions';
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {Button, Form, Container, Alert} from 'react-bootstrap';
import firebase from '../../config/fbConfigs';
import './GenerateMagicLink.css';
// import  Form from 'react-bootstrap/Form';
const alert1 = <Alert  variant="primary">
                  Magic link generated and send to your email, please check 
                  and give it a click if you like.
                </Alert>
const alert2 = <Alert  variant="danger">
                  Couldn't send the magic link, we are sorry!.
                </Alert>    
class GenerateMagicLink extends Component  {
    state = {
        email: '',
        password: ''
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
              console.log('Email =>', user.email)
              console.log('Not logged in ');
              // this.props.history.push("home");
            }else{
              
            }
          });
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) => {
        e.preventDefault();
        // alert(this.state.email)
        this.props.generateMagicLinkAction(this.state)
      }
    render () {
      const { auth, authError } = this.props;
      if (auth.uid) return <Redirect to='/home' /> 
        return (<div className="MagicLink-Container">
        <Container className="align-middle">
          { this.props.authSuccess ? alert1 : null }
          { authError ? alert2 : null }   
            <Form onSubmit={this.handleSubmit} >
                <fieldset disabled={this.props.authSuccess}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    You will receive a magic link in your email, clicking on which will log you into the app.
                </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                </fieldset>
            </Form>
        </Container>
    </div>)
    }
    
   
}
const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      authSuccess: state.auth.authSuccess,
      auth: state.firebase.auth
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        generateMagicLinkAction: (creds) => dispatch(generateMagicLinkAction(creds))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GenerateMagicLink))