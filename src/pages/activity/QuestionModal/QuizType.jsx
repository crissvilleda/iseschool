import { useEffect } from "react";
import InputAnswer from "../../../components/InputAnswer";
import { useWatch } from "react-hook-form";

export default function QuizType({ control, clearErrors, setValue }) {
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
      <>
        <div className="is-flex">
          <div className="field column is-6">
            <InputAnswer
              name="answers.one"
              control={control}
              placeholder="Ingrese la primera respuesta"
              borderLeftColor="#002D47"
            />
          </div>
          <div className="field column is-6">
            <InputAnswer
              name="answers.two"
              control={control}
              placeholder="Ingrese la segunda respuesta"
            />
          </div>
        </div>
        <div className="is-flex">
          <div className="field column is-6">
            <InputAnswer
              name="answers.tree"
              control={control}
              placeholder="Ingrese la tercera respuesta"
              borderLeftColor="#00B0BD"
            />
          </div>
          <div className="field column is-6">
            <InputAnswer
              name="answers.four"
              control={control}
              placeholder="Ingrese la cuarta respuesta"
              borderLeftColor="#296073"
            />
          </div>
        </div>
      </>
    </>
  );
}
