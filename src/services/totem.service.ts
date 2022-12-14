/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { db } from '../app';
import { v4 as uuid } from 'uuid';

export const createTotem = async (
  localization: string
): Promise<any | null> => {
  try {
    const newTotemID = uuid();

    await db.push('/totens[]', {
      id: newTotemID,
      localization
    });

    const totemCreatedIndex = await db.getIndex('/totens', newTotemID);
    const totemCreated = await db.getData(`/totens[${totemCreatedIndex}]`);

    return totemCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const getTotens = async (): Promise<any | null> => {
  try {
    const allTotens = await db.getData('/totens');

    return allTotens;
  } catch (error) {
    return console.error(error);
  }
};

export const updateTotens = async (
  localization: string,
  id: string
): Promise<any | null> => {
  try {
    const totemIndex = await db.getIndex('/totens', id);

    if (totemIndex === -1) {
      return -1;
    }

    const newLocalization = localization;
    await db.push(`/totens[${totemIndex}]/localization`, newLocalization, true);

    const totem = await db.getData(`/totens[${totemIndex}]`);
    return totem;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteTotem = async (id: string): Promise<any | null> => {
  try {
    const totemIndex = await db.getIndex('/totens', id);

    if (totemIndex === -1) {
      return -1;
    }

    const totem = await db.delete(`/totens[${totemIndex}]`);

    return totem;
  } catch (error) {
    return console.error(error);
  }
};
