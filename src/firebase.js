// Initialize Firebase
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyA5uCAMt_pikr9Q1rxNRUGCKdQegfV2vYo',
  authDomain: 'sjf-donation-tracking.firebaseapp.com',
  databaseURL: 'https://sjf-donation-tracking.firebaseio.com',
  projectId: 'sjf-donation-tracking',
  storageBucket: 'sjf-donation-tracking.appspot.com',
  messagingSenderId: '795894342226',
}

// Initializes firebase app
var fb = firebase.initializeApp(config)
export default fb
