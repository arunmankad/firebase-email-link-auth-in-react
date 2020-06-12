export const REGISTER_LINK_SUCCESS = 'register_link_success'
export const generateMagicLinkAction = (credentials) =>{
    return (dispath, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        // firebase.auth().signInWithEmailAndPassword(
        //     credentials.email, credentials.password
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: process.env.REACT_APP_EMAIL_VERIFICATION_LANDING_URL,
            // This must be true.
            handleCodeInApp: true
          };
        //   alert('cool'+ credentials.email);
        firebase.auth().sendSignInLinkToEmail(
            
            credentials.email, actionCodeSettings
        ).then(
            ()=>{
                dispath({type: REGISTER_LINK_SUCCESS})
                localStorage.setItem('email',credentials.email)
            }
        ).catch(
            (err)=>{
                dispath({
                    type: 'LOGIN_ERROR', err
                })
            }
        )
    }
}