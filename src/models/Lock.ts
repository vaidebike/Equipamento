export class Lock {
  id: string;
  model: string;
  year: number;
  status: string;
  localization: string;
}

export enum StatusEnum {
  Locked = 'OCUPADA', // OCUPADA VS DISPONÍVEL
  Excluded = 'EXCLUIDA',
  New = 'NOVA',
  OnRepair = 'EM_REPARO',
  Available = 'DISPONÍVEL',
  ToBeRepaired = 'REPARO_SOLICITADO',
}
