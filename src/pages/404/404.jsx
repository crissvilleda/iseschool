import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="d-flex flex-column align-items-center my-4">
        <h1>Oops!</h1>
        <h2>404 Pagina no encontrada</h2>
      </div>
      <div className="d-flex flex-column-reverse flex-sm-row justify-content-center">
        <Link className="button is-secondary mt-4 mb-mt-0" to="/">
          Regresar
        </Link>
      </div>
    </>
  );
}
