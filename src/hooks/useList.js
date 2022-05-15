import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

export default function useList(
  _collection = undefined,
  _orderBy = undefined,
  _limit = 25
) {
  const getData = async (_lastVisible = undefined) => {
    let querySet = query(
      collection(db, _collection),
      orderBy(_orderBy),
      limit(_limit)
    );

    const querySnapshot = await getDocs(querySet);
    const result = [];
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    return result;
  };

  return { getData };


}
 