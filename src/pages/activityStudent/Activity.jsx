import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActivityIcon from "../../assets/img/activities.png";
import LoadingContext from "../../context/LoadingContext";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
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
    setLoading(true);
    const docRef = doc(db, "activities", id);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const activity = { ...docSnap.data() };
          const responses = Array.from(get(activity, "studentsResponse", []));
          activity.complete = responses.includes(user.uid);
          setData(activity);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const { title, description, expirationDate, complete } = data || {};

  const onSubmit = async (newData) => {
    if (id) {
      setLoading(true);
      const responses = Array.from(get(data, "studentsResponse", []));
      if (responses.includes(user.uid)) {
        setIsRespond(false);
        setLoading(false);
        return;
      }

      const docRef = doc(db, "activities", id);
      await updateDoc(docRef, {
        ...data,
        studentsResponse: [...responses, user.uid],
      });
      delete newData.studentsResponse;
      await addDoc(collection(db, "activitiesResponses"), {
        ...newData,
        studentId: user.uid,
        studentData: user,
        activityId: id,
      });
      setData({ ...data, studentsResponse: [...responses, user.uid] });
      setLoading(false);
      setIsRespond(false);
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
                <span className=" fw-bold">Descripción: </span>
                {description}
              </p>
              <p className="mx-2 mx-sm-4">
                <span className=" fw-bold">Fecha de vencimiento: </span>
                {getDate(expirationDate)}
              </p>
              <p className="mx-2 mx-sm-4">
                <span className=" fw-bold">Estado de la actividad: </span>
                {complete ? "Resuelta" : "No resuelta"}
              </p>
              {!complete && (
                <p className="mx-2 mx-sm-4 text-center">
                  Al terminar la actividad ya no podrá volver a responderla de
                  nuevo
                </p>
              )}
            </>
          ) : (
            <ActivityResponse data={data} onSubmit={onSubmit} />
          )}
          {!isRespond && (
            <div className="is-flex justify-content-evenly pt-4">
              <Link className="button is-secondary " to="/activity-student">
                Regresar
              </Link>
              {!data.complete && (
                <button
                  className="button is-primary"
                  type="button"
                  onClick={() => {
                    setIsRespond(true);
                  }}
                >
                  Iniciar
                </button>
              )}
            </div>
          )}
        </LoadMask>
      </div>
    </>
  );
}
