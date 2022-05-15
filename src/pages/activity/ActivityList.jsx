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

async function getActivities(activities = []) {
  let querySet = query(
    collection(db, "activities"),
    orderBy("createdAt", "desc"),
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
  const { deleteData } = useDelete("activities");
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
  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/activity/${id}`),
          remove: (id) => removeData(id),
        }),
      },
      {
        Header: "Actividad",
        accessor: "title",
      },
      {
        Header: "Tipo",
        accessor: "lastName",
      },
      {
        Header: "Creado",
        accessor: "gender",
      },
    ],
    []
  );

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={ActivityIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Actividades</h1>
        </div>
        <Link to="/activity/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      </div>

      <br />
      <br />
      <Table columns={columns} data={activities} loading={loading} />
    </>
  );
}
