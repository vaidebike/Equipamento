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
  createLock,
  getLocks,
  getLock,
  updateLocks,
  deleteLock,
  updateLockStatus
} from '../services/lock.service';

import { StatusEnum } from '../models/Lock';

export const registerLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { year, model, localization } = req.body;

  if (!model || !year || !localization) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof model !== 'string' ||
    typeof localization !== 'string' ||
    typeof year !== 'number'
  ) {
    return badRequest(res, 'Invalid fields');
  }

  try {
    const lock = await createLock(db, year, model, localization);
    return created(res, lock);
  } catch (error) {
    return serverError(res, error);
  }
};

export const listLocks = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const locks = await getLocks(db);
    return ok(res, locks);
  } catch (error) {
    return serverError(res, error);
  }
};

export const listLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;

    const lock = await getLock(db, id);
    if (lock === -1) {
      return notFound(res, 'Lock not found');
    }

    return ok(res, lock);
  } catch (error) {
    return serverError(res, error);
  }
};

export const updateLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;
  const { year, model, localization } = req.body;

  if (!model || !year || !localization) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof model !== 'string' ||
    typeof localization !== 'string' ||
    typeof year !== 'number'
  ) {
    return badRequest(res, 'Invalid fields');
  }

  try {
    const lock = await updateLocks(db, year, model, localization, id);

    if (lock === -1) {
      return notFound(res, 'Lock not found');
    }

    return ok(res, lock);
  } catch (error) {
    return serverError(res, error);
  }
};

export const excludeLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const { id } = req.params;

    const lock = await deleteLock(db, id);

    if (lock === -1) {
      return notFound(res, 'Lock not found');
    }

    return ok(res, lock);
  } catch (error) {
    return serverError(res, error);
  }
};

export const changeLockStatus = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id, acao } = req.params;

  if (!Object.values(StatusEnum).includes(acao as StatusEnum)) {
    return badRequest(res, 'Invalid status');
  }

  try {
    const lock = await updateLockStatus(db, id, acao);

    if (lock === -1) {
      return notFound(res, 'Lock not found');
    }

    return ok(res, lock);
  } catch (error) {
    return serverError(res, error);
  }
};
