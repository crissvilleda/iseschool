import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  InputText,
  InputSelect,
  InputEditor,
} from "../../components/CustomInputs";
import { required } from "../../validations";
import { db } from "../../firebase";
import {
  query,
  collection,
  limit,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";

export default function MaterialForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const [groupOptions, setGroupOptions] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
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
      <div className="is-flex is-fle">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Titulo
          </label>
          <InputText
            className="input"
            control={control}
            name="title"
            rules={{ validate: required }}
            placeholder="Ingrese titulo"
          />
        </div>

        <div className="field column is-6">
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
      </div>

      <div className="is-flex is-fle">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Descripción
          </label>
          <InputText
            className="input"
            control={control}
            name="description"
            rules={{ validate: required }}
            placeholder="Ingrese descripción"
          />
        </div>
        <div className="d-none d-md-flex is-6" />
      </div>

      <div className="field column is-12">
        <label htmlFor="test" className="label">
          Contenido
        </label>
        <InputEditor className="input" control={control} name="content" />
      </div>

      <div className="is-flex is-justify-content-space-between">
        <Link className="button is-secondary " to="/resource">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
