import { useForm } from "react-hook-form";
import {
  InputTextArea,
  InputSelect,
  InputUpload,
} from "../../../components/CustomInputs";
import { required } from "../../../validations";
import QuizType from "./QuizType";
import TrueFalseType from "./TrueFalseType";

export default function QuestionForm({
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
    reset,
  } = useForm();

  const watchType = watch("type");

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
      <QuizType control={control} />
      <TrueFalseType control={control} />
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
