import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export function formatUTC(utcstring: string, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcstring).utcOffset(8).format(formatString)
}
