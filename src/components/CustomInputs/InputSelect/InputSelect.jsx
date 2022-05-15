import { useController } from "react-hook-form";
import { Select, Tooltip } from "antd";

const { Option } = Select;

export default function InputSelect({
  name,
  control,
  rules,
  className,
  placeholder,
  options = [],
  onChangeField = () => {},
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  let _value = value;
  if (_value !== null && _value !== undefined) {
    _value = options.find((item) => item.value === value);
  }

  return (
    <>
      <Tooltip
        title={error && error.message ? error.message : ""}
        visible={error ? true : false}
        placement="topRight"
        color={"red"}
        getPopupContainer={(trigger) => trigger.parentElement}
      >
        <Select
          className={className || ""}
          onChange={(value) => {
            onChange(value);
            onChangeField(value);
          }}
          placeholder={placeholder}
          value={value}
          bordered={false}
          size="large"
        >
          {Array.from(options).map((item) => {
            return (
              <Option key={item.value} value={item.value}>
                {item.label}{" "}
              </Option>
            );
          })}
        </Select>
      </Tooltip>
    </>
  );
}
