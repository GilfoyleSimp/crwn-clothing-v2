import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName, email, createdAt,
        });

      }catch (error) {
        console.log('error creating the user' , error.message);
      }
    }
  }