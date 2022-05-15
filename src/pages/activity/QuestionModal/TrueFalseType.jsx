import { useEffect } from "react";
import InputAnswer from "../../../components/InputAnswer";
import { useWatch } from "react-hook-form";

export default function TrueFalseType({
  control,
  setValue,
  clearErrors,
  resetField,
}) {
  const watchAnswers = useWatch({
    control,
    name: "answers",
  });

  useEffect(() => {
    if (watchAnswers) {
      clearErrors("answers");
    }
    return () => clearErrors("answers");
  }, [watchAnswers]);

  return (
    <>
      <div className="is-flex">
        <div className="field column is-6">
          <InputAnswer
            name="answers.one"
            control={control}
            placeholder="Verdadero"
            borderLeftColor="#002D47"
            disabled={true}
          />
        </div>
        <div className="field column is-6">
          <InputAnswer
            name="answers.two"
            control={control}
            placeholder="Falso"
            disabled={true}
          />
        </div>
      </div>
    </>
  );
}
