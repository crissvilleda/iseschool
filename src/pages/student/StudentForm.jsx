import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCreate from "../../hooks/useCreate";
import { InputDate } from "../../components/CustomInputs";

export default function StudentForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const { saveData } = useCreate("users", "/student");
  const onSubmit = (data) => saveData(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Datos Personales</label>
      <div className="field">
        <label htmlFor="test" className="label">
          Nombre
        </label>
        <div className="control">
          <input
            className="input"
            {...register("name", { required: true })}
            placeholder="Ingrese nombre"
          />
          {errors.name && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="test" className="label">
          Apellidos
        </label>
        <div className="control">
          <input
            className="input"
            {...register("lastName", { required: true })}
            placeholder="Ingrese Apellido"
          />
          {errors.lastName && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="test" className="label">
          Fecha de Nacimiento
        </label>
        <div className="control">
          <InputDate className="input" control={control} name="bornDate" />
          {errors.bornDate && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="test" className="label">
          Genero
        </label>
        <div className="control">
          <input
            className="input"
            {...register("gender", { required: true })}
            placeholder="Select"
          />
          {errors.gender && <span>Este campo es requerido.</span>}
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
