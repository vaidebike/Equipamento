export class Lock {
  id: string;
  model: string;
  year: number;
  status: string;
  localization: string;
}

export enum StatusEnum {
  Unlocked = 'DESTRANCADA',
  Locked = 'TRANCADA',
}
