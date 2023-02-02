export class Lock {
  id: string;
  modelo: string;
  ano: number;
  numero: number;
  status: string;
  localizacao: string;
}

export enum StatusEnum {
  Locked = 'OCUPADA', // OCUPADA VS DISPONÍVEL
  Excluded = 'EXCLUIDA',
  New = 'NOVA',
  OnRepair = 'EM_REPARO',
  Available = 'DISPONÍVEL',
  ToBeRepaired = 'REPARO_SOLICITADO',
}
