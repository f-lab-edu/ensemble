import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const postCollection = collection(db, 'post');

const fetchData = async () => {
  const posts = await getDocs(postCollection);
  return posts;
};

const setData = async (uid) => {
  await addDoc(postCollection, {
    title: '스터디 모집합니다.',
    contents: '모각코',
    writer: uid,
    hits: 0,
    tags: ['서울', 'javascript'],
    rgt_dt: Timestamp.fromDate(new Date(2023, 1, 28)),
    deadline: Timestamp.fromDate(new Date(2023, 2, 10)),
  });
};

const updateData = async (id) => {
  const data = doc(db, 'post', id);
  await updateDoc(data, {
    title: '안녕하세요',
  });
};

const deleteData = async (id) => {
  await deleteDoc(doc(db, 'post', id));
};

const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
};

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user);
    })
    .catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
};

export {
  fetchData,
  setData,
  updateData,
  deleteData,
  createUser,
  signIn,
};
