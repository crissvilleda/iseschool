import { useController } from "react-hook-form";
import JoditEditor from "jodit-react";

export default function InputEditor({
  name,
  control,
  rules,
  className,
  placeholder,
}) {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <JoditEditor
        ref={ref}
        value={value}
        config={{
          readonly: false,
          placeholder: placeholder || "Start typings...",
        }}
        tabIndex={1}
        onBlur={onChange}
      />
      {error && <p className="help is-danger">{error.message}</p>}
    </>
  );
}
