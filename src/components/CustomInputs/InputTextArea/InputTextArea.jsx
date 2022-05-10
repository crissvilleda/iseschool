import { useController } from "react-hook-form";
import { Tooltip } from "antd";

export default function InputTextArea({
  name,
  control,
  rules,
  className,
  placeholder,
  rows = 3,
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
      <Tooltip
        title={error && error.message ? error.message : ""}
        visible={error ? true : false}
        placement="topRight"
        color={"red"}
        getPopupContainer={(trigger) => trigger.parentElement}
      >
        <textarea
          rows={rows}
          className={className || ""}
          placeholder={placeholder}
          {...field}
        />
      </Tooltip>
    </>
  );
}
