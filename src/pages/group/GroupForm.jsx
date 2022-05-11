import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";
import { required } from "../../validations";
import dayjs from "dayjs";

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
    reset({ active: true, year: dayjs(), ...initialValues });
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
            rules={{ validate: required }}
            placeholder={"Ingrese nombre"}
          />
        </div>

        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Año
          </label>
          <div className="control">
            <InputDate
              className="input"
              control={control}
              picker="year"
              name="year"
              placeholder=""
              format="YYYY"
              rules={{ validate: required }}
            />
          </div>
        </div>
      </div>
      <div className="is-flex">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Estado
          </label>
          <InputSelect
            className="input"
            control={control}
            name="active"
            type="radio"
            rules={{ validate: required }}
            options={[
              { value: true, label: "Activo" },
              { value: false, label: "Desactivado" },
            ]}
            placeholder={"Seleccione estado"}
          />
        </div>
        <div className="field column is-6"></div>
      </div>

      <div className="is-flex is-justify-content-space-between">
        <Link className="button is-secondary " to="/group">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          {isUpdating ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
