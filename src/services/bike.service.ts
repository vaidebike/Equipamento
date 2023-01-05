/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { v4 as uuid } from 'uuid';

export const createBike = async (
  db: any,
  brand: string,
  model: string,
  year: number,
  localization: string
): Promise<any | null> => {
  try {
    const newBikeID = uuid();

    await db.push('/tb_bicicleta[]', {
      id: newBikeID,
      brand,
      model,
      year,
      status: 'NOVA',
      localization
    });

    const bikeCreatedIndex = await db.getIndex('/tb_bicicleta', newBikeID);
    const bikeCreated = await db.getData(`/tb_bicicleta[${bikeCreatedIndex}]`);

    return bikeCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const addRelBikeToLock = async (
  db: any,
  idTranca: string,
  idBicicleta: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', idBicicleta);

  if (bikeIndex === -1) {
    return -1;
  }

  const bikeIndexOnRel = await db.getIndex(
    '/rel_tranca_bicicleta',
    idBicicleta,
    'idBicicleta'
  );

  if (bikeIndexOnRel !== -1) {
    // SE A BICICLETA JÁ ESTIVER RELACIONADA A UMA TRANCA
    return -600;
  }

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

  if (
    bike.status !== 'NOVA' &&
    bike.status !== 'EM_REPARO' &&
    bike.status !== 'EM_USO'
  ) {
    // SE A BICICLETA NÃO ESTIVER COM STATUS NOVA OU EM REPARO OU EM USO
    return -500;
  }

  const trancaIndex = await db.getIndex('/tb_tranca', idTranca);

  if (trancaIndex === -1) {
    return -1;
  }

  const lock = await db.getData(`/tb_tranca[${trancaIndex}]`);

  if (lock.status !== 'DISPONÍVEL') {
    // SE A BICICLETA NÃO ESTIVER COM STATUS DISPONÍVEL
    return -700;
  }

  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, 'DISPONÍVEL', true);

  await db.push(`/tb_tranca[${trancaIndex}]/status`, 'OCUPADA', true);

  await db.push('/rel_tranca_bicicleta[]', {
    idTranca,
    idBicicleta
  });

  return bike;
};

export const deleteRelBikeToLock = async (
  db: any,
  idTranca: string,
  idBicicleta: string,
  acao: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', idBicicleta);

  const trancaIndex = await db.getIndex('/tb_tranca', idTranca);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

  if (bikeIndex === -1) {
    // BICICLETA NÃO EXISTE
    return -1;
  }

  if (trancaIndex === -1) {
    // TRANCA NÃO EXISTE
    return -1;
  }

  if (bike.status !== 'REPARO_SOLICITADO') {
    // BICICLETA SEM REPARO SOLICITADO
    return -500;
  }

  const bikeIndexOnRel = await db.getIndex(
    '/rel_tranca_bicicleta',
    idBicicleta,
    'idBicicleta'
  );

  if (bikeIndexOnRel === -1) {
    // SE A BICICLETA NÃO ESTIVER RELACIONADA A NENHUMA TRANCA
    return -600;
  }

  await db.delete(`/rel_tranca_bicicleta[${bikeIndexOnRel}]`);

  const newStatus = acao;

  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, newStatus, true);

  await db.push(`/tb_tranca[${trancaIndex}]/status`, 'DISPONÍVEL', true);

  return bike;
};

export const getBikes = async (db: any): Promise<any | null> => {
  const allBikes = await db.getData('/tb_bicicleta');
  return allBikes;
};

export const getBike = async (db: any, id: string): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', id);

  if (bikeIndex === -1) {
    return -1;
  }
  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};

export const deleteBike = async (db: any, id: string): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', id);

  if (bikeIndex === -1) {
    return -1;
  }

  const bike = await db.push(
    `/tb_bicicleta[${bikeIndex}]/status`,
    'EXCLUIDA',
    true
  );

  return bike;
};

export const updateBikes = async (
  db: any,
  brand: string,
  model: string,
  year: number,
  localization: string,
  id: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', id);

  if (bikeIndex === -1) {
    return -1;
  }

  const newBrand = brand;
  await db.push(`/tb_bicicleta[${bikeIndex}]/brand`, newBrand, true);

  const newModel = model;
  await db.push(`/tb_bicicleta[${bikeIndex}]/model`, newModel, true);

  const newYear = year;
  await db.push(`/tb_bicicleta[${bikeIndex}]/year`, newYear, true);

  const newLocalization = localization;
  await db.push(
    `/tb_bicicleta[${bikeIndex}]/localization`,
    newLocalization,
    true
  );

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};

export const updateBikeStatus = async (
  db: any,
  id: string,
  acao: string
): Promise<any | null> => {
  const bikeIndex = await db.getIndex('/tb_bicicleta', id);

  if (bikeIndex === -1) {
    return -1;
  }

  const newStatus = acao;
  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, newStatus, true);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);
  return bike;
};
