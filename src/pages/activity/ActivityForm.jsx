import { useEffect, useMemo, useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputText,
  InputTextArea,
  InputDate,
  InputSelect,
} from "../../components/CustomInputs";
import { required } from "../../validations";
import Table, { tableActions } from "../../components/Table";
import QuestionModal from "./QuestionModal/QuestionModal";
import { db } from "../../firebase";
import {
  query,
  collection,
  limit,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { Tooltip } from "antd";

export default function ActivityForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState({});
  const [groupOptions, setGroupOptions] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    setError,
    reset,
    getValues,
  } = useForm();

  const { fields, append, replace } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    let querySet = query(
      collection(db, "groups"),
      where("active", "==", true),
      orderBy("createdAt"),
      limit(25)
    );

    const results = [];
    getDocs(querySet).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        results.push({ value: doc.id, label: doc.data().name })
      );
      setGroupOptions(results);
    });
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id, row) => setQuestion(row),
          remove: (id) => replace(fields.filter((i) => i.id !== id)),
        }),
      },
      {
        Header: "Pregunta",
        accessor: "question",
      },
      {
        Header: "Tipo",
        accessor: (row) => {
          if (row.type === "quiz") return "Quiz";
          if (row.type == "true_or_false") return "Falso o verdadero";
          return "";
        },
      },
    ],
    [fields]
  );

  const onAddQuestion = (question) => {
    append(question);
    setVisible(false);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos de actividad" />
      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Titulo
          </label>
          <InputText
            className="input"
            control={control}
            name="title"
            rules={{ validate: required }}
            placeholder={"Ingrese titulo"}
          />
        </div>

        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Grupo
          </label>
          <div className="control">
            <InputSelect
              className="input"
              control={control}
              name="group"
              options={groupOptions}
              rules={{ validate: required }}
              placeholder={"Seleccione grupo"}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Ultima fecha entrega
          </label>
          <InputDate
            className="input"
            control={control}
            name="expirationDate"
            rules={{ validate: required }}
            placeholder={"Selección fecha"}
          />
        </div>
        <div className="field column is-6"></div>
      </div>
      <div className="is-flex">
        <div className="field column is-12">
          <label htmlFor="test" className="label">
            Descripción
          </label>
          <div className="control">
            <InputTextArea
              className="textarea is-12"
              control={control}
              name="description"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="is-flex is-mobile-direction-column is-justify-content-space-between is-12">
        <TitleUnderline title="Preguntas" />
        <button
          onClick={() => {
            clearErrors();
            setVisible(true);
          }}
          className="button is-secondary"
          type="button"
        >
          Agregar pregunta
        </button>
      </div>
      <br />
      <Tooltip
        title={errors?.questions?.message || ""}
        visible={errors?.questions?.message || false}
        placement="top"
        color={"red"}
        autoAdjustOverflow={true}
        getPopupContainer={(trigger) => trigger.parentElement}
      >
        <Table data={fields} columns={columns}></Table>
      </Tooltip>
      <br />
      <div className="d-flex flex-column-reverse flex-sm-row mt-4 justify-content-between">
        <Link className="button is-secondary mt-4 mb-mt-0" to="/activity">
          Regresar
        </Link>
        <button
          className="button is-primary"
          type="button"
          onClick={() => {
            const questions = Array.from(getValues("questions") || []);
            if (questions.length === 0) {
              setError("questions", {
                type: "custom",
                message: "Debe agregar al menos una pregunta.",
              });
            }
            handleSubmit(onSubmit)();
          }}
        >
          {isUpdating ? "Actualizar" : "Registrar"}
        </button>
      </div>
      <QuestionModal
        onSubmit={onAddQuestion}
        isVisible={visible}
        setVisible={setVisible}
      />
      {question && question.id && (
        <QuestionModal
          onSubmit={(data) => {
            replace(
              fields.map((i) => {
                if (i.id == question.id) {
                  return { id: i.id, ...data };
                }
                return i;
              })
            );
            setQuestion({});
          }}
          isVisible={true}
          initialValues={question}
          setVisible={() => setQuestion({})}
        />
      )}
    </form>
  );
}
