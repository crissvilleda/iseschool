import Upload from "./Upload";
import { useController } from "react-hook-form";

export default function InputUpload({
  name,
  control,
  rules,
  className,
  placeholder,
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });
  return (
    <>
      <Upload file={value} onChange={onChange} uploadText={placeholder} />
    </>
  );
}
