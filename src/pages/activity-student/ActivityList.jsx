import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import InputAnswer from "../../components/InputAnswer";

async function getActivities(activities = []) {
  let querySet = query(
    collection(db, "activities"),
    startAfter(activities),
    limit(25),
    orderBy("createdAt")
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const { deleteData } = useDelete("users");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getActivities(activities)
      .then((data) => {
        if (data) setActivities(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const removeData = async (id) => {
    setLoading(true);
    await deleteData(id);
    await getActivities(activities).then((data) => {
      if (data) setActivities(data);
    });
    setLoading(false);
  };

  const activities2 = [
    {
      id: 1,
      title: "n 1",
      description: "description 1",
      expirationDate: "fecha hola ",
    },
    {
      id: 2,
      title: "n 2",
      description: "description 2",
      expirationDate: "fecha hola ",
    },
    {
      id: 3,
      title: "n 3",
      description: "description 3",
      expirationDate: "fecha hola ",
    },
    {
      id: 4,
      title: "n 4",
      description: "description 4",
      expirationDate: "fecha hola ",
    },
    {
      id: 5,
      title: "n 5",
      description: "description 5",
      expirationDate: "fecha hola ",
    },
  ];

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={ActivityIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Mis Actividades</h1>
        </div>
      </div>

      <br />
      <br />
      <div
        className="is-flex is-flex-wrap-wrapx"
        style={{ backgroundColor: "powderblue" }}
      >
        {/* <Table columns={columns} data={activities} loading={loading} /> */}
        {activities2.map(({ title, description, expirationDate, id }) => (
          <div className="field column is-6 ">
            <div
              className="answer-card p-3"
              style={{ borderLeftColor: "#002D47" }}
            >
              <div className="is-flex">
                <span className="ml-auto">
                  <span className="has-text-weight-bold bg-primary">
                    Estado:
                  </span>{" "}
                  Sin iniciar
                </span>
              </div>
              <div>{title}sd</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
