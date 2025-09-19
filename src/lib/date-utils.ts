import { format, getTimezoneOffset, toDate, utcToZonedTime } from "date-fns-tz";

type GetFormattedTimezone = {
  dateString: string;
  timezone: string;
  formatString?: string;
  onlyDate?: boolean;
};

export const getFormattedTimezone = ({
  dateString,
  timezone,
  formatString = "yyyy-MM-dd HH:mm:ssxxx",
}: GetFormattedTimezone) => {
  if (dateString.length === 0) {
    return "";
  }

  const parsedDate = utcToZonedTime(toDate(dateString), timezone);

  return format(parsedDate, formatString, {
    timeZone: timezone,
  });
};

export const getTzOffset = (timezone: string) => {
  return getTimezoneOffset(timezone) / 1000 / 60 / 60;
};
