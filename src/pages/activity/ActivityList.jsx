import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import ActivityIcon from "../../assets/img/activities.png";
import useDelete from "../../hooks/useDelete";
import LoadingContext from "../../context/LoadingContext";
import useDateUtils from "../../hooks/useDateUtils";
import { Select } from "antd";
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
import { get } from "../../helpers";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [group, setGroup] = useState(null);
  const { deleteData } = useDelete("activities");
  const { loading, setLoading } = useContext(LoadingContext);
  const [groupOptions, setGroupOptions] = useState([]);
  const { dateAsDayjs } = useDateUtils();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getActivities().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let querySet = query(
      collection(db, "groups"),
      where("active", "==", true),
      orderBy("createdAt"),
      limit(25)
    );

    getDocs(querySet).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        results.push({ value: doc.id, label: doc.data().name })
      );
      setGroupOptions(results);
    });
    const results = [];
  }, []);

  async function getActivities(filterGroup = null) {
    let querySet = query(collection(db, "activities"), limit(25));
    if (filterGroup) {
      querySet = query(
        collection(db, "activities"),
        where("group", "==", filterGroup),
        limit(25)
      );
    }
    const querySnapshot = await getDocs(querySet);
    const results = [];
    querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
    setActivities(results);
  }

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
          result: (id) => navigate(`/activity/${id}/results`),
        }),
      },
      {
        Header: "Actividad",
        accessor: "title",
      },
      {
        Header: "Creado por",
        accessor: (row) => {
          const name = get(row, "createdBy.name", undefined);
          const lastName = get(row, "createdBy.lastName", undefined);

          if (name && lastName) return `${name} ${lastName}`;
          if (name) return name;
          if (lastName) return lastName;
          return "Desconocido";
        },
      },
      {
        Header: "Ultimo dia entrega",
        accessor: (row) => {
          const date = dateAsDayjs(row.expirationDate);
          if (date) return date.format("DD/MM/YYYY");
          return "";
        },
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
      <div className="is-flex">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Filtrar por grupo
          </label>
          <div className="control">
            <Select
              className="input"
              onChange={(value) => {
                setGroup(value);
                getActivities(value);
              }}
              placeholder="Seleccione Grupo"
              allowClear={true}
              value={group}
              bordered={false}
              size="large"
            >
              {groupOptions.map((i) => {
                return (
                  <Option key={i.value} value={i.value}>
                    {i.label}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Table columns={columns} data={activities} loading={loading} />
    </>
  );
}
