// Initialize Firebase
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyD1Cy_wmARTN1GI_uHg6EHRYPL_7fom8hk',
  authDomain: 'workout-ddb81.firebaseapp.com',
  databaseURL: 'https://workout-ddb81.firebaseio.com',
  projectId: 'workout-ddb81',
  storageBucket: 'workout-ddb81.appspot.com',
  messagingSenderId: '718114166773',
}
var fb = firebase.initializeApp(config)
export default fb
