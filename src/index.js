import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



import {Provider, useSelector} from 'react-redux';
import {store} from './store/store';
import { BrowserRouter as Router } from 'react-router-dom'

import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import fbConfigs from './config/fbConfigs';
import firebase from 'firebase/app';
const rrfProps = {
  firebase,
  config: fbConfigs,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}

const app = (
  <Provider store={store}>
     <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <AuthIsLoaded>
          {/* <React.StrictMode> */}
            <App />
          {/* </React.StrictMode> */}
        </AuthIsLoaded>
      </Router>
      </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
