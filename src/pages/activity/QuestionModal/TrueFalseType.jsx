import InputAnswer from "../../../components/InputAnswer";
import { useWatch } from "react-hook-form";

export default function TrueFalseType({ control }) {
  const watchType = useWatch({
    control,
    name: "type",
  });
  return (
    <>
      {watchType === "true_or_false" && (
        <div className="is-flex">
          <div className="field column is-6">
            <InputAnswer
              name="answers.one"
              control={control}
              placeholder="Verdadero"
            />
          </div>
          <div className="field column is-6">
            <InputAnswer
              name="answers.two"
              control={control}
              placeholder="Falso"
            />
          </div>
        </div>
      )}
    </>
  );
}
