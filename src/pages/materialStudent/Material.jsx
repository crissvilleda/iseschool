import { useMemo, useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import MaterialIcon from "../../assets/img/books.png";
import useDelete from "../../hooks/useDelete";
import LoadingContext from "../../context/LoadingContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import InputAnswer from "../../components/InputAnswer";
import useUpdate from "../../hooks/useUpdate";

export default function Activity() {
  const { data } = useUpdate("materials", "/resource");
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
        <div
          className="mx-2 mx-sm-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <p className="mx-2 mx-sm-4">
          <span className=" fw-bold">Fecha de vencimiento </span>
          {createdAt?.seconds}
        </p>
      </div>
      <div className="is-flex justify-content-evenly pt-4">
        <Link className="button is-secondary " to="/resource-student">
          Regresar
        </Link>
      </div>
    </>
  );
}
