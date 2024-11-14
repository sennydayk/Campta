import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱이 이미 초기화되었는지 확인
console.log("Initializing Firebase..."); // 디버깅
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
console.log("Firebase initialized with app:", app.name);

// 인증 상태 지속성 설정
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("인증 상태 지속성이 설정되었습니다.");
  })
  .catch((error) => {
    console.error("인증 상태 지속성 설정 중 오류 발생:", error);
  });

// 디버깅을 위한 auth 상태 변경 리스너
auth.onAuthStateChanged((user) => {
  console.log("Auth state changed:", user ? user.uid : "No user");
  console.log(user);
  if (user) {
    console.log("User is logged in:", user.uid);
    user.getIdToken().then((token) => {
      console.log("Token on sign-in:", token);
    });
  } else {
    console.log("User is logged out.");
  }
});

export { auth, db, storage };
