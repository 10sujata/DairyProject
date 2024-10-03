
import fb from 'firebase';
import '@firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyCg2Wp6ImYPXhEausKIcytJXlBwoXbkVuI",
    authDomain: "https://test-bsteltromat.firebaseio.com/",
    databaseURL: "https://test-bsteltromat.firebaseio.com/",
    projectId: "test-bsteltromat",
    storageBucket: "test-bsteltromat.appspot.com",
    messagingSenderId: "71198470295ddceb83cbe3"
};

const firebase = fb.initializeApp(firebaseConfig);

// console.log("data",firebase);


export default firebase;