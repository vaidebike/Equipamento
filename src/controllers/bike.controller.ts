/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import {
  ok,
  created,
  serverError,
  notFound,
  badRequest
} from '../helpers/responseHelpers';

import {
  createBike,
  getBikes,
  getBike,
  deleteBike,
  updateBikes,
  updateBikeStatus
} from '../services/bike.service';

import { StatusEnum } from '../models/Bike';

export const listBikes = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const bikes = await getBikes();
    return ok(res, bikes);
  } catch (error) {
    return serverError(res, error);
  }
};

export const listBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;

    const bike = await getBike(id);
    if (bike === -1) {
      return notFound(res, 'Bike not found');
    }

    return ok(res, bike);
  } catch (error) {
    return serverError(res, error);
  }
};

export const excludeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;

    const bike = await deleteBike(id);

    if (bike === -1) {
      return notFound(res, 'Bike not found');
    }

    return ok(res, bike);
  } catch (error) {
    return serverError(res, error);
  }
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

  try {
    const bike = await createBike(brand, model, year, localization);
    return created(res, bike);
  } catch (error) {
    return serverError(res, error);
  }
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

  try {
    const bike = await updateBikes(brand, model, year, localization, id);

    if (bike === -1) {
      return notFound(res, 'Bike not found');
    }

    return ok(res, bike);
  } catch (error) {
    return serverError(res, error);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id, acao } = req.params;

  if (!Object.values(StatusEnum).includes(acao as StatusEnum)) {
    return badRequest(res, 'Invalid status');
  }

  try {
    const bike = await updateBikeStatus(id, acao);

    if (bike === -1) {
      return notFound(res, 'Bike not found');
    }

    return ok(res, bike);
  } catch (error) {
    return serverError(res, error);
  }
};
