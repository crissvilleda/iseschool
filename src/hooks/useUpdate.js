import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

export default function useUpdate(
  _collection = undefined,
  redirect = undefined
) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;

  const updateData = async (docData) => {
    const docRef = doc(db, _collection, id);
    await updateDoc(docRef, docData);
    if (redirect) navigate(redirect);
  };

  useEffect(() => {
    if (id) {
      const docRef = doc(db, _collection, id);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) setData(docSnap.data());
      });
    }
  }, []);

  return { updateData, data, isUpdating };
}
