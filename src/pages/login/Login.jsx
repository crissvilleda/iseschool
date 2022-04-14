import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "../../components/CustomInputs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { SwalError } from "../../components/SwalAlerts";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          SwalError("Error", "El email o la contraseña es invalida.");
        }
      });
  };

  return (
    <>
      <div className="login-container">
        <br />
        <br />
        <h2 className="has-text-centered title mt-6">Inicio de sesión </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="field column">
            <label htmlFor="test" className="label">
              Correo
            </label>
            <InputText
              className="input"
              control={control}
              name="email"
              rules={{ required: "Este campo es requerido." }}
              placeholder={"Ingrese nombre"}
            />
          </div>
          <div className="field column">
            <label htmlFor="test" className="label">
              Contraseña
            </label>
            <InputText
              className="input"
              control={control}
              name="password"
              type="password"
              rules={{ required: "Este campo es requerido." }}
              placeholder={"Ingrese nombre"}
            />
          </div>

          <div className="is-flex is-justify-content-center mt-3">
            <button className="button is-primary" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
