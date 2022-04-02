import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useList } from "../../hooks";
import dayjs from "dayjs";
import UserIcon from "../../assets/img/user.png";
import{
  InputSelect,
} from "../../components/CustomInputs"

export default function () {
  const { getData } = useList("users", "name");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      if (data) setUsers(data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: "id",
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
            const bornDate = row.bornDate.toDate();
            if (!dayjs(bornDate).isValid()) return "";
            return dayjs(bornDate).format("DD-MM-YYYY");
          }
          return "";
        },
      },
      {
        Header: "Genero",
        accessor: "gender",
      },
    ],
    []
  );

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={UserIcon} className="title-icon"/>
          <h1 className="title is-3">Usuarios</h1>
        </div>
        <Link to="/user/create" className="button is-secondary">
          Agregar nuevo
        </Link>
      
         <div className="is-flex is-fle">
          <div className="field column is-6">
            <label htmlFor="test" className="label">
              Filtrar por tipo
            </label>
            <div className="control">
              <InputSelect
                className="input"
                control={control}
                name="filter"
                rules={{required: "Este campo es requerido"}}
                placeholder="Seleccione tipo"
                options={[
                  {value: "Admin", label: "Administrador"},
                  {value: "Teacher", label: "Catedratico"},
                ]}
              />
            </div>
          </div>
        </div>
        */


      </div>
      <br />
      <br />
      <Table columns={columns} data={users} />
    </>
  );
}
