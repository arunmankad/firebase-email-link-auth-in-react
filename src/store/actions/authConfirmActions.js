export const SIGN_IN_WITH_EMAIL_ERROR = 'sign_in_with_email_error';
export const verifySignIn = (obj)=>{
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // let email = JSON.parse(localStorage.getItem('email') || '{}');
        console.log('url.',obj.href)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(()=>{
            firebase.auth().signInWithEmailLink(
                obj.email, obj.href
            ).then((result)=>{
                    // localStorage.removeItem('email')
                    console.log('RESULT', result)
                    
                }
            ).catch((error)=>{
                dispatch(signInwithEmailError(error))
                console.log("ERROR****************", error )
            })
        })
        
    }
}

export const signInwithEmailError = (error)=>{
    return{
        type: SIGN_IN_WITH_EMAIL_ERROR,
        payload: error
    }
}