import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCgm70n1PKwcJ6q5dYW2w7uqh6sFPLLBXk",
    authDomain: "dzshop-db.firebaseapp.com",
    projectId: "dzshop-db",
    storageBucket: "dzshop-db.appspot.com",
    messagingSenderId: "1066166901991",
    appId: "1:1066166901991:web:7faf03b66785f3cb3e5642",
    measurementId: "G-LT4HSQY08Z"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })


      }catch(error){
        console.log('error', error.message);

      }

    }
    return userRef;
  };

firebase.initializeApp(config);

export const auth= firebase.auth();
export const firestore= firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle= () => auth.signInWithPopup(provider);
export default firebase;


