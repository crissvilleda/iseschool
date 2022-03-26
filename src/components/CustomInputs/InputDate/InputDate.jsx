import { useController } from "react-hook-form";
import DatePicker from "../../DatePicker";
import useDateUtils from "../../../hooks/useDateUtils";

export default function InputDate({ name, control, rules, className }) {
  const { dateAsDayjs } = useDateUtils();
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  return (
    <>
      <DatePicker
        className={className || ""}
        onChange={onChange}
        format="DD/MM/YYYY"
        placeholder="DD/MM/YYYY"
        value={dateAsDayjs(value)}
        ref={ref}
        size="large"
      />
      {error && <p className="help is-danger">{error.message}</p>}
    </>
  );
}
