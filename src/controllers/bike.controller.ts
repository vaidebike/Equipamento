/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { db } from '../app';

import { ok, created, notFound, badRequest } from '../helpers/responseHelpers';

import {
  createBike,
  getBikes,
  getBike,
  deleteBike,
  updateBikes,
  updateBikeStatus,
  addRelBikeToLock,
  deleteRelBikeToLock,
  getBikeRentedByCyclist
} from '../services/bike.service';

import { StatusEnum } from '../models/Bike';

export const listBikes = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const bikes = await getBikes(db);
  return ok(res, bikes);
};

export const bikeRentedBy = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;
  const bike = await getBikeRentedByCyclist(db, id);
  return ok(res, bike);
};

export const listBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  const bike = await getBike(db, id);
  if (bike === -1) {
    return notFound(res, 'Bike not found');
  }

  return ok(res, bike);
};

export const excludeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  const bike = await deleteBike(db, id);

  if (bike === -1) {
    return notFound(res, 'Bike not found');
  }

  return ok(res, bike);
};

export const registerBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { brand, model, year, localization } = req.body;

  if (!brand || !model || !year || !localization) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof brand !== 'string' ||
    typeof model !== 'string' ||
    typeof localization !== 'string' ||
    typeof year !== 'number'
  ) {
    return badRequest(res, 'Invalid fields');
  }

  const bike = await createBike(db, brand, model, year, localization);
  return created(res, bike);
};

export const addBikeToVaDeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { idTranca, idBicicleta } = req.body;

  if (!idTranca || !idBicicleta) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof idTranca !== 'string' || typeof idBicicleta !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  const bike = await addRelBikeToLock(db, idTranca, idBicicleta);

  if (bike === -1) {
    return notFound(res, 'Bike or Lock not found');
  }

  if (bike === -500) {
    return badRequest(res, 'Bike must be new or in repair');
  }

  if (bike === -600) {
    return badRequest(res, 'Bike already belongs to a Lock');
  }

  if (bike === -700) {
    return badRequest(res, 'Lock must be available');
  }

  return created(res, bike);
};

export const removeBikeFromVaDeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { idTranca, idBicicleta, acao } = req.body;

  if (!idTranca || !idBicicleta || !acao) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof idTranca !== 'string' ||
    typeof idBicicleta !== 'string' ||
    typeof acao !== 'string'
  ) {
    return badRequest(res, 'Invalid fields');
  } else if (acao !== 'EM_REPARO' && acao !== 'APOSENTADA') {
    return badRequest(res, 'Action invalid');
  }

  const bike = await deleteRelBikeToLock(db, idTranca, idBicicleta, acao);

  if (bike === -1) {
    return notFound(res, 'Bike or Lock not found');
  }

  if (bike === -600) {
    return badRequest(res, 'Bike out of locks');
  }

  if (bike === -500) {
    return badRequest(res, 'Bike must have status as solicited repair');
  }

  return ok(res, bike);
};

export const updateBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;
  const { brand, model, year, localization } = req.body;

  if (!brand || !model || !year || !localization) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof brand !== 'string' ||
    typeof model !== 'string' ||
    typeof localization !== 'string' ||
    typeof year !== 'number'
  ) {
    return badRequest(res, 'Invalid fields');
  }

  const bike = await updateBikes(db, brand, model, year, localization, id);

  if (bike === -1) {
    return notFound(res, 'Bike not found');
  }

  return ok(res, bike);
};

export const changeStatus = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id, acao } = req.params;

  if (!Object.values(StatusEnum).includes(acao as StatusEnum)) {
    return badRequest(res, 'Invalid status');
  }

  const bike = await updateBikeStatus(db, id, acao);

  if (bike === -1) {
    return notFound(res, 'Bike not found');
  }

  return ok(res, bike);
};
