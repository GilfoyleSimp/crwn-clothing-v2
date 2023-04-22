import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { signInWithRedirect } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCwJvc2DPO_ThiwRgqHqpHuFtIAnBJx7Bw",
    authDomain: "crwn-clothing-db-9bf30.firebaseapp.com",
    projectId: "crwn-clothing-db-9bf30",
    storageBucket: "crwn-clothing-db-9bf30.appspot.com",
    messagingSenderId: "449494908190",
    appId: "1:449494908190:web:4435e93cc32127bb9d9d0f"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  // export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {  }
    ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName, email, createdAt,...additionalInformation
        });

      }catch (error) {
        console.log('error creating the user' , error.message);
      }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };
