import { useMemo, useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import ActivityIcon from "../../assets/img/activities.png";
import useDelete from "../../hooks/useDelete";
import LoadingContext from "../../context/LoadingContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  where,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import useDateUtils from "../../hooks/useDateUtils";
import UserContext from "../../context/UserContext";
import ActivityResponse from "./ActivityResponse";
import LoadMask from "../../components/LoadMask";
import { get } from "../../helpers";

export default function Activity() {
  const { dateAsTimestamp, getDate } = useDateUtils();
  const { loading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;
  const navigate = useNavigate();

  const [isRespond, setIsRespond] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const docRef = doc(db, "activities", id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const activity = { ...docSnap.data() };
            const responses = Array.from(get(activity, "studentsResponse", []));
            activity.complete = responses.includes(user.uid);
            setData(docSnap.data());
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const { title, description, expirationDate } = data || {};

  const onSubmit = async (newData) => {
    if (id) {
      setLoading(true);
      if (data?.studentsResponse?.length > 0) {
        if (data.studentsResponse.includes(user.uid)) {
          return;
        }
      }
      const docRef = doc(db, "activities", id);
      const studentsResponse =
        data?.studentsResponse?.length > 0 ? [...data?.studentsResponse] : [];

      await updateDoc(docRef, {
        ...data,
        studentsResponse: [...studentsResponse, user.uid],
      });
      delete newData.studentsResponse;
      await addDoc(collection(db, "activitiesResponses"), {
        ...newData,
        studentResponse: user.uid,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4 flex-column">
        <div className="is-flex ">
          <img src={ActivityIcon} className="title-icon" />
          <h2 className="title is-3 ml-2">{title}</h2>
        </div>
        <LoadMask loading={loading}>
          {!isRespond ? (
            <>
              <p className="mx-2 mx-sm-4">
                <span className=" fw-bold">Descripción </span>
                {description}
              </p>
              <p className="mx-2 mx-sm-4">
                <span className=" fw-bold">Fecha de vencimiento </span>
                {getDate(expirationDate)}
              </p>
            </>
          ) : (
            <ActivityResponse data={data} onSubmit={onSubmit} />
          )}
          {!isRespond && (
            <div className="is-flex justify-content-evenly pt-4">
              <Link className="button is-secondary " to="/activity-student">
                Regresar
              </Link>
              <button
                className="button is-primary"
                type="button"
                onClick={() => {
                  setIsRespond(true);
                }}
              >
                Iniciar
              </button>
            </div>
          )}
        </LoadMask>
      </div>
    </>
  );
}
