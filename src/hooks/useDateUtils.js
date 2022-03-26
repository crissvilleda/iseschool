import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export default function useDateUtils() {
  const dateAsTimestamp = (value) => {
    if (value && value.seconds && value.nanoseconds) {
      return new Timestamp(value.seconds, value.nanoseconds);
    } else {
      return Timestamp.fromDate(dayjs(value).toDate());
    }
  };

  const dateAsDayjs = (value) => {
    if (value && value.seconds && value.nanoseconds) {
      value = new Timestamp(value.seconds, value.nanoseconds).toDate();
      return dayjs(value);
    } else {
      return dayjs(value);
    }
  };
  return { dateAsDayjs, dateAsTimestamp };
}
