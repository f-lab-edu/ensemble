import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
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
  const posts = await getDocs(query(postCollection, orderBy('contentDate', 'desc')));
  return posts;
};

const getData = async (postId) => {
  const post = await getDoc(doc(db, 'post', postId));
  return post;
};

const setData = async (title, contents, deadline, recruitment, writer, uid) => {
  await addDoc(postCollection, {
    title,
    contents,
    writer,
    uid,
    hits: 0,
    applicant: 0,
    recruitment: parseInt(recruitment, 10),
    applicants: [],
    tags: ['서울', 'javascript'],
    contentDate: Timestamp.fromDate(new Date()),
    deadline: Timestamp.fromDate(new Date(deadline)),
  });
};

const updateData = async (postId, title, contents, deadline, recruitment) => {
  const data = doc(db, 'post', postId);
  const updatePromise = await updateDoc(data, {
    title,
    contents,
    recruitment: parseInt(recruitment, 10),
    deadline: Timestamp.fromDate(new Date(deadline)),
  });
  return updatePromise;
};

const deleteData = async (postId) => {
  const deletePromise = await deleteDoc(doc(db, 'post', postId));
  return deletePromise;
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

const applyStudy = async (postId, applicants, email) => {
  const data = doc(db, 'post', postId);
  const applyPromise = await updateDoc(data, {
    applicants: [...applicants, { email, status: 'pending' }],
  });
  return applyPromise;
};

const cancelSutdy = async (postId, applicants, email) => {
  const data = doc(db, 'post', postId);
  const cancelPromise = await updateDoc(data, {
    applicants: applicants.filter((applicant) => applicant.email !== email),
  });
  return cancelPromise;
};

const acceptApplicant = async (postId, email) => {
  const data = doc(db, 'post', postId);
  const { applicant, applicants } = (await getDoc(data)).data();
  const modifiedApplicants = applicants.map((application) => {
    if (application.email === email) {
      return Object.assign(application, { status: 'accept' });
    }
    return application;
  });
  const acceptPromise = await updateDoc(data, {
    applicant: applicant + 1,
    applicants: modifiedApplicants,
  });

  return acceptPromise;
};

const cancelApplicant = async (postId, email) => {
  const data = doc(db, 'post', postId);
  const { applicant, applicants } = (await getDoc(data)).data();
  const modifiedApplicants = applicants.map((application) => {
    if (application.email === email) {
      return Object.assign(application, { status: 'pending' });
    }
    return application;
  });
  const cancelPromise = await updateDoc(data, {
    applicant: applicant - 1,
    applicants: modifiedApplicants,
  });

  return cancelPromise;
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
  applyStudy,
  cancelSutdy,
  acceptApplicant,
  cancelApplicant,
};
