import dayjs from "dayjs";

export const getFormattedDatetime = (date) => {
    return dayjs(date).format("DD.MM.YYYY")
  }