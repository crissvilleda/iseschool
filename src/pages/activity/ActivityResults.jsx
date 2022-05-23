import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import useDateUtils from "../../hooks/useDateUtils";
import Table from "../../components/Table";
import { get } from "../../helpers";
import Card from "../../components/Card";

function ExpandComponent({ row }) {
  const original = row.original;
  console.log(original);
  console.log(row);
  return <>Hola mundo</>;
}

export default function ActivityResults() {
  const [responses, setResponses] = useState([]);
  const [activity, setActivity] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);
  const { dateAsDayjs, getDate } = useDateUtils();
  const { id } = useParams();

  async function getResponses() {
    let querySet = query(
      collection(db, "activitiesResponses"),
      where("activityId", "==", id),
      orderBy("createdAt")
    );
    const querySnapshot = await getDocs(querySet);
    const results = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) =>
        results.push({ id: doc.id, ...doc.data() })
      );
      setActivity(get(results, "[0]", {}));
    }
    setResponses(results);
  }

  useEffect(() => {
    setLoading(true);
    getResponses().finally(() => setLoading(false));
  }, []);

  const columns = useMemo(
    () => [
      {
        // Make an expander cell
        Header: "Herramientas", // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "Ocultar 👇" : "Ver respuestas 👉"}
          </span>
        ),
      },
      {
        Header: "Estudiante",
        accessor: (row) => {
          const name = get(row, "studentData.name", undefined);
          const lastName = get(row, "studentData.lastName", undefined);

          if (name && lastName) return `${name} ${lastName}`;
          if (name) return name;
          if (lastName) return lastName;
          return "Desconocido";
        },
      },
      {
        Header: "Respuestas correctas",
        accessor: (row) => get(row, "totalQuestionsCorrect", 0),
      },
      {
        Header: "Fecha y hora de entrega",
        accessor: (row) => {
          const date = dateAsDayjs(row.createdAt);
          if (date) return date.format("DD/MM/YYYY - h:mm A");
          return "";
        },
      },
    ],
    []
  );

  return (
    <>
      <LoadMask loading={loading}>
        {activity && activity.activityId ? (
          <>
            <Card className="py-2 mb-3">
              <p className="mx-2 mx-sm-4 mb-1">
                <span className=" fw-bold" style={{ color: "#375784" }}>
                  Actividad:{" "}
                </span>
                {get(activity, "title", "")}
              </p>
              <p className="mx-2 mx-sm-4 mb-1">
                <span className=" fw-bold" style={{ color: "#375784" }}>
                  Descripción:{" "}
                </span>
                {get(activity, "description", "")}
              </p>
              <p className="mx-2 mx-sm-4 mb-1">
                <span className=" fw-bold" style={{ color: "#375784" }}>
                  Fecha de vencimiento:{" "}
                </span>
                {getDate(get(activity, "expirationDate", undefined))}
              </p>
              <p className="mx-2 mx-sm-4 mb-1">
                <span className=" fw-bold" style={{ color: "#375784" }}>
                  Publicado por:{" "}
                </span>
                {get(activity, "createdBy.name", "") +
                  " " +
                  get(activity, "createdBy.lastName", "")}
              </p>
            </Card>

            <Table
              columns={columns}
              data={responses}
              loading={loading}
              renderRowSubComponent={ExpandComponent}
            />
          </>
        ) : (
          <>
            {!loading && (
              <div>
                <h5 className=" text-center ">
                  No hay respuestas de esta actividad
                </h5>
              </div>
            )}
          </>
        )}
      </LoadMask>
      <div className="d-flex flex-column-reverse flex-sm-row mt-4 justify-content-between">
        <Link className="button is-secondary mt-4 mb-mt-0" to="/activity">
          Regresar
        </Link>
      </div>
    </>
  );
}
