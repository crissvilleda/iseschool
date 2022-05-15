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

export default function ActivityResponse() {
  const description =
    "description loremsdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf lorem asdf qwef gbadgwgsdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf lorem asdf qwef gbadgwg loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 4";

  const { respuestaArray, question, id } = {
    respuestaArray: [
      { id: 1, description },
      { id: 2, description: "hola como te va" },
      { id: 3, description },
      { id: 4, description },
    ],
    question:
      "n 1ion lorem loaasdj lkasjdf kj asdlfion lorem loaasdj lkasjdf kj asdlf???",
    id: 1,
  };
  const respuestaArray2 = [
    { id: 1, description: "Verdadero" },
    { id: 0, description: "Falso" },
  ];

  const selectedResponse = 2;

  return (
    <>
      <h5 className=" ml-2">
        <span className="fw-bold d-inline">Pregunta: </span>
        {question}:
      </h5>
      <h5 className=" fw-bold ml-2">Respuestas:</h5>

      <div className="row">
        {respuestaArray2.map(
          ({ title, description, expirationDate, id }, index) => (
            <div className={`p-0 m-0 col-${false ? "12" : "6"}`} key={id}>
              <div
                className=" bg-white p-3 m-3 cursor-pointer"
                style={{
                  border: `15px solid ${
                    selectedResponse == id ? "#F59432" : "rgb(0 45 71 / 10%)"
                  }  `,
                  borderRadius: "15px",
                  minHeight: "20px",
                }}
              >
                {false ? (
                  <p className=" text-line-5">{description}</p>
                ) : (
                  <h4 className=" fw-bold text-center my-auto">
                    {description}
                  </h4>
                )}
              </div>
            </div>
          )
        )}
        {respuestaArray.map(
          ({ title, description, expirationDate, id }, index) => (
            <div className={`p-0 m-0 col-${true ? "12" : "6"}`} key={id}>
              <div
                className=" bg-white p-3 m-3 cursor-pointer"
                style={{
                  border: `15px solid ${
                    selectedResponse == id ? "#F59432" : "rgb(0 45 71 / 10%)"
                  }  `,
                  borderRadius: "15px",
                  minHeight: "20px",
                }}
              >
                {true ? (
                  <p className=" text-line-5">{description}</p>
                ) : (
                  <h4 className=" fw-bold text-center my-auto">
                    {description}
                  </h4>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="is-flex justify-content-center pt-4">
        <button className="button is-primary" type="submit">
          Siguiente
        </button>
      </div>
    </>
  );
}
