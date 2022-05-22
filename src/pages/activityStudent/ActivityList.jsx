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
import { get, getRandomInt } from "../../helpers";
const listColors = ["#002D47", "#00B0BD", "#296073", "#F59432"];
export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const { getDate } = useDateUtils();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getActivities(activities, user)
      .then((data) => {
        if (data) setActivities(data);
      })
      .finally(() => setLoading(false));
  }, []);

  async function getActivities(activities = [], user) {
    let querySet = query(
      collection(db, "activities"),
      orderBy("expirationDate", "desc"),
      where("expirationDate", ">", new Date()),
      where("group", "==", user.group),
      startAfter(activities),
      limit(25)
    );

    const querySnapshot = await getDocs(querySet);
    const result = [];
    querySnapshot.forEach((doc) => {
      const activity = { id: doc.id, ...doc.data() };
      const responses = Array.from(get(activity, "studentsResponse", []));
      activity.complete = responses.includes(user.uid);
      result.push(activity);
    });
    console.log("re", result);
    return result;
  }
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
          activities.map(
            ({ title, description, expirationDate, id, complete }) => (
              <div className="p-0 m-0 col-12 col-sm-6" key={id}>
                <div
                  className=" p-3 m-3 d-flex flex-column cursor-pointer bg-light shadow"
                  style={{
                    borderLeft: `15px solid ${
                      complete ? "#6c757d" : listColors.at(getRandomInt(0, 3))
                    }`,
                    borderRadius: "15px",
                    height: "150px",
                  }}
                  onClick={() => {
                    navigate(`/activity-student/${id}`);
                  }}
                >
                  <h6 className="fw-bold text-line-1">{title}</h6>
                  <p className=" text-line-5">{description}</p>
                  <span className="ml-auto mt-auto p-0">
                    <span className="fw-bold">Vencimiento: </span>
                    {getDate(expirationDate)}
                  </span>
                  {complete ? (
                    <span className="mt-0 mr-auto badge bg-secondary d-inline">
                      Actividad resuelta{" "}
                    </span>
                  ) : (
                    <span className="mt-0 mr-auto badge bg-danger d-inline">
                      Actividad no resuelta
                    </span>
                  )}
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}
