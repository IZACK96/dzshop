import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCgm70n1PKwcJ6q5dYW2w7uqh6sFPLLBXk",
  authDomain: "dzshop-db.firebaseapp.com",
  databaseURL: "https://dzshop-db-default-rtdb.firebaseio.com",
  projectId: "dzshop-db",
  storageBucket: "dzshop-db.appspot.com",
  messagingSenderId: "1066166901991",
  appId: "1:1066166901991:web:7faf03b66785f3cb3e5642",
  measurementId: "G-LT4HSQY08Z"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};
export const convertCollectionsSnapshotToMap = (collections) =>{
  const transformedCollection = collections.docs.map(doc =>{
    const {title, items} = doc.data();
    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, items
    };
  });
  return transformedCollection.reduce((accumulator, collection) =>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};

export const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
