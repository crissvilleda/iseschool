import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import MaterialIcon from "../../assets/img/books.png";
import { Select } from "antd";
import LoadMask from "../../components/LoadMask";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import LoadingContext from "../../context/LoadingContext.js";
const { Option } = Select;

export default function () {
  const [users, setUsers] = useState([]);
  const [typeUser, setTypeUser] = useState(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    getUser().finally(() => setLoading(false));
  }, []);

  async function getUser(filterType = null) {
    let typeUser = ["Admin", "Teacher"];
    if (filterType != null) {
      typeUser = typeUser.filter((value) => value == filterType);
    }

    let querySet = query(
      collection(db, "users"),
      where("type", "in", typeUser),
      limit(25)
    );
    const querySnapshot = await getDocs(querySet);
    const results = [];
    querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
    setUsers(results);
  }

  async function removeData(id) {
    setLoading(true);
    await deleteDoc(doc(db, "users", id));
    await getUser(typeUser);
    setLoading(false);
  }
  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/user/${id}`),
          remove: (id) => removeData(id),
        }),
      },
      {
        Header: "Título",
        accessor: "",
      },
      {
        Header: "Grupo",
        accessor: "",
      },
      {
        Header: "Docente",
        accessor: "",
      },
      {
        Header: "Fecha",
        accessor: (row) => {
          //if (row.bornDate) {
          //  const bornDate = row.bornDate.toDate();
          //  if (!dayjs(bornDate).isValid()) return "";
          //  return dayjs(bornDate).format("DD-MM-YYYY");
          //}
          return "";
        },
      },
    ],
    []
  );
  console.log(typeUser);
  console.log(users);

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={MaterialIcon} className="title-icon" />
          <h1 className="title is-3">Material</h1>
        </div>
        <Link to="/resource/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      </div>
      <div className="is-flex is-fle">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Filtrar por grupo
          </label>
          <div className="control">
            <Select
              className="input"
              onChange={(value) => {
                setTypeUser(value);
                getUser(value);
              }}
              placeholder="Seleccione Grupo"
              value={typeUser}
              bordered={false}
              size="large"
            >
              <Option key="Admin" value="Admin">
                Administrador
              </Option>
              <Option key="Teacher" value="Teacher">
                Catedrático
              </Option>
            </Select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <LoadMask loading={loading}>
        <Table columns={columns} data={users} />
      </LoadMask>
    </>
  );
}
