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
  });

  return (
    <>
      <input className={className || ""} placeholder={placeholder} {...field} />
      {error && <p class="help is-danger">{error.message}</p>}
    </>
  );
}
