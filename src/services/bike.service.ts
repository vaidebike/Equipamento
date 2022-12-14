/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { db } from '../app';
import { v4 as uuid } from 'uuid';

export const createBike = async (
  brand: string,
  model: string,
  year: number,
  localization: string
): Promise<any | null> => {
  try {
    const newBikeID = uuid();

    await db.push('/bikes[]', {
      id: newBikeID,
      brand,
      model,
      year,
      status: 'nova',
      localization
    });

    const bikeCreatedIndex = await db.getIndex('/bikes', newBikeID);
    const bikeCreated = await db.getData(`/bikes[${bikeCreatedIndex}]`);

    return bikeCreated;
  } catch (error) {
    return console.error(error);
  }
};

export const getBikes = async (): Promise<any | null> => {
  try {
    const allBikes = await db.getData('/bikes');

    return allBikes;
  } catch (error) {
    return console.error(error);
  }
};

export const getBike = async (id: string): Promise<any | null> => {
  try {
    const bikeIndex = await db.getIndex('/bikes', id);
    if (bikeIndex === -1) {
      return -1;
    }
    const bike = await db.getData(`/bikes[${bikeIndex}]`);
    return bike;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteBike = async (id: string): Promise<any | null> => {
  try {
    const bikeIndex = await db.getIndex('/bikes', id);

    if (bikeIndex === -1) {
      return -1;
    }

    const bike = await db.push(`/bikes[${bikeIndex}]/status`, 'excluída', true);

    return bike;
  } catch (error) {
    return console.error(error);
  }
};

export const updateBikes = async (
  brand: string,
  model: string,
  year: number,
  localization: string,
  id: string
): Promise<any | null> => {
  try {
    const bikeIndex = await db.getIndex('/bikes', id);

    if (bikeIndex === -1) {
      return -1;
    }

    const newBrand = brand;
    await db.push(`/bikes[${bikeIndex}]/brand`, newBrand, true);

    const newModel = model;
    await db.push(`/bikes[${bikeIndex}]/model`, newModel, true);

    const newYear = year;
    await db.push(`/bikes[${bikeIndex}]/year`, newYear, true);

    const newLocalization = localization;
    await db.push(`/bikes[${bikeIndex}]/localization`, newLocalization, true);

    const bike = await db.getData(`/bikes[${bikeIndex}]`);
    return bike;
  } catch (error) {
    return console.error(error);
  }
};

export const updateBikeStatus = async (
  id: string,
  acao: string
): Promise<any | null> => {
  try {
    const bikeIndex = await db.getIndex('/bikes', id);

    if (bikeIndex === -1) {
      return -1;
    }

    const newStatus = acao;
    await db.push(`/bikes[${bikeIndex}]/status`, newStatus, true);

    const bike = await db.getData(`/bikes[${bikeIndex}]`);
    return bike;
  } catch (error) {
    return console.error(error);
  }
};
