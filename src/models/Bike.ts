export class Bike {
  id?: string;
  brand?: string;
  model?: string;
  year?: string;
  localization?: number;
}

export enum StatusEnum {
  Available = 'DISPONIVEL',
  InUse = 'EM_USO',
  New = 'NOVA',
  Retired = 'APOSENTADA',
  SolicitedRepair = 'REPARO_SOLICITADO',
  InRepair = 'EM_REPARO',
}
