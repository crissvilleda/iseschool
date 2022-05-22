import { useEffect, useState } from "react";

export default function ActivityResponse({ data, onSubmit }) {
  const [numberCuestions, setNumberCuestions] = useState(0);
  const [question, setQuestion] = useState({});
  const [response, setResponse] = useState({});
  const [errorSelect, setErrorSelect] = useState(false);
  let newData = JSON.parse(JSON.stringify(data));

  useEffect(() => {
    if (data) {
      setQuestion(data.questions[numberCuestions]);
    }
  }, [numberCuestions]);

  const checkSelect = (callBack) => {
    if (Object.keys(response).some((clave) => response[clave])) {
      setResponse({});
      setErrorSelect(false);
      callBack();
    } else {
      setErrorSelect(true);
      setTimeout(() => {
        setErrorSelect(false);
      }, 2000);
    }
  };

  const checkAnswer = () => {
    Object.keys(response).map((clave) => {
      if (!!response[clave]) {
        newData.questions[numberCuestions].answers[clave].selectStudent =
          !!response[clave];
      }
    });
    const isIncorrect = Object.keys(
      newData.questions[numberCuestions].answers
    ).some((clave) => {
      const _answer = newData.questions[numberCuestions].answers[clave];
      return !!_answer.selectStudent !== !!_answer.isRight;
    });
    newData.questions[numberCuestions].isCorrect = !isIncorrect;
  };

  const checkTotalCorrect = () => {
    newData.totalQuestions = newData.questions.length;
    newData.totalQuestionsCorrect = newData.questions.reduce((prev, obj) => {
      return obj.isCorrect ? prev + 1 : prev;
    }, 0);
    newData.complete = true;
  };

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
                    !!response?.[clave] ? "#F59432" : "rgb(0 45 71 / 10%)"
                  }  `,
                  borderRadius: "15px",
                  minHeight: "20px",
                }}
                onClick={() => {
                  let _data = { ...response };
                  if (question?.type === "true_or_false") {
                    _data = {
                      [clave]: !_data?.[clave] || true,
                    };
                  } else {
                    _data = {
                      ..._data,
                      [clave]: !_data?.[clave],
                    };
                  }
                  setResponse(_data);
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
        {numberCuestions + 1 < data.questions.length && (
          <button
            className="button is-primary mx-3"
            type="button"
            onClick={() => {
              checkSelect(() => {
                setNumberCuestions((n) => n + 1);
                checkAnswer();
              });
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
              checkSelect(() => {
                checkAnswer();
                checkTotalCorrect();
                onSubmit(newData);
              });
            }}
          >
            Enviar
          </button>
        )}
      </div>
      {errorSelect && (
        <div className="alert alert-danger mt-4 py-2" role="alert">
          !Debes seleccionar una respuesta!
        </div>
      )}
    </>
  );
}
