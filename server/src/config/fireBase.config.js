import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// };
const firebaseConfig = {
    apiKey:"AIzaSyBy_L3_-J7xqipkKOSrFnLfYc-SkbnkI4Q",
    authDomain:"terror-time-machine.firebaseapp.com",
    projectId:"terror-time-machine",
    storageBucket:"terror-time-machine.appspot.com",
    messagingSenderId:"31916567759",
    appId:"1:31916567759:web:f84370f296cbf3e5671bba",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)