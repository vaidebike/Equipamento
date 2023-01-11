/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { v4 as uuid } from 'uuid';

export const createLock = async (
  db: any,
  year: number,
  model: string,
  localization: string
): Promise<any | null> => {
  const newLockID = uuid();

  await db.push('/tb_tranca[]', {
    id: newLockID,
    year,
    model,
    localization,
    status: 'NOVA'
  });

  const lockCreatedIndex = await db.getIndex('/tb_tranca', newLockID);
  const lockCreated = await db.getData(`/tb_tranca[${lockCreatedIndex}]`);

  return lockCreated;
};

export const getLocks = async (db: any): Promise<any | null> => {
  const allLocks = await db.getData('/tb_tranca');

  return allLocks;
};

export const getLock = async (db: any, id: string): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', id);
  if (lockIndex === -1) {
    return -1;
  }
  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);
  return lock;
};

export const getBikeAtLockRel = async (
  db: any,
  idTranca: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', idTranca);
  if (lockIndex === -1) {
    return -1;
  }

  const lockIndexOnRel = await db.getIndex(
    '/rel_tranca_bicicleta',
    idTranca,
    'idTranca'
  );

  if (lockIndexOnRel === -1) {
    return -500;
  }

  const relLockBike = await db.getData(
    `/rel_tranca_bicicleta[${lockIndexOnRel}]`
  );

  const bikeId = relLockBike.idBicicleta;

  const bikeIndex = await db.getIndex('/tb_bicicleta', bikeId);

  const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

  return bike;
};

export const updateLocks = async (
  db: any,
  year: number,
  model: string,
  localization: string,
  id: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', id);

  if (lockIndex === -1) {
    return -1;
  }

  const newYear = year;
  await db.push(`/tb_tranca[${lockIndex}]/year`, newYear, true);

  const newModel = model;
  await db.push(`/tb_tranca[${lockIndex}]/model`, newModel, true);

  const newLocalization = localization;
  await db.push(`/tb_tranca[${lockIndex}]/localization`, newLocalization, true);

  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);
  return lock;
};

export const postLocklock = async (
  db: any,
  idTranca: string,
  idBicicleta: string
): Promise<any | null> => {
  if (idBicicleta !== null && idBicicleta !== undefined) {
    const lockIndex = await db.getIndex('/tb_tranca', idTranca);
    const bikeIndex = await db.getIndex('/tb_bicicleta', idBicicleta);
    if (lockIndex === -1) {
      return -1;
    }

    const lock = await db.getData(`/tb_tranca[${lockIndex}]`);

    if (lock.status === 'OCUPADA') {
      return -200;
    }

    if (lock.status !== 'DISPONÍVEL') {
      return -400;
    }

    if (bikeIndex === -1) {
      return -1;
    }

    const bike = await db.getData(`/tb_bicicleta[${bikeIndex}]`);

    if (
      bike.status !== 'EM_USO' &&
      bike.status !== 'EM_REPARO' &&
      bike.status !== 'NOVA'
    ) {
      return -300;
    }

    const bikeIndexOnRel = await db.getIndex(
      '/rel_tranca_bicicleta',
      idBicicleta,
      'idBicicleta'
    );

    if (bikeIndexOnRel !== -1) {
      return -600;
    }

    await db.push(`/tb_tranca[${lockIndex}]/status`, 'OCUPADA', true);

    await db.push(`/tb_bicicleta[${bikeIndex}]/status`, 'DISPONÍVEL', true);

    await db.push('/rel_tranca_bicicleta[]', {
      idTranca,
      idBicicleta
    });

    return lock;
  } else {
    const lockIndex = await db.getIndex('/tb_tranca', idTranca);

    if (lockIndex === -1) {
      return -1;
    }

    const lock = await db.getData(`/tb_tranca[${lockIndex}]`);

    if (lock.status === 'OCUPADA') {
      return -200;
    }

    if (lock.status !== 'DISPONÍVEL') {
      return -400;
    }

    await db.push(`/tb_tranca[${lockIndex}]/status`, 'OCUPADA', true);

    return lock;
  }
};

