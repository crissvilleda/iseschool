import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../firebase";

export default function useCreate(
  _collection = undefined,
  redirect = undefined
) {
  const navigate = useNavigate();

  const saveData = async (docData) => {
    await addDoc(collection(db, _collection), docData);
    if (redirect) navigate(redirect);
  };
  return { saveData };
}
