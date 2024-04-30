import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
	apiKey: 'AIzaSyAo0SpEXT-TSDvmWYd4-rJKgu5Num9UBXg',
	authDomain: 'my-telegram-app-1.firebaseapp.com',
	projectId: 'my-telegram-app-1',
	storageBucket: 'my-telegram-app-1.appspot.com',
	messagingSenderId: '901717268583',
	appId: '1:901717268583:web:14676d0c2c55c645159cc2',
})

export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

