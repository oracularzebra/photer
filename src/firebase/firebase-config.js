import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref as dbRef, set } from "firebase/database"
import { getStorage, uploadBytes, ref } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage=getStorage();

export const auth=getAuth(app);
export const db=getDatabase(app);

// IMAGE UPLOAD
export function uploadImage(imageBlob, time){
  const imageRef=ref(storage, `${auth.currentUser.uid}/${time}/${imageBlob.name}`);
  uploadBytes(imageRef, imageBlob)
  .then(()=>{
    //TODO: Give message that image uploaded successfully
    console.log('image uploaded')
  })
  .catch(()=>{
    console.error('Image cannot be uploaded');
  })
  //Adding entry in file
  set(dbRef(db,`users/${auth.currentUser.uid}/${time}/${imageBlob.name.replace(" ", "%").replace(".",";(")}`), {
    likes:0
    }).then(()=>{
    console.log("Successfully added file entry");
    })
}
// ON USER STATE CHANGE
export const checkAuth=onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    if(window.location.pathname!='/') window.location.pathname='/';
  }
});