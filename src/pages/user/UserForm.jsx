import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCreate from "../../hooks/useCreate";

export default function UserForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { saveData } = useCreate("users", "/user");
  const onSubmit = (data) => saveData(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="test" className="label">
          Nombre
        </label>
        <div className="control">
          <input className="input" {...register("name", { required: true })} />
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
          />
          {errors.lastName && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="test" className="label">
          Fecha de Nacimiento
        </label>
        <div className="control">
          <input
            className="input"
            {...register("bornDate", { required: false })}
          />
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
