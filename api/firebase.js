import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  getFirestore, collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, Timestamp,
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

const getData = async (id) => {
  if (!id) throw new Error('유효하지 않은 URL입니다.');

  const post = await getDoc(doc(db, 'post', id));
  return post;
};
const setData = async (title, contents, date, writer, uid) => {
  await addDoc(postCollection, {
    title,
    contents,
    writer,
    uid,
    hits: 0,
    tags: ['서울', 'javascript'],
    contentDate: Timestamp.fromDate(new Date()),
    deadline: Timestamp.fromDate(new Date(date)),
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

const createUser = async (email, password) => {
  const createUserPromise = await createUserWithEmailAndPassword(auth, email, password);
  return createUserPromise;
};

const signIn = async (email, password) => {
  const signInPromise = await signInWithEmailAndPassword(auth, email, password);
  return signInPromise;
};

const logout = async () => {
  const logOutPromise = await signOut(auth);
  return logOutPromise;
};

export {
  fetchData,
  getData,
  setData,
  updateData,
  deleteData,
  createUser,
  signIn,
  logout,
};
