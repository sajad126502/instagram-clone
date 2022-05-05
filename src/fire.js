import { initializeApp } from 'firebase/app';
import { getFirestore, collection} from 'firebase/firestore';
import { getStorage ,ref,uploadBytes} from "firebase/storage";
import {getAuth , createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// TODO: Replace the following with your app's Firebase project configuration
 const firebaseConfig = {
  apiKey: "AIzaSyBt3CvX9sMSK3ltlnunZcLXDC9dyNUG3kU",
  authDomain: "intagramclone-47ecb.firebaseapp.com",
  projectId: "intagramclone-47ecb",
  storageBucket: "intagramclone-47ecb.appspot.com",
  messagingSenderId: "259215360057",
  appId: "1:259215360057:web:c2cf928fe522de4ca20de8",
  measurementId: "G-E4QJYQ2HZ1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coll = collection(db, 'posts')
const auth=getAuth()
const storage=getStorage(app)

// Get a list of cities from your database

export {db,coll,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,storage,ref,uploadBytes}