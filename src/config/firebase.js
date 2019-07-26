import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDFDjBw3VYVcOc3Yk2I3you4HXp2efkjiQ',
  authDomain: 'escape-room-8ca57.firebaseapp.com',
  databaseURL: 'https://escape-room-8ca57.firebaseio.com',
  projectId: 'escape-room-8ca57',
  storageBucket: '',
  messagingSenderId: '772937188842',
  appId: '1:772937188842:web:3e0b8fad2da07db7'
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
