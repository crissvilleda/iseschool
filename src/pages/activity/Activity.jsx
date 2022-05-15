import { useContext, useEffect, useState } from "react";
import ActivityForm from "./ActivityForm";
import ActivityIcon from "../../assets/img/activities.png";
import useDateUtils from "../../hooks/useDateUtils";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import UserContext from "../../context/UserContext";
import { SwalError } from "../../components/SwalAlerts";
import { notification } from "antd";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, listAll, deleteObject } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { get } from "../../helpers";
import { v4 as uuidv4 } from "uuid";

const uploadImages = async (body) => {
  let questions = get(body, "questions", []);
  const _questions = [];

  for (const item of questions) {
    const file = get(item, "questionFile");
    if (file instanceof File) {
      const storageRef = ref(
        storage,
        `questions/${body.storageId}/${item.id}-${file.name}`
      );
      const snapshot = await uploadBytes(storageRef, file);
      _questions.push({ ...item, questionFile: snapshot.ref.fullPath });
    } else {
      _questions.push(item);
    }
  }
  return { ...body, questions: _questions };
};

export default function Activity() {
  const { dateAsTimestamp } = useDateUtils();
  const { loading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const docRef = doc(db, "activities", id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) setData(docSnap.data());
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let body = { ...data };
      body.createdAt = new Date();
      body.createdBy = user;
      body.storageId = get(body, "storageId", uuidv4());

      if (body.expirationDate)
        body.expirationDate = dateAsTimestamp(body.expirationDate);
      const msg = isUpdating
        ? "Los datos se an actualizado."
        : "Los datos se an registrado.";

      const listRef = ref(storage, `questions/${body.storageId}`);
      const { items: listObjects } = await listAll(listRef);
      console.log(listObjects);
      body = await uploadImages(body);
      console.log(body);
      if (isUpdating) {
        const docRef = doc(db, "activities", id);
        await updateDoc(docRef, body);
      } else {
        await addDoc(collection(db, "activities"), body);
      }
      const questions = get(body, "questions", []);
      const oldFiles = listObjects.map((item) => item.fullPath);
      const urlNewFiles = questions.map((item) => get(item, "questionFile"));
      oldFiles.forEach((urlRef) => {
        if (!urlNewFiles.includes(urlRef)) {
          const desertRef = ref(storage, urlRef);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {});
        }
      });
      notification.success({
        message: "Éxito",
        description: msg,
      });
      navigate("/activity");
    } catch (e) {
      console.log(e);
      let msg = `No se pudo ${
        isUpdating ? "actualizar" : "crear"
      } el registro.`;
      SwalError("Error", `${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={ActivityIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Actividad Interactiva</h1>
      </div>
      <LoadMask loading={loading}>
        <ActivityForm
          onSubmit={onSubmit}
          initialValues={data}
          isUpdating={isUpdating}
        />
      </LoadMask>
    </>
  );
}
