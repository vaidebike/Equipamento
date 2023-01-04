/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { db } from '../app';

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
  updateTotens,
  getLocksAtTotem,
  getBikesAtTotem
} from '../services/totem.service';

export const listTotens = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const totens = await getTotens(db);
    return ok(res, totens);
  } catch (error) {
    return serverError(res, error);
  }
};

export const listLocks = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;
    const totensLocks = await getLocksAtTotem(db, id);

    if (totensLocks === -1) {
      return notFound(res, 'Totem not found');
    }

    return ok(res, totensLocks);
  } catch (error) {
    return serverError(res, error);
  }
};

export const listBikes = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;
    const totensBikes = await getBikesAtTotem(db, id);
    return ok(res, totensBikes);
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
    const totem = await createTotem(db, localization);
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
    const totem = await updateTotens(db, localization, id);

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

    const totem = await deleteTotem(db, id);

    if (totem === -1) {
      return notFound(res, 'Totem not found');
    }

    return ok(res, totem);
  } catch (error) {
    return serverError(res, error);
  }
};
