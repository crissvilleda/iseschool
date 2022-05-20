import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCreate from "../../hooks/useCreate";
import TitleUnderline from "../../components/TitleUnderline";

import {
  InputDate,
  InputText,
  InputSelect,
  InputEditor,
} from "../../components/CustomInputs";

export default function MaterialForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

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
            rules={{ required: "Este campo es requerido" }}
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
              rules={{ required: "Este campo es requerido." }}
              placeholder="Seleccione"
              options={[
                { value: "Admin", label: "Administrador" },
                { value: "Teacher", label: "Catedrático" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="is-flex is-fle">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Titulo
          </label>
          <InputText
            className="input"
            control={control}
            name="title"
            rules={{ required: "Este campo es requerido" }}
            placeholder="Ingrese titulo"
          />
        </div>

        <div></div>
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
