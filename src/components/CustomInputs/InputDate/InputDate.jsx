import { useController } from "react-hook-form";
import DatePicker from "../../DatePicker";
import useDateUtils from "../../../hooks/useDateUtils";
import { Tooltip } from "antd";

export default function InputDate({
  name,
  control,
  rules,
  className,
  picker = "date",
  format = "DD/MM/YYYY",
  placeholder = "DD/MM/YYYY",
}) {
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
      <Tooltip
        title={error && error.message ? error.message : ""}
        visible={error ? true : false}
        placement="topRight"
        color={"red"}
      >
        <DatePicker
          className={className || ""}
          onChange={onChange}
          format={format}
          placeholder={placeholder}
          value={dateAsDayjs(value)}
          picker={picker}
          ref={ref}
          size="large"
        />
      </Tooltip>
    </>
  );
}
