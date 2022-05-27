import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActivityIcon from "../../assets/img/activities.png";
import LoadingContext from "../../context/LoadingContext";
import { notification } from "antd";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  where,
  limit,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import useDateUtils from "../../hooks/useDateUtils";
import UserContext from "../../context/UserContext";
import ActivityResponse from "./ActivityResponse";
import LoadMask from "../../components/LoadMask";
import { get } from "../../helpers";

import confetti from "canvas-confetti";

export default function Activity() {
  const { dateAsTimestamp, getDate } = useDateUtils();
  const { loading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const isUpdating = id ? true : false;
  const navigate = useNavigate();

  const [isRespond, setIsRespond] = useState(false);
  const getData = async () => {
    setLoading(true);
    let activity = {};

    try {
      let querySet = query(
        collection(db, "activitiesResponses"),
        where("activityId", "==", id),
        where("studentId", "==", user.uid),
        limit(1)
      );

      await getDocs(querySet).then((docSnap) => {
        docSnap.forEach((item) => {
          activity = { ...item.data() };
        });
      });

      if (!activity?.complete) {
        const docRef = doc(db, "activities", id);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            activity = { ...docSnap.data() };
            activity.complete = false;
          }
        });
      }
      setData(activity);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
        createdAt: new Date(),
      });
      setData({ ...data, studentsResponse: [...responses, user.uid] });
      setLoading(false);
      setIsRespond(false);
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
      });
      notification.success({
        message: "Éxito",
        description: "Actividad finalizada.",
      });
      getData();
    }
  };

  return Object.keys(data).length === 0 ? (
    <></>
  ) : (
    <>
      <div className="is-flex is-justify-content-space-between my-4 flex-column">
        <div className="is-flex ">
          <img src={ActivityIcon} className="title-icon" />
          {isRespond ? (
            <b style={{ color: "#296073" }} className=" ml-2">
              {title}
            </b>
          ) : (
            <h2 className="title is-3 ml-2">{title}</h2>
          )}
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

              {!complete ? (
                <p className="mx-2 mx-sm-4 text-center">
                  Al terminar la actividad ya no podrá volver a responderla de
                  nuevo
                </p>
              ) : (
                <>
                  <p className="mx-2 mx-sm-4">
                    <span className=" fw-bold">Total de preguntas: </span>
                    {data.totalQuestions}
                  </p>
                  <p className="mx-2 mx-sm-4">
                    <span className=" fw-bold">
                      Total de respuestas correctas:{" "}
                    </span>
                    {data.totalQuestionsCorrect}
                  </p>
                </>
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
