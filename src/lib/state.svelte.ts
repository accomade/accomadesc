export const GLOBAL_STATE = Symbol('GLOBAL_STATE');

export class GlobalState {
  disableLinks = $state(false);

  constructor(disableLinks: boolean) {
    this.disableLinks = disableLinks;
  }
}
