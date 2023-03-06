import { openDB } from 'idb';

const selectUser = async () => {
  const database = await openDB('firebaseLocalStorageDb', 1);
  const userData = await database.get('firebaseLocalStorage', `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`);

  return userData;
};

export default selectUser;
