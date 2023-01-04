/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { v4 as uuid } from 'uuid';

export const createTotem = async (
  db: any,
  localization: string
): Promise<any | null> => {
  try {
    const newTotemID = uuid();

    await db.push('/tb_totem[]', {
      id: newTotemID,
      localization
    });

    const totemCreatedIndex = await db.getIndex('/tb_totem', newTotemID);
    const totemCreated = await db.getData(`/tb_totem[${totemCreatedIndex}]`);

    return totemCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const getTotens = async (db: any): Promise<any | null> => {
  try {
    const allTotens = await db.getData('/tb_totem');

    return allTotens;
  } catch (error) {
    return console.error(error);
  }
};

export const getBikesAtTotem = async (
  db: any,
  idTotem: string
): Promise<any | null> => {
  // TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  try {
    const numberOfLocksRelatedToTotens = await db.count('/rel_totem_tranca');
    const arrayOfLocks: any[] = [];
    for (let i = 0; i < numberOfLocksRelatedToTotens; i++) {
      const totemID = await db.getData(`/rel_totem_tranca[${i}]/idTotem`);
      if (totemID === idTotem) {
        const lockId = await db.getData(`/rel_totem_tranca[${i}]/idTranca`);
        const lockIndex = await db.getIndex('/tb_tranca', lockId);
        const lockData = await db.getData(`/tb_tranca[${lockIndex}]`);

        arrayOfLocks.push(lockData);
      }
    }
    return arrayOfLocks;
  } catch (error) {
    return console.error(error);
  }
};

export const getLocksAtTotem = async (
  db: any,
  idTotem: string
): Promise<any | null> => {
  try {
    const numberOfLocksRelatedToTotens = await db.count('/rel_totem_tranca');
    const arrayOfLocks: any[] = [];

    const totemIndex = await db.getIndex('/tb_totem', idTotem);

    if (totemIndex === -1) {
      return -1;
    }

    for (let i = 0; i < numberOfLocksRelatedToTotens; i++) {
      const totemID = await db.getData(`/rel_totem_tranca[${i}]/idTotem`);

      if (totemID === idTotem) {
        const lockId = await db.getData(`/rel_totem_tranca[${i}]/idTranca`);
        const lockIndex = await db.getIndex('/tb_tranca', lockId);

        const lockData = await db.getData(`/tb_tranca[${lockIndex}]`);

        arrayOfLocks.push(lockData);
      }
    }
    return arrayOfLocks;
  } catch (error) {
    return console.error(error);
  }
};

export const updateTotens = async (
  db: any,
  localization: string,
  id: string
): Promise<any | null> => {
  try {
    const totemIndex = await db.getIndex('/tb_totem', id);

    if (totemIndex === -1) {
      return -1;
    }

    const newLocalization = localization;
    await db.push(
      `/tb_totem[${totemIndex}]/localization`,
      newLocalization,
      true
    );

    const totem = await db.getData(`/tb_totem[${totemIndex}]`);
    return totem;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteTotem = async (db: any, id: string): Promise<any | null> => {
  try {
    const totemIndex = await db.getIndex('/tb_totem', id);

    if (totemIndex === -1) {
      return -1;
    }

    const totem = await db.delete(`/tb_totem[${totemIndex}]`);

    return totem;
  } catch (error) {
    return console.error(error);
  }
};
