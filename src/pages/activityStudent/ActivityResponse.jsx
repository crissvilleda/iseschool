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

export default function ActivityResponse({ data }) {
  const [numberCuestions, setNumberCuestions] = useState(0);
  const [question, setQuestion] = useState({});
  const [allResponse, setallResponse] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestion(data.questions[numberCuestions]);
    }
  }, [numberCuestions]);

  useEffect(() => {
    console.log(allResponse);
  }, [allResponse]);

  return (
    <>
      <div>
        <h5 className=" ml-2">
          <span className="fw-bold d-inline">Pregunta: </span>
          {question.question}:
        </h5>
        <h5 className=" fw-bold ml-2">Responde:</h5>
      </div>

      <div className="row">
        {Object.keys(question?.answers || {}).map((clave) => {
          if (!question.answers[clave] || !question.answers[clave].value) {
            return;
          }
          return (
            <div
              className={`p-0 m-0 col-${
                question?.type !== "true_or_false" ? "12" : "6"
              }`}
              key={clave}
            >
              <div
                className=" bg-white p-3 m-3 cursor-pointer"
                style={{
                  border: `15px solid ${
                    !!allResponse[numberCuestions]?.[clave]
                      ? "#F59432"
                      : "rgb(0 45 71 / 10%)"
                  }  `,
                  borderRadius: "15px",
                  minHeight: "20px",
                }}
                onClick={() => {
                  const _data = [...allResponse];
                  if (question?.type === "true_or_false") {
                    _data[numberCuestions] = {
                      [clave]: !_data[numberCuestions]?.[clave] || true,
                    };
                  } else {
                    _data[numberCuestions] = {
                      ..._data[numberCuestions],
                      [clave]: !_data[numberCuestions]?.[clave],
                    };
                  }
                  setallResponse(_data);
                }}
              >
                {question?.type !== "true_or_false" ? (
                  <p className=" text-line-5">
                    {question.answers[clave]?.value}
                  </p>
                ) : (
                  <h4 className=" fw-bold text-center my-auto">
                    {question.answers[clave]?.value}
                  </h4>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="is-flex justify-content-center pt-4">
        {numberCuestions > 0 && (
          <button
            className="button is-primary mx-3"
            type="button"
            onClick={() => {
              setNumberCuestions((n) => n - 1);
            }}
          >
            Anterior
          </button>
        )}
        {numberCuestions + 1 < data.questions.length && (
          <button
            className="button is-primary mx-3"
            type="button"
            onClick={() => {
              setNumberCuestions((n) => n + 1);
            }}
          >
            Siguiente
          </button>
        )}
        {numberCuestions + 1 == data.questions.length && (
          <button
            className="button is-secondary mx-3"
            type="button"
            onClick={() => {
              console.log("--- enviando las respustas ingresadas ---");
              console.log(allResponse);
              console.log("--- --------------------------------- ---");
            }}
          >
            Enviar
          </button>
        )}
      </div>
    </>
  );
}
