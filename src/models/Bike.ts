export class Bike {
  id: string;
  marca: string;
  modelo: string;
  status: string;
  ano: number;
  localizacao: string;
}

export enum StatusEnum {
  Available = 'DISPONIVEL',
  InUse = 'EM_USO',
  New = 'NOVA',
  Retired = 'APOSENTADA',
  SolicitedRepair = 'REPARO_SOLICITADO',
  InRepair = 'EM_REPARO',
}
