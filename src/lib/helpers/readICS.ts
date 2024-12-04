import type { DateTime } from 'luxon';
import { DateTime as lx } from 'luxon';
import type { OccupationCallback, OccupationType } from '$lib/occuplan/state.svelte.js';

export interface GetEventsResult {
  message: string;
  code: number;
  error: boolean;
}

const extractOccupationType = (line: string): OccupationType => {
  try {
    const oTypes = line.split('CATEGORIES:')[1];
    const [first] = oTypes.split(',');
    return first.trim() as OccupationType;
  } catch (e) {
    console.log('Error occured extracting occupation type from line', line);
  }
  return 'one';
};

const readIcsFromResponse = async (resp: Response, eventCallback: OccupationCallback) => {
  const text = await resp.text();
  //console.log(text)

  let insideEvent = false;
  let arrival = '';
  let leave = '';
  let oType: OccupationType = 'one';
  text.split(/\r?\n/).forEach((line) => {
    switch (true) {
      case /^BEGIN:VEVENT$/.test(line):
        insideEvent = true;
        break;
      case /^DTSTART;VALUE=.*/.test(line) && insideEvent:
        arrival = line;
        break;
      case /^DTEND;VALUE=.*/.test(line) && insideEvent:
        leave = line;
        break;
      case /^CATEGORIES:.*$/.test(line) && insideEvent:
        oType = extractOccupationType(line);
        break;
      case /^END:VEVENT$/.test(line) && insideEvent:
        insideEvent = false;
        eventCallback({
          type: oType,
          arrival: getDate(arrival),
          leave: getDate(leave),
        });
        break;
    }
  });
};

export const getEvents = async (
  url: string,
  eventCallback: OccupationCallback,
): Promise<GetEventsResult> => {
  let result: GetEventsResult = {
    message: 'undefined',
    code: 100,
    error: false,
  };

  let resp: Response;
  try {
    resp = await fetch(url, {
      headers: {
        Accept: 'text/calendar',
      },
      //mode: "no-cors"
    });
    result = {
      message: resp.statusText,
      code: resp.status,
      error: resp.status > 299 ? true : false,
    };

    if (resp.status > 299) return result;

    await readIcsFromResponse(resp, eventCallback);
  } catch (e) {
    console.log('Error occured while fetching events from proxy via calUrl:', e);

    return {
      message: `Fetch threw error: ${e}`,
      code: 500,
      error: true,
    };
  }

  return result;
};

const getDate = (icsLine: string): DateTime => {
  //e.g. DTEND;VALUE=DATE:20260818
  const [typePart, valuePart] = icsLine.split('=');

  const dateString = valuePart.split(':')[1];
  let rawDateTime = lx.fromISO(dateString);

  //end date has to be moved back when whole day ending
  if (/^DTEND;VALUE$/.test(typePart)) {
    if (
      rawDateTime.hour == 0 &&
      rawDateTime.minute == 0 &&
      rawDateTime.second == 0 &&
      rawDateTime.millisecond == 0
    ) {
      rawDateTime = rawDateTime.plus({ hour: 12 });
    }
  }

  //normalize to noon
  return rawDateTime.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
};

