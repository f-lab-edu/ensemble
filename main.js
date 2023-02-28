import {
  getFirestore, collection, getDocs, setDoc, doc, Timestamp,
} from 'firebase/firestore';

import firebase from './api/firebase';

const db = getFirestore(firebase);
const post = collection(db, 'post');
const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(post);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
};
fetchData();

const setData = async () => {
  await setDoc(doc(post, '3'), {
    title: '스터디 모집',
    contents: '서울에서 스터디하실분 구해요',
    writer: 'Lee',
    hits: 0,
    tags: ['서울', 'JAVA'],
    rgt_dt: Timestamp.fromDate(new Date(2023, 1, 28)),
    deadline: Timestamp.fromDate(new Date(2023, 2, 10)),
  });
};

// setData();
