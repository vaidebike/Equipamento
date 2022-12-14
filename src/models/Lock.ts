export class Lock {
  id?: string;
  model?: string;
  year?: string;
  status?: string;
  localization?: number;
}

export enum StatusEnum {
  Unlocked = 'DESTRANCADA',
  Locked = 'TRANCADA',
}
