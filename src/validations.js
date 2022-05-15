import dayjs from "dayjs";
import useDateUtils from "./hooks/useDateUtils";
const { dateAsDayjs } = useDateUtils();

export function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

export function email(value) {
  // Let's not start a debate on email regex! This one is quite standard
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return "Dirección de correo electrónico no válida.";
  }

  return null;
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Debe tener al menos ${min} caracteres.`;
    }

    return null;
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `No debe tener mas de ${max} caracteres.`;
    }

    return null;
  };
}

export function required(value) {
  if (isEmpty(value)) {
    return "Este campo es requerido.";
  }

  return null;
}
export function password(value) {
  const regularExpression =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if (!isEmpty(value) && !regularExpression.test(value)) {
    return "La contraseña debe contener al menos un número, un carácter especial y letras.";
  }
  return null;
}

export function date(value) {
  if (!isEmpty(value) && !dayjs(dateAsDayjs(value)).isValid()) {
    return "Fecha invalida";
  }
  return null;
}

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
