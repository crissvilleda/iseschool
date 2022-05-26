import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import UserIcon from "../../assets/img/user.png";
import { Select } from "antd";
import LoadMask from "../../components/LoadMask";
import useDateUtils from "../../hooks/useDateUtils";
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
import { SwalError } from "../../components/SwalAlerts";
const { Option } = Select;

export default function () {
  const [users, setUsers] = useState([]);
  const [typeUser, setTypeUser] = useState(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  const { dateAsDayjs } = useDateUtils();

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
      limit(200)
    );
    const querySnapshot = await getDocs(querySet);
    const results = [];
    querySnapshot.forEach((doc) => results.push({ ...doc.data(), id: doc.id }));
    setUsers(results);
  }

  async function removeData(id) {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      await getUser(typeUser);
    } catch (e) {
      SwalError("Error", "Ocurrió un error al intentar eliminar el registro.");
    } finally {
      setLoading(false);
    }
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
        Header: "Nombres",
        accessor: "name",
      },
      {
        Header: "Apellidos",
        accessor: "lastName",
      },
      {
        Header: "Fecha Nacimiento",
        accessor: (row) => {
          if (row.bornDate) {
            const bornDate = dateAsDayjs(row.bornDate);
            if (!bornDate.isValid()) return "";
            return bornDate.format("DD-MM-YYYY");
          }
          return "";
        },
      },
      {
        Header: "Genero",
        accessor: (row) => (row.gender === "M" ? "Masculino" : "Femenino"),
      },
    ],
    []
  );

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={UserIcon} className="title-icon" />
          <h1 className="title is-3">Usuarios</h1>
        </div>
        <Link to="/user/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      </div>
      <div className="is-flex is-fle">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Filtrar por tipo
          </label>
          <div className="control">
            <Select
              className="input"
              onChange={(value) => {
                setTypeUser(value);
                getUser(value);
              }}
              allowClear={true}
              placeholder="Seleccione Tipo"
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
