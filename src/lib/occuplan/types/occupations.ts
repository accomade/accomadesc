import type { DateTime } from "luxon";

interface Occupation {
  arrival: DateTime;
  leave: DateTime;
  type?: OccupationType | undefined;
}

interface OccupationType {
  name: string;
  backgroundColor: string;
  fontColor: string;
}

export type OccupationCallback = (occupation: Occupation) => void

export type { Occupation, OccupationType }