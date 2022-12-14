import { db } from '../app';
import { v4 as uuid } from 'uuid';

export const createLock = async (
  year: number,
  model: string,
  localization: string
): Promise<any | null> => {
  try {
    const newLockID = uuid();

    await db.push('/locks[]', {
      id: newLockID,
      year,
      model,
      localization,
      status: 'NOVA',
      bicicleta: null
    });

    const lockCreatedIndex = await db.getIndex('/locks', newLockID);
    const lockCreated = await db.getData(`/locks[${lockCreatedIndex}]`);

    return lockCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const getLocks = async (): Promise<any | null> => {
  try {
    const allLocks = await db.getData('/locks');

    return allLocks;
  } catch (error) {
    return console.error(error);
  }
};

export const getLock = async (id: string): Promise<any | null> => {
  try {
    const lockIndex = await db.getIndex('/locks', id);
    if (lockIndex === -1) {
      return -1;
    }
    const lock = await db.getData(`/locks[${lockIndex}]`);
    return lock;
  } catch (error) {
    return console.error(error);
  }
};

export const updateLocks = async (
  year: number,
  model: string,
  localization: string,
  id: string
): Promise<any | null> => {
  try {
    const lockIndex = await db.getIndex('/locks', id);

    if (lockIndex === -1) {
      return -1;
    }

    const newYear = year;
    await db.push(`/locks[${lockIndex}]/year`, newYear, true);

    const newModel = model;
    await db.push(`/locks[${lockIndex}]/model`, newModel, true);

    const newLocalization = localization;
    await db.push(`/locks[${lockIndex}]/localization`, newLocalization, true);

    const lock = await db.getData(`/locks[${lockIndex}]`);
    return lock;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteLock = async (id: string): Promise<any | null> => {
  try {
    const lockIndex = await db.getIndex('/locks', id);

    if (lockIndex === -1) {
      return -1;
    }

    const lock = await db.push(`/locks[${lockIndex}]/status`, 'EXCLUIDA', true);

    return lock;
  } catch (error) {
    return console.error(error);
  }
};

export const updateLockStatus = async (
  id: string,
  acao: string
): Promise<any | null> => {
  try {
    const lockIndex = await db.getIndex('/locks', id);

    if (lockIndex === -1) {
      return -1;
    }

    const newStatus = acao;
    await db.push(`/locks[${lockIndex}]/status`, newStatus, true);

    const lock = await db.getData(`/locks[${lockIndex}]`);
    return lock;
  } catch (error) {
    return console.error(error);
  }
};
