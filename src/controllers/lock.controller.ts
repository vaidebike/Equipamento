/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { db } from '../app';

import { ok, created, notFound, badRequest } from '../helpers/responseHelpers';

import {
  createLock,
  getLocks,
  getLock,
  updateLocks,
  deleteLock,
  updateLockStatus,
  addRelLockToTotem,
  deleteRelLockToTotem,
  getBikeAtLockRel,
  postLocklock,
  postUnlocklock
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

  const lock = await createLock(db, year, model, localization);
  return created(res, lock);
};

export const listLocks = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const locks = await getLocks(db);
  return ok(res, locks);
};

export const listLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  if (!id) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof id !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  const lock = await getLock(db, id);
  if (lock === -1) {
    return notFound(res, 'Lock not found');
  }

  return ok(res, lock);
};

export const getBikeAtLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  if (!id) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof id !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  const lock = await getBikeAtLockRel(db, id);

  if (lock === -1) {
    return notFound(res, 'Lock not found');
  }

  if (lock === -500) {
    return badRequest(res, 'Lock without a bike');
  }

  return ok(res, lock);
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

  const lock = await updateLocks(db, year, model, localization, id);

  if (lock === -1) {
    return notFound(res, 'Lock not found');
  }

  return ok(res, lock);
};

export const lockLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;
  const { bicicleta } = req.body;

  if (!id) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof id !== 'string' ||
    (bicicleta !== undefined && typeof bicicleta !== 'string')
  ) {
    return badRequest(res, 'Invalid fields');
  }

  const lock = await postLocklock(db, id, bicicleta);

  if (lock === -1) {
    return notFound(res, 'Lock or bike not found');
  }
  if (lock === -200) {
    return badRequest(res, 'Lock already occupied');
  }
  if (lock === -300) {
    return badRequest(
      res,
      'Bicycle must be new, in use or in repair to be returned'
    );
  }
  if (lock === -400) {
    return badRequest(res, 'Lock must be available');
  }

  if (lock === -600) {
    return badRequest(res, 'Bike already belongs to another lock');
  }

  return ok(res, lock);
};

export const unlockLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  if (!id) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof id !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  const lock = await postUnlocklock(db, id);

  if (lock === -1) {
    return notFound(res, 'Lock or bike not found');
  }
  if (lock === -200) {
    return badRequest(res, 'Lock must be occupied');
  }

  return ok(res, lock);
};

export const excludeLock = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id } = req.params;

  const lock = await deleteLock(db, id);

  if (lock === -1) {
    return notFound(res, 'Lock not found');
  }

  return ok(res, lock);
};

export const changeLockStatus = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { id, acao } = req.params;

  if (!Object.values(StatusEnum).includes(acao as StatusEnum)) {
    return badRequest(res, 'Invalid status');
  }

  const lock = await updateLockStatus(db, id, acao);

  if (lock === -1) {
    return notFound(res, 'Lock not found');
  }

  return ok(res, lock);
};

export const addLockToVaDeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { idTotem, idTranca } = req.body;

  if (!idTotem || !idTranca) {
    return badRequest(res, 'Missing required fields');
  } else if (typeof idTotem !== 'string' || typeof idTranca !== 'string') {
    return badRequest(res, 'Invalid fields');
  }

  const lock = await addRelLockToTotem(db, idTotem, idTranca);

  if (lock === -1) {
    return notFound(res, 'Lock or Totem not found');
  }

  if (lock === -500) {
    return badRequest(res, 'Lock must be new or in repair');
  }

  if (lock === -600) {
    return badRequest(res, 'Lock already belongs to a totem');
  }

  return created(res, lock);
};

export const removeFromVaDeBike = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  const { idTotem, idTranca, acao } = req.body;

  if (!idTotem || !idTranca || !acao) {
    return badRequest(res, 'Missing required fields');
  } else if (
    typeof idTotem !== 'string' ||
    typeof idTranca !== 'string' ||
    typeof acao !== 'string'
  ) {
    return badRequest(res, 'Invalid fields');
  } else if (acao !== 'EM_REPARO' && acao !== 'APOSENTADA') {
    return badRequest(res, 'Action invalid');
  }

  const lock = await deleteRelLockToTotem(db, idTotem, idTranca, acao);

  if (lock === -1) {
    return notFound(res, 'Lock or Totem not found');
  }

  if (lock === -500) {
    return badRequest(res, 'Lock must have status as solicited repair');
  }

  if (lock === -600) {
    return badRequest(res, 'Lock out of totens');
  }

  if (lock === -700) {
    return badRequest(res, 'To be removed, the lock cannot have a bike on it');
  }

  return ok(res, lock);
};
