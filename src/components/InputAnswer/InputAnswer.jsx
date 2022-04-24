import CheckCircle from "../../assets/img/check-circle.png";
import { useController } from "react-hook-form";
import "./input_answer.css";

export default function InputAnswer({
  name,
  control,
  rules,
  className,
  placeholder,
  borderLeftColor = "#F59432",
}) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  const onCheck = () => {
    const _isCheck = value && value.isRight ? value.isRight : false;
    const _value = value && value.value ? value.value : "";
    onChange({ value: _value, isRight: !_isCheck });
  };

  return (
    <>
      <div
        className="answer-card p-3"
        style={{ borderLeftColor: borderLeftColor }}
      >
        <div className="check-circle-container">
          <div className="check-circle" onClick={onCheck}>
            {value && value.isRight && <img src={CheckCircle} />}
          </div>
        </div>
        <textarea
          ref={ref}
          rows={2}
          className={className || ""}
          placeholder={placeholder}
          value={value && value.value ? value.value : ""}
          onChange={(e) => onChange({ value: e.target.value })}
        />
      </div>
    </>
  );
}
