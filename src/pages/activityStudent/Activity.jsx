import { useMemo, useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Table, { tableActions } from "../../components/Table";
import dayjs from "dayjs";
import ActivityIcon from "../../assets/img/activities.png";
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

export default function Activity() {
  const { id, title, description, expirationDate } = {
    id: 1,
    title:
      "n 1ion lorem loaasdj lkasjdf kj asdlfion lorem loaasdj lkasjdf kj asdlf",
    description:
      "description lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 1",
    expirationDate: "10 de mayo de 2020",
  };
  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4 flex-column">
        <div className="is-flex ">
          <img src={ActivityIcon} className="title-icon" />
          <h2 className="title is-3 ml-2">{title}</h2>
        </div>
        <p className="mx-2 mx-sm-4">
          <span className=" fw-bold">Descripción </span>
          {description}
        </p>
        <p className="mx-2 mx-sm-4">
          <span className=" fw-bold">Fecha de vencimiento </span>
          {expirationDate}
        </p>
      </div>
      <div className="is-flex justify-content-evenly pt-4">
        <Link className="button is-secondary " to="/activity-student">
          Regresar
        </Link>
        <Link
          to={`/activity-student/2/response`}
          className="button is-primary"
          type="submit"
        >
          Iniciar
        </Link>
      </div>
    </>
  );
}
