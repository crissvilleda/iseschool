import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCreate from "../../hooks/useCreate";
import 

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
      <label>Datos Personales</label>
      <div className="field">
        <label htmlFor="test" className="label">
          Nombre
        </label>
        <div className="control">
          <input className="input" {...register("name", { required: true })} placeholder="Ingrese nombre" />
          {errors.name && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="test" className="label">
          Apellidos
        </label>
        <div className="control">
          <input className="input" {...register("lastName", { required: true })} placeholder="Ingrese Apellido"/>
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
            {...register("bornDate", { required: false })} placeholder="Date"/>
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
            {...register("gender", { required: true })} placeholder="Select"/>
          {errors.gender && <span>Este campo es requerido.</span>}
        </div>
      </div>

      <label>Datos Del Sistema</label>

      <div c lassName="field">
        <label htmlFor="test" className="label">Tipo de Usuario
        </label>
        <div className="control">
          <input className="input" {...register("name", { required: true })} placeholder="Select" />
          {errors.name && <span>Este campo es requerido.</span>}
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
