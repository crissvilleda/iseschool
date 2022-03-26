import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function useDelete(_collection = undefined) {
  const deleteData = async (id) => {
    return await deleteDoc(doc(db, _collection, id));
  };
  return { deleteData };
}
