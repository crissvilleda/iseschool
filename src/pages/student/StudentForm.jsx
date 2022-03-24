import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";

export default function StudentForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos Personales" />
      <div className="is-flex is-fle">
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
            Apellido
          </label>
          <div className="control">
            <InputText
              className="input"
              control={control}
              name="lastName"
              rules={{ required: "Este campo es requerido." }}
              placeholder={"Ingrese apellido"}
            />
          </div>
        </div>
      </div>
      <div className="is-flex">
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

        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Genero
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="gender"
              rules={{ required: "Este campo es requerido." }}
              placeholder="Seleccione genero"
              options={[
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="is-flex is-justify-content-space-between">
        <Link className="button is-secondary " to="/user">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          Registrar
        </button>
      </div>
    </form>
  );
}