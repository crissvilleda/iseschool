import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";

export default function GroupForm({
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
      <TitleUnderline title="Datos de Grupo" />
      <div className="is-flex">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Nombre
          </label>
          <InputText
            className="input"
            control={control}
            name="name"
            rules={{ required: "Este campo es requerido." }}
            placeholder={"Ingrese nombre"}
          />
        </div>

        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Fecha de Nacimiento
          </label>
          <div className="control">
            <InputDate
              className="input"
              control={control}
              name="bornDate"
              rules={{ required: "Este campo es requerido." }}
            />
          </div>
        </div>
      </div>
      
      <TitleUnderline title="Estudiantes" />
      <div className="is-flex">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Nombre Usuario
          </label>
          <InputText
            className="input"
            control={control}
            name="nameUser"
            rules={{ required: "Este campo es requerido" }}
            placeholder="Ingrese nombre"
          />
        </div>

      
      </div>
      

      <div className="is-flex is-justify-content-space-between">
        <Link className="button is-secondary " to="/student">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          {isUpdating ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
