/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// SUCCESS

import { Response } from 'express';
import { BadRequestError, NotFoudError } from './errors';

export const ok = (res: Response, content: any): Response =>
  res.status(200).json(content);

export const created = (res: Response, content: any): Response =>
  res.status(201).json(content);

export const relationshipCreated = (
  res: Response,
  firstEntity: any,
  secondEntity: any
): Response =>
  res.status(201).json({
    codigo: 'CREATED',
    firstEntity,
    secondEntity
  });

export const empty = (res: Response, mensagem: string): Response =>
  res.status(204).json({
    codigo: 'NO_CONTENT',
    mensagem: mensagem || undefined
  });

export const badRequest = (res: Response, mensagem: any): Response =>
  res.status(422).json({
    codigo: 'INVALID_DATA',
    mensagem
  });

export const invalid = (res: Response, mensagem: string): Response =>
  res.status(400).json({
    codigo: 'INVALID',
    mensagem: mensagem || 'Invalid.'
  });

export const unauthorized = (
  res: Response,
  mensagem: string | undefined = undefined
): Response =>
  res.status(401).json({
    codigo: 'UNAUTHORIZED',
    mensagem: mensagem ?? 'Not allowed to perform this action.'
  });

export const notFound = (res: Response, mensagem: string): Response =>
  res.status(404).json({
    codigo: 'NOT_FOUND',
    mensagem: mensagem || 'Not found.'
  });

// SERVER ERROR
export const serverError = (
  res: Response,
  error: any,
  description = 'Something wrong that is not right happened.',
  query = undefined
): Response => {
  if (error instanceof NotFoudError) {
    return notFound(res, error.message);
  }

  if (error instanceof BadRequestError) {
    return badRequest(res, error.message);
  }

  return res.status(500).json({
    codigo: 'SERVER_ERROR',
    description,
    error: error.mensagem,
    mensagem: error.mensagem,
    ...(query ?? {})
  });
};

export const requiredField = (
  res: Response,
  mensagem: any
): Response<any, Record<string, any>> =>
  res.status(422).json({
    codigo: 'REQUIRED_FIELD_MISSING',
    mensagem
  });
