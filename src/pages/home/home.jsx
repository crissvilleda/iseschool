import { useEffect, useState, useContext } from "react";
import HomeIcon from "../../assets/img/home.svg";
import "./home.css";
import Card from "../../components/Card";
import { Chart } from "react-google-charts";
import { db } from "../../firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const dataChart1 = [
  ["Género", "Cantidad"],
  ["Niños", 50],
  ["Niñas", 70],
];

export const dataChart2 = [
  ["Año", "Niños", "Niñas"],
  ["2022", 50, 70],
  ["2023", 70, 60],
];

const getStats = async () => {
  const data = {};
  const queryStats = query(
    collection(db, "statistics"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const statsResult = await getDocs(queryStats);
  const stats = statsResult.docs[0].data();
  data.students = [["Genero", "Cantidad"]];
  data.students.push(["Niños", stats?.students?.boys || 0]);
  data.students.push(["Niñas", stats?.students?.girls || 0]);
  return data;
};
export default function Home() {
  const [stats, setStats] = useState({});
  const { setLoading, loading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.type == "Student") navigate("/activity-student");
    else {
      setLoading(true);
      getStats()
        .then((data) => setStats(data))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <div className="is-flex pt-4">
        <img src={HomeIcon} className="title-icon" />
        <h1 className="title is-3 ml-1">Inicio</h1>
      </div>
      <LoadMask loading={loading}>
        <div className="columns">
          <div className="column is-6">
            <Card className="p-4 mb-5">
              <h2>Estudiantes</h2>
              {stats?.students ? (
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="350px"
                  data={stats?.students}
                  options={{
                    title: "Cantidad de estudiantes",
                    pieHole: 0.4,
                    is3D: false,
                  }}
                />
              ) : (
                <span>No hay datos</span>
              )}
            </Card>
          </div>
          <div className="column is-6">
            <Card className="p-4 mb-5" borderLeftColor="#00B0BD">
              <h2>Actividades</h2>
              <Chart
                chartType="Bar"
                width="100%"
                height="350px"
                data={dataChart2}
                options={{
                  chart: {
                    subtitle: "Cantidad actividades resueltas",
                  },
                }}
              />
            </Card>
          </div>
        </div>
      </LoadMask>
    </>
  );
}
