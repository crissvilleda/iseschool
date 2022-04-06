import { useContext } from "react";
import LoadingContext from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../firebase";

export default function useCreate(
  _collection = undefined,
  redirect = undefined
) {
  const navigate = useNavigate();
  const{setLoading}= useContext(LoadingContext)

  const saveData = async (docData) => {
    setLoading(true)
    await addDoc(collection(db, _collection), docData);
    if (redirect) navigate(redirect);
    setLoading(false);
  };
  return { saveData };
}
