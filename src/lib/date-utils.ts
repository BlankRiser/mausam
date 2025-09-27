import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

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

  const tzDate = TZDate.tz(timezone, dateString);

  return format(tzDate, formatString);
};

export const getTzOffset = (timezone: string) => {
  const tzDate = TZDate.tz(timezone);
  const utcDate = new Date(tzDate.getTime());
  
  return (utcDate.getTimezoneOffset() - tzDate.getTimezoneOffset()) / 60;
};
