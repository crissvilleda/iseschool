import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import {
  InputText,
  InputTextArea,
  InputDate,
} from "../../components/CustomInputs";
import { required } from "../../validations";
import Table, { tableActions } from "../../components/Table";
import QuestionModal from "./QuestionModal/QuestionModal";

export default function ActivityForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const [visible, setVisible] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    reset,
  } = useForm();

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/activity/${id}`),
          remove: (id) => remove(id),
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
    []
  );

  const onAddQuestion = (question) => {
    append(question);
    console.log(question);
    setVisible(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos de actividad" />
      <div className="is-flex">
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
            <InputText
              className="input"
              control={control}
              name="group"
              rules={{ validate: required }}
              placeholder={"Seleccione grupo"}
            />
          </div>
        </div>
      </div>
      <div className="is-flex">
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
      <Table data={fields} columns={columns}></Table>
      <br />
      <div className="is-flex is-justify-content-space-between pt-4">
        <Link className="button is-secondary " to="/student">
          Regresar
        </Link>
        <button className="button is-primary" type="submit">
          {isUpdating ? "Actualizar" : "Registrar"}
        </button>
      </div>
      <QuestionModal
        onSubmit={onAddQuestion}
        isVisible={visible}
        setVisible={setVisible}
      />
    </form>
  );
}
