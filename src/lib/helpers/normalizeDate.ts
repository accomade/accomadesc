import { DateTime as luxon } from 'luxon';
import type { DateTime } from 'luxon';

export const normalizeDate = (date?: any): DateTime => {
  //initialize default return values, for the case the input is not
  //"normalizable"

  const nowUTC = luxon.utc().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });

  //no parameter or falsy
  if (!date) {
    return nowUTC;
  }

  //parameter is an instance of date;
  if (date instanceof Date) {
    // but invalid
    if (Number.isNaN(Number(date))) {
      return nowUTC;
    }

    return luxon.utc(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12);
  }

  //otherwise try different parsing methods
  let pDate;

  //check if it's already a numeric value, assuming millis from start of time
  if (Number.isInteger(date)) {
    pDate = luxon.fromMillis(date);
    if (pDate.isValid) {
      return luxon.utc(pDate.year, pDate.month, pDate.day, 12);
    }
  }

  //check if it has a valueOf function and if that function yields an integer
  if (typeof date.valueOf === 'function' && Number.isInteger(date.valueOf())) {
    pDate = luxon.fromMillis(date.valueOf());
    if (pDate.isValid) {
      return luxon.utc(pDate.year, pDate.month, pDate.day, 12);
    }
  }

  //parse it, as if it is an ISO string
  pDate = luxon.fromISO(date, { setZone: true });
  if (pDate.isValid) {
    return luxon.utc(pDate.year, pDate.month, pDate.day, 12);
  }

  //parse it, as if it is in HTTP format
  //@ts-ignore
  pDate = luxon.fromHTTP(date, { setZone: true });
  if (pDate.isValid) {
    return luxon.utc(pDate.year, pDate.month, pDate.day, 12);
  }

  //parse it, as if it is in SQL format
  //@ts-ignore
  pDate = luxon.fromSQL(date, { setZone: true });
  if (pDate.isValid) {
    return luxon.utc(pDate.year, pDate.month, pDate.day, 12);
  }

  //if nothing helps, return today at noon GMT
  return nowUTC;
};
