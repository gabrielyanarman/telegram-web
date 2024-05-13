import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  limit,
  query,
  getDocs,
  startAfter,
  orderBy,
} from 'firebase/firestore';
import { firestore } from '../firebase';

export async function useGetUser(uid) {
  const snapshot = await getDoc(doc(firestore, `users/${uid}`));
  const user = snapshot.data();
  return user;
}

export async function useGetUsers(orderByValue, startAfterValue, limitValue) {
  let usersArr = [];
  if (!startAfterValue) {
    try {
      const q = query(
        collection(firestore, 'users'),
        orderBy(orderByValue),
        limit(limitValue),
      );
      const usersSnapshot = await getDocs(q);
      usersSnapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const q = query(
        collection(firestore, 'users'),
        orderBy(orderByValue),
        startAfter(startAfterValue),
        limit(limitValue),
      );
      const usersSnapshot = await getDocs(q);
      usersSnapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }
  return usersArr;
}

export async function useUsersTotalCount() {
  const countSnapshot = await getCountFromServer(
    collection(firestore, 'users'),
  );
  const totalCount = countSnapshot.data().count;
  return totalCount;
}
