/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// SUCCESS

import { Response } from 'express';
import { BadRequestError, NotFoudError } from './errors';

export const ok = (res: Response, content: any): Response =>
  res.status(200).json({
    code: 'OK',
    content
  });

export const created = (res: Response, content: any): Response =>
  res.status(201).json({
    code: 'CREATED',
    content
  });

export const empty = (res: Response, message: string): Response =>
  res.status(204).json({
    code: 'NO_CONTENT',
    message: message || undefined
  });

// CLIENT ERROR
export const badRequest = (res: Response, message: any): Response =>
  res.status(400).json({
    code: 'BAD_REQUEST_ERROR',
    message
  });

export const invalid = (res: Response, message: string): Response =>
  res.status(400).json({
    code: 'INVALID',
    message: message || 'Invalid.'
  });

export const unauthorized = (
  res: Response,
  message: string | undefined = undefined
): Response =>
  res.status(401).json({
    code: 'UNAUTHORIZED',
    message: message ?? 'Not allowed to perform this action.'
  });

export const notFound = (res: Response, message: string): Response =>
  res.status(404).json({
    code: 'NOT_FOUND',
    message: message || 'Not found.'
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
    code: 'SERVER_ERROR',
    description,
    error: error.message,
    message: error.message,
    ...(query ?? {})
  });
};

export const requiredField = (
  res: Response,
  message: any
): Response<any, Record<string, any>> =>
  res.status(422).json({
    code: 'REQUIRED_FIELD_MISSING',
    message
  });
