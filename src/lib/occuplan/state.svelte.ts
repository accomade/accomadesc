import { debounce } from '$lib/helpers/debounce.ts';
import { normalizeDate } from '$lib/helpers/normalizeDate.ts';
import { getEvents } from '$lib/helpers/readICS.ts';
import type { DateTime } from 'luxon';
import { DateTime as luxon } from 'luxon';

export interface AvailableSpans {
  [key: number]: DateTime | null;
}

export interface Occupation {
  arrival: DateTime;
  leave: DateTime;
  type?: OccupationType | undefined;
}
export interface OccupationType {
  name: string;
  backgroundColor: string;
  fontColor: string;
}
export type OccupationCallback = (occupation: Occupation) => void;

export class OccupationState {
  public iCalURL: string;
  public occupiedDays: Record<string, boolean> = {};

  constructor(iCalURL: string) {
    this.iCalURL = iCalURL;
    this.loadOccupations();
  }

  private loadOccupations = () => {
    if (this.iCalURL) {
      debounce(
        this.iCalURL,
        async (): Promise<boolean> => {
          if (this.iCalURL) {
            const eventsResult = await getEvents(this.iCalURL, this.eventsIncomingCallback);
            return !eventsResult.error;
          }
          return false;
        },
        { initialDelay: 200, debounceDelay: 5000 },
      );
    }
  };

  private eventsIncomingCallback = (o: Occupation) => {
    this.updateOccupiedDays(o);
  };

  public updateOccupiedDays = (o: Occupation) => {
    let startDate = o.arrival;
    let endDate = o.leave;

    if (o.arrival > o.leave) {
      startDate = o.leave;
      endDate = o.arrival;
    }

    let cDate = startDate;
    while (cDate < endDate) {
      const key = `${cDate.year}-${cDate.month}-${cDate.day}`;
      this.occupiedDays[key] = true;
      cDate = cDate.plus({ days: 1 });
    }
  };

  public calcAvailability = (search: number[], maxFutureDate: DateTime): AvailableSpans => {
    let av: AvailableSpans = search.reduce((acc, num) => {
      acc[num] = null;
      return acc;
    }, {} as AvailableSpans);

    let foundFirst = false;
    let firstDate: DateTime;
    let consecutive = 0;

    let d = normalizeDate(luxon.utc());
    while (d <= maxFutureDate) {
      const key = `${d.year}-${d.month}-${d.day}`;
      if (this.occupiedDays[key]) {
        foundFirst = false;
        consecutive = 0;
      } else {
        if (foundFirst) {
          consecutive++;

          search.forEach((n) => {
            if (consecutive >= n && av[n] == null) {
              av[n] = firstDate;
            }
          });

          let foundAll = true;
          search.forEach((num) => {
            if (!av[num]) {
              foundAll = false;
            }
          });

          if (foundAll) break;
        } else {
          foundFirst = true;
          firstDate = d;
        }
      }

      d = d.plus({ day: 1 });
    }
    return av;
  };
}
