import { type DateTime, DateTime as luxon } from 'luxon';

export type DebounceFunction = () => Promise<boolean>;
export interface DebounceConfig {
  initialDelay: number;
  debounceDelay: number;
}

export const DefaultDebounceConfig: DebounceConfig = {
  initialDelay: 0,
  debounceDelay: 10000,
};

let updateTimestamps: Record<string, DateTime> = {};
let nextUpdates: Record<string, DebounceFunction> = {};
let scheduled: Record<string, boolean> = {};

export const debounce = async (
  id: string,
  func: DebounceFunction,
  config: DebounceConfig = DefaultDebounceConfig,
): Promise<boolean> => {
  //console.log(`DEBOUNCE: ${id}`)
  nextUpdates[id] = func;
  return doDebounce(id, true, config);
};

const doDebounce = async (
  id: string,
  firstRun: boolean,
  config: DebounceConfig,
): Promise<boolean> => {
  const now = luxon.utc();
  const priorExecTime = updateTimestamps[id];

  //no prior timestamp, execute and store timestamp
  if (!priorExecTime) {
    if (firstRun && config.initialDelay > 0) {
      setTimeout(() => {
        return doDebounce(id, false, config);
      }, config.initialDelay + 10);
    } else {
      const result = await nextUpdates[id]();
      updateTimestamps[id] = now;
      //console.log('INITIAL')
      return result;
    }
  }

  //last execution was more than debounceDelay ms ago
  else if (priorExecTime < now.minus({ milliseconds: config.debounceDelay })) {
    const result = await nextUpdates[id]();
    updateTimestamps[id] = now;
    //console.log('DUE')
    return result;
  }

  //else retry after timeout
  else if (firstRun && !scheduled[id]) {
    //console.log('SCHEDULE')
    scheduled[id] = true;
    setTimeout(() => {
      //console.log('RETRY')
      scheduled[id] = false;
      return doDebounce(id, false, config);
    }, config.debounceDelay + 10);
  }

  return false;
};

