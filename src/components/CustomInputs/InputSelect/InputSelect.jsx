import { useController } from "react-hook-form";

import { Select } from "antd";

const { Option } = Select;

export default function InputSelect({
  name,
  control,
  rules,
  className,
  placeholder,
  options = [],
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  return (
    <>
      <Select
        className={className || ""}
        onChange={onChange}
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
      {error && <p class="help is-danger">{error.message}</p>}
    </>
  );
}