export const postUnlocklock = async (
  db: any,
  idTranca: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', idTranca);

  if (lockIndex === -1) {
    return -1;
  }

  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);

  if (lock.status !== 'OCUPADA') {
    return -200;
  }

  const lockIndexOnRel = await db.getIndex(
    '/rel_tranca_bicicleta',
    idTranca,
    'idTranca'
  );

  const lockOnRel = await db.getData(
    `/rel_tranca_bicicleta[${lockIndexOnRel}]`
  );

  const idBicicleta = lockOnRel.idBicicleta;

  const bikeIndex = await db.getIndex('/tb_tranca', idBicicleta);

  await db.push(`/tb_bicicleta[${bikeIndex}]/status`, 'EM_USO', true);

  await db.push(`/tb_tranca[${lockIndex}]/status`, 'DISPONÍVEL', true);

  await db.delete(`/rel_tranca_bicicleta[${lockIndexOnRel}]`);

  return lock;
};

export const deleteLock = async (db: any, id: string): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', id);

  if (lockIndex === -1) {
    return -1;
  }

  const lock = await db.push(
    `/tb_tranca[${lockIndex}]/status`,
    'EXCLUIDA',
    true
  );

  return lock;
};

export const updateLockStatus = async (
  db: any,
  id: string,
  acao: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', id);

  if (lockIndex === -1) {
    return -1;
  }

  const newStatus = acao;
  await db.push(`/tb_tranca[${lockIndex}]/status`, newStatus, true);

  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);
  return lock;
};

export const addRelLockToTotem = async (
  db: any,
  idTotem: string,
  idTranca: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', idTranca);

  if (lockIndex === -1) {
    return -1;
  }

  const lockIndexOnRel = await db.getIndex(
    '/rel_totem_tranca',
    idTranca,
    'idTranca'
  );

  if (lockIndexOnRel !== -1) {
    // SE A TRANCA JÁ ESTIVER RELACIONADA A UM TOTEM
    return -600;
  }

  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);

  if (lock.status !== 'NOVA' && lock.status !== 'EM_REPARO') {
    // SE A TRANCA NÃO ESTIVER COM STATUS NOVA OU EM REPARO
    return -500;
  }

  const totemIndex = await db.getIndex('/tb_totem', idTotem);

  if (totemIndex === -1) {
    return -1;
  }

  await db.push(`/tb_tranca[${lockIndex}]/status`, 'DISPONÍVEL', true);

  await db.push('/rel_totem_tranca[]', {
    idTotem,
    idTranca
  });

  return lock;
};

export const deleteRelLockToTotem = async (
  db: any,
  idTotem: string,
  idTranca: string,
  acao: string
): Promise<any | null> => {
  const lockIndex = await db.getIndex('/tb_tranca', idTranca);

  const lock = await db.getData(`/tb_tranca[${lockIndex}]`);

  if (lockIndex === -1) {
    // TRANCA NÃO EXISTE
    return -1;
  }

  if (lock.status !== 'REPARO_SOLICITADO') {
    // TRANCA SEM REPARO SOLICITADO
    return -500;
  }

  const lockIndexOnRel = await db.getIndex(
    '/rel_totem_tranca',
    idTranca,
    'idTranca'
  );

  if (lockIndexOnRel === -1) {
    // SE A TRANCA NÃO ESTIVER RELACIONADA A NENHUM TOTEM
    return -600;
  }

  const trancaIndexOnRel = await db.getIndex(
    '/rel_tranca_bicicleta',
    idTranca,
    'idTranca'
  );

  if (trancaIndexOnRel !== -1) {
    // SE A TRANCA ESTIVER COM UMA BICICLETA
    return -700;
  }

  await db.delete(`/rel_totem_tranca[${lockIndexOnRel}]`);

  const newStatus = acao;

  await db.push(`/tb_tranca[${lockIndex}]/status`, newStatus, true);

  return lock;
};
