import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhXikJbMNO2HCGrdYbs0vKLR_KP8BS67M',
  authDomain: 'ensemble-4ba6f.firebaseapp.com',
  projectId: 'ensemble-4ba6f',
  storageBucket: 'ensemble-4ba6f.appspot.com',
  messagingSenderId: '264379873721',
  appId: '1:264379873721:web:1d88ec51964e5e23869e68',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const postCollection = collection(db, 'post');

const fetchData = async (target) => {
  try {
    const posts = await getDocs(postCollection);
    posts.forEach((post) => {
      const { title, contents } = post.data();
      const $li = document.createElement('li');
      $li.className = 'post-container';
      $li.innerHTML = `
        <a>
          <div class="post-title">${title}</div>
          <div class="post-body">${contents}</div>
        </a>  
      `;
      target.appendChild($li);
    });
  } catch (error) {
    console.log(error);
  }
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
