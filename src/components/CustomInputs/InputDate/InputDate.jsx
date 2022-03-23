import { useController } from "react-hook-form";
import DatePicker from "../../DatePicker";

export default function InputDate({ name, control, rules, className }) {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
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
        value={value}
        ref={ref}
      />
    </>
  );
}
