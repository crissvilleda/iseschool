import { useContext, useEffect, useState } from "react";
import GroupForm from "./GroupForm";
import GroupIcon from "../../assets/img/group.png";
import useCreate from "../../hooks/useCreate";
import useDateUtils from "../../hooks/useDateUtils";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import dayjs from "dayjs";

export default function group() {
  const { saveData } = useCreate("groups", "/group");
  const { loading, setLoading } = useContext(LoadingContext);
  const { dateAsTimestamp } = useDateUtils();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;

  const updateData = async (docData) => {
    setLoading(true);
    const docRef = doc(db, "groups", id);
    await updateDoc(docRef, docData);
    navigate("/group");
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      const docRef = doc(db, "groups", id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            data.year = dayjs().set("year", data.year);
            setData(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = (data) => {
    const body = { ...data };
    body.year = dayjs(data.year).year();
    if (isUpdating) updateData(body);
    else saveData({ ...body, createdAt: dateAsTimestamp() });
  };

  return (
    <>
      <div className="is-flex pt-4">
        <img src={GroupIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Grupos</h1>
      </div>
      <LoadMask loading={loading}>
        <GroupForm
          onSubmit={onSubmit}
          initialValues={data}
          isUpdating={isUpdating}
        />
      </LoadMask>
    </>
  );
}
