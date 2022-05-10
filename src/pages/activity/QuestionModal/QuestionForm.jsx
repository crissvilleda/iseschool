import { useForm, useWatch } from "react-hook-form";
import {
  InputTextArea,
  InputSelect,
  InputUpload,
} from "../../../components/CustomInputs";
import { required, isEmpty } from "../../../validations";
import QuizType from "./QuizType";
import TrueFalseType from "./TrueFalseType";
import { Tooltip } from "antd";

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
  console.log(data);
  return { values: data, errors: errors };
};

export default function QuestionForm({
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    setValue,
  } = useForm({ resolver });

  const watchType = useWatch({
    control,
    name: "type",
  });

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
          placeholder="Agregar imagen o fotografiá"
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
        {watchType == "quiz" && (
          <QuizType
            control={control}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        )}
        {watchType == "true_or_false" && (
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
