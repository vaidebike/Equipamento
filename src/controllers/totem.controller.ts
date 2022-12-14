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
  createTotem,
  getTotens,
  deleteTotem,
  updateTotens
} from '../services/totem.service';

export const listTotens = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const totens = await getTotens();
    return ok(res, totens);
  } catch (error) {
    return serverError(res, error);
  }
};

export const registerTotem = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { localization } = req.body;

  if (!localization) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof localization !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  try {
    const totem = await createTotem(localization);
    return created(res, totem);
  } catch (error) {
    return serverError(res, error);
  }
};

export const updateTotem = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;
  const { localization } = req.body;

  if (!localization) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof localization !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  try {
    const totem = await updateTotens(localization, id);

    if (totem === -1) {
      return notFound(res, 'Totem not found');
    }

    return ok(res, totem);
  } catch (error) {
    return serverError(res, error);
  }
};

export const excludeTotem = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;

    const totem = await deleteTotem(id);

    if (totem === -1) {
      return notFound(res, 'Totem not found');
    }

    return ok(res, totem);
  } catch (error) {
    return serverError(res, error);
  }
};
