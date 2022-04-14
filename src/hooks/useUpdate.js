import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LoadingContext from "../context/LoadingContext";

import { db } from "../firebase";

export default function useUpdate(
  _collection = undefined,
  redirect = undefined
) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;
  const { setLoading } = useContext(LoadingContext);

  const updateData = async (docData) => {
    setLoading(true);
    const docRef = doc(db, _collection, id);
    await updateDoc(docRef, docData);
    if (redirect) navigate(redirect);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      const docRef = doc(db, _collection, id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) setData(docSnap.data());
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { updateData, data, isUpdating, id };
}
