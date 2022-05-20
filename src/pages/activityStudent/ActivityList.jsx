import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActivityIcon from "../../assets/img/activities.png";
import LoadingContext from "../../context/LoadingContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import useDateUtils from "../../hooks/useDateUtils";
import UserContext from "../../context/UserContext";

async function getActivities(activities = [], group) {
  let querySet = query(
    collection(db, "activities"),
    where("expirationDate", "<", new Date()),
    where("group", "==", group),
    orderBy("expirationDate", "desc"),
    startAfter(activities),
    limit(25)
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { getDate } = useDateUtils();

  useEffect(() => {
    setLoading(true);
    getActivities(activities, user.group)
      .then((data) => {
        if (data) setActivities(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={ActivityIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Mis Actividades</h1>
        </div>
      </div>

      <div className="row">
        {!loading &&
          activities.map(({ title, description, expirationDate, id }) => (
            <div className="p-0 m-0 col-12 col-sm-6" key={id}>
              <div
                className=" p-3 m-3 d-flex flex-column cursor-pointer bg-light shadow"
                style={{
                  borderLeft: "15px solid red",
                  borderRadius: "15px",
                  height: "220px",
                }}
                onClick={() => {
                  navigate(`/activity-student/${id}`);
                }}
              >
                <h6 className="fw-bold text-line-1">{title}</h6>
                <p className=" text-line-5">{description}</p>
                <span className="ml-auto mt-auto p-0">
                  <span className="fw-bold">Vence:</span>{" "}
                  {getDate(expirationDate)}
                </span>
                <span className="mt-auto mr-auto badge bg-danger d-inline">
                  Sin completar
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
