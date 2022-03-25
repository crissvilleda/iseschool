import { useController } from "react-hook-form";

export default function InputText({
  name,
  control,
  rules,
  className,
  placeholder,
  type = "text",
}) {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <input
        type={type}
        className={className || ""}
        placeholder={placeholder}
        {...field}
      />
      {error && <p className="help is-danger">{error.message}</p>}
    </>
  );
}
