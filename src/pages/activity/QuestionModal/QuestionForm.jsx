import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputTextArea,
  InputSelect,
  InputUpload,
} from "../../../components/CustomInputs";
import { required, isEmpty } from "../../../validations";
import QuizType from "./QuizType";
import TrueFalseType from "./TrueFalseType";
import { Tooltip } from "antd";
import { get } from "../../../helpers";

const resolver = (data, context) => {
  const errors = {};
  if (!data.question)
    errors.question = { type: "required", message: required(data.question) };
  if (!data.type)
    errors.type = { type: "required", message: required(data.type) };
  if (data.type && data.answers) {
    const hasAnswer = Object.values(data.answers).reduce(
      (error, answer) => error || !isEmpty(answer?.value),
      false
    );
    const hasRightAnswer = Object.values(data.answers).reduce(
      (error, answer) => error || answer?.isRight === true,
      false
    );
    if (!hasAnswer) {
      errors.answers = {
        type: "required",
        message: "Debe agregar una respuesta.",
      };
    } else if (!hasRightAnswer) {
      errors.answers = {
        type: "required",
        message: "Debe seleccionar al menos una respuesta correcta.",
      };
    } else if (data.type === "true_or_false") {
      const answerOne = data?.answers?.one?.isRight || false;
      const answerTwo = data?.answers?.two?.isRight || false;
      if (answerOne && answerTwo) {
        errors.answers = {
          type: "",
          message: "Solo debe seleccionar una respuesta correcta.",
        };
      }
    }
  }

  return { values: data, errors: errors };
};

export default function QuestionForm({
  onSubmit = () => {},
  onCancel = () => {},
  initialValues = {},
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    setValue,
    watch,
    reset,
  } = useForm({ resolver });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onChangeType = (value) => {
    if (
      value === "true_or_false" &&
      get(initialValues, "type") === "true_or_false"
    ) {
      setValue(
        "answers.one",
        get(initialValues, "answers.one", { value: "Verdadero" })
      );
      setValue(
        "answers.two",
        get(initialValues, "answers.two", { value: "Falso" })
      );
    } else if (value == "quiz" && get(initialValues, "type") === "quiz") {
      setValue("answers.one", get(initialValues, "answers.one", { value: "" }));
      setValue("answers.two", get(initialValues, "answers.two", { value: "" }));
      setValue(
        "answers.tree",
        get(initialValues, "answers.tree", { value: "" })
      );
      setValue(
        "answers.four",
        get(initialValues, "answers.four", { value: "" })
      );
    } else if (value === "true_or_false") {
      setValue("answers.one", { value: "Verdadero" });
      setValue("answers.two", { value: "Falso" });
    } else {
      setValue("answers.one", { value: "" });
      setValue("answers.two", { value: "" });
      setValue("answers.tree", { value: "" });
      setValue("answers.four", { value: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formModal">
      <div className="field column is-12">
        <label htmlFor="test" className="label">
          Pregunta
        </label>
        <InputTextArea
          className="textarea"
          control={control}
          name="question"
          rows={1}
          rules={{ validate: required }}
          placeholder={"Ingrese la pregunta"}
        />
      </div>
      <div className="is-flex is-justify-content-center">
        <InputUpload
          name="questionFile"
          control={control}
          placeholder="Agregar imagen o fotografía"
        />
      </div>
      <div className="is-flex">
        <div className="field column is-6">
          <label htmlFor="test" className="label">
            Tipo de respuesta
          </label>
          <InputSelect
            className="input"
            control={control}
            name="type"
            onChangeField={onChangeType}
            options={[
              {
                value: "quiz",
                label: "Quiz",
              },
              {
                value: "true_or_false",
                label: "Falso o Verdadero",
              },
            ]}
            rules={{ validate: required }}
            placeholder={"Seleccione tipo de respuesta"}
          />
        </div>
      </div>
      <Tooltip
        title={errors?.answers?.message || ""}
        visible={errors?.answers?.message || false}
        placement="topRight"
        color={"red"}
        autoAdjustOverflow={true}
        getPopupContainer={(trigger) => trigger.parentElement}
      >
        {watch("type") == "quiz" && (
          <QuizType
            control={control}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        )}
        {watch("type") == "true_or_false" && (
          <TrueFalseType
            control={control}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        )}
      </Tooltip>
      <div className="is-flex is-justify-content-space-between pt-4">
        <button
          type="button"
          className="button is-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="button is-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
