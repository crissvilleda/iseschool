import { useContext } from "react";
import { Link } from "react-router-dom";
import LoadMask from "../../components/LoadMask";
import LoadingContext from "../../context/LoadingContext";
import MaterialIcon from "../../assets/img/books.png";
import useUpdate from "../../hooks/useUpdate";

export default function Activity() {
  const { data } = useUpdate("materials", "/resource");
  const { loading } = useContext(LoadingContext);
  const { title, content, createdAt } = data;
  if (!(Object.keys(data).length > 0)) {
    return <></>;
  }
  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4 flex-column">
        <div className="is-flex ">
          <img src={MaterialIcon} className="title-icon" />
          <h2 className="title is-3 ml-2">{title}</h2>
        </div>
        <LoadMask loading={loading}>
          <div
            className="mx-2 mx-sm-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="is-flex justify-content-evenly pt-4">
            <Link className="button is-secondary " to="/resource-student">
              Regresar
            </Link>
          </div>
        </LoadMask>
      </div>
    </>
  );
}
