import { useMemo, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import MaterialIcon from "../../assets/img/books.png";
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
const { Option } = Select;

export default function () {
  const [materials, setMaterials] = useState([]);
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  const [groupOptions, setGroupOptions] = useState([]);

  const { dateAsDayjs } = useDateUtils();

  useEffect(() => {
    setLoading(true);
    getMaterials().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let querySet = query(
      collection(db, "groups"),
      where("active", "==", true),
      orderBy("createdAt"),
      limit(25)
    );

    const results = [];
    getDocs(querySet).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        results.push({ value: doc.id, label: doc.data().name })
      );
      setGroupOptions(results);
    });
  }, []);

  async function getMaterials(filterGroup = null) {
    let querySet = query(collection(db, "materials"), limit(25));
    if (filterGroup) {
      querySet = query(
        collection(db, "materials"),
        where("group", "==", filterGroup),
        limit(25)
      );
    }
    const querySnapshot = await getDocs(querySet);
    const results = [];
    querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
    setMaterials(results);
  }

  async function removeData(id) {
    setLoading(true);
    await deleteDoc(doc(db, "materials", id));
    await getMaterials(typeUser);
    setLoading(false);
  }
  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/resource/${id}`),
          remove: (id) => removeData(id),
        }),
      },
      {
        Header: "Título",
        accessor: "title",
      },
      // {
      //   Header: "Docente",
      //   accessor: "teacher",
      // },
      {
        Header: "Fecha",
        accessor: (row) => {
          const createdAt = dateAsDayjs(row.createdAt);
          if (!dayjs(createdAt).isValid()) return "";
          else return createdAt.format("DD-MM-YYYY");
        },
      },
    ],
    []
  );

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
                getMaterials(value);
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
      <LoadMask loading={loading}>
        <Table columns={columns} data={materials} />
      </LoadMask>
    </>
  );
}
