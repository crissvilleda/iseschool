import CheckCircle from "../../assets/img/check-circle.png";
import { useController } from "react-hook-form";
import { Tooltip } from "antd";
import "./input_answer.css";

export default function InputAnswer({
  name,
  control,
  rules,
  className,
  placeholder,
  borderLeftColor = "#F59432",
  disabled = false,
  defaultValue = null,
}) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue,
  });

  const onCheck = () => {
    const _isCheck = value && value.isRight ? value.isRight : false;
    const _value = value && value.value ? value.value : "";
    onChange({ value: _value, isRight: !_isCheck });
  };

  return (
    <>
      <Tooltip
        title={error && error.message ? error.message : ""}
        visible={error ? true : false}
        placement="topRight"
        color={"red"}
      >
        <div
          className="answer-card p-3"
          style={{ borderLeftColor: borderLeftColor }}
        >
          <div className="check-circle-container">
            <button
              type="button"
              disabled={value?.value ? false : true}
              className="check-circle"
              onClick={onCheck}
            >
              {value && value.isRight && <img src={CheckCircle} />}
            </button>
          </div>
          <textarea
            ref={ref}
            rows={2}
            className={className || ""}
            placeholder={placeholder}
            disabled={disabled}
            value={value && value.value ? value.value : ""}
            onChange={(e) => onChange({ value: e.target.value })}
          />
        </div>
      </Tooltip>
    </>
  );
}
