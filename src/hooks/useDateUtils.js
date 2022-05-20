import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export default function useDateUtils() {
  const dateAsTimestamp = (value = undefined) => {
    if (value === undefined) {
      return Timestamp.fromDate(dayjs().toDate());
    } else if (value && value.seconds && value.nanoseconds) {
      return new Timestamp(value.seconds, value.nanoseconds);
    } else {
      return Timestamp.fromDate(dayjs(value).toDate());
    }
  };

  const dateAsDayjs = (value) => {
    if (value && value.seconds && value.nanoseconds) {
      value = new Timestamp(value.seconds, value.nanoseconds).toDate();
      return dayjs(value);
    } else if (value && dayjs(value).isValid()) {
      return dayjs(value);
    } else {
      return null;
    }
  };
  const getDate = (value) => {
    const date = dateAsDayjs(value);
    if (date) return date.format("DD/MM/YYYY");
    return "";
  };
  return { dateAsDayjs, dateAsTimestamp, getDate };
}
