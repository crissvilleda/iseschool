import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCreate from "../../hooks/useCreate";  
import {
  InputDate,
  InputText,
  InputSelect,
} from "../../components/CustomInputs";

export default function UserForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const { saveData } = useCreate("users", "/user");
  const onSubmit = (data) => saveData(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Datos Personales</label>
      <div className="is-flex is-fle">
        <div className="field column is-6">
            <label htmlFor="test" className="label">
              Nombre
            </label>
            <InputText
              className="input"
              control={control}
              name="name"
              rules={{required: "Este campo es requerido."}}
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
                name="name"
                rules={{required: "Este campo es requerido."}}
                placeholder={"Ingrese apellido"}
              />
            </div>
          </div>
      </div>
      <div className="is-flex">
        <div className="field column id-6">
          <label htmlFor="test" className="label">
            Fecha de Nacimiento 
          </label>
          <div className="control">
            <InputDate
              className="input"
              control={control}
              name="bornDate"
              rules={{required: "Este campo es requerido."}}
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
          rules={{required: "Este campo es requerido."}}
          placeholder="Seleccione genero"
          options={[
            {value: "M", label: "Masculino"},
            {value: "F", label: "Femenino"},
          ]}
          />
        </div>
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
