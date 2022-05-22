import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../../assets/img/books.png";
import LoadingContext from "../../context/LoadingContext";
import LoadMask from "../../components/LoadMask";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import useDateUtils from "../../hooks/useDateUtils";
import { getRandomInt } from "../../helpers";
const listColors = ["#002D47", "#00B0BD", "#296073", "#F59432"];

async function getMaterials(materials = []) {
  let querySet = query(
    collection(db, "materials"),
    orderBy("createdAt", "desc"),
    startAfter(materials),
    limit(25)
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}

export default function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const { getDate } = useDateUtils();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getMaterials(materials)
      .then((data) => {
        if (data) setMaterials(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={MaterialIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Mis Materiales De Apoyo</h1>
        </div>
      </div>
      <LoadMask loading={loading}>
        <div className="row">
          {materials.map(({ title, description, createdAt, id }) => (
            <div className="p-0 m-0 col-12 col-sm-6" key={id}>
              <div
                className=" p-3 m-3 d-flex flex-column cursor-pointer bg-light shadow"
                style={{
                  borderLeft: `15px solid ${listColors.at(getRandomInt(0, 3))}`,
                  borderRadius: "15px",
                  height: "125px",
                }}
                onClick={() => {
                  navigate(`/resource-student/${id}`);
                }}
              >
                <h6 className="fw-bold text-line-1">{title}</h6>
                <p className=" text-line-5">{description}</p>
                <span className="ml-auto mt-auto p-0">
                  <span className="fw-bold">Publicado: </span>
                  {getDate(createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </LoadMask>
    </>
  );
}
