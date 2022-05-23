import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";
import {
  email,
  composeValidators,
  required,
  date,
  password,
} from "../../validations";
import { db } from "../../firebase";
import {
  query,
  collection,
  limit,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";

export default function StudentForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const [groupOptions, setGroupOptions] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

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

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos Personales" />
      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6 m-0">
          <label htmlFor="test" className="label">
            Nombre
          </label>
          <InputText
            className="input"
            control={control}
            name="name"
            rules={{ validate: required }}
            placeholder={"Ingrese nombre"}
          />
        </div>

        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Apellido
          </label>
          <div className="control">
            <InputText
              className="input"
              control={control}
              name="lastName"
              rules={{ validate: required }}
              placeholder={"Ingrese apellido"}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6 m-0">
          <label htmlFor="test" className="label">
            Fecha de Nacimiento
          </label>
          <div className="control">
            <InputDate
              className="input"
              control={control}
              name="bornDate"
              rules={{ validate: composeValidators(required, date) }}
            />
          </div>
        </div>

        <div className="field column is-6 mb-2">
          <label htmlFor="test" className="label">
            Genero
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="gender"
              rules={{ validate: required }}
              placeholder="Seleccione genero"
              options={[
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" },
              ]}
            />
          </div>
        </div>
      </div>
      <TitleUnderline title="Datos del sistema" />
      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6 m-0">
          <label htmlFor="test" className="label">
            Grupo
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="group"
              options={groupOptions}
              rules={{ validate: required }}
              placeholder={"Seleccione grupo"}
            />
          </div>
        </div>
        <div className="d-none d-sm-flex is-6" />
      </div>

      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6 m-0">
          <label htmlFor="test" className="label">
            Correo
          </label>
          <InputText
            className="input"
            control={control}
            name="email"
            rules={{ validate: composeValidators(required, email) }}
            placeholder={"Ingrese Correo"}
          />
        </div>
        {isUpdating ? (
          <div className="field column is-6 m-0">
            <label htmlFor="test" className="label">
              Contraseña
            </label>
            <InputText
              className="input"
              control={control}
              name="password"
              rules={{ validate: password }}
              placeholder="Ingrese contraseña"
              type="password"
            />
          </div>
        ) : (
          <div className="field column is-6 m-0">
            <label htmlFor="test" className="label">
              Contraseña
            </label>
            <InputText
              className="input"
              control={control}
              name="password"
              rules={{ validate: composeValidators(required, password) }}
              placeholder="Ingrese contraseña"
              type="password"
            />
          </div>
        )}
      </div>

      <div className="d-flex flex-column-reverse flex-sm-row mt-4 justify-content-between">
        <Link className="button is-secondary mt-4 mb-mt-0" to="/student">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          {isUpdating ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
