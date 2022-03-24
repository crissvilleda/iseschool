import { useController } from "react-hook-form";

export default function InputText({
  name,
  control,
  rules,
  className,
  placeholder,
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
      <input className={className || ""} placeholder={placeholder} {...field} />
      {error && <p className="help is-danger">{error.message}</p>}
    </>
  );
}
