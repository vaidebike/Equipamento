/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppError {
  constructor (
    public message: string,
    public status: number,
    public data?: any
  ) {}
}

export class NotFoudError extends AppError {}
export class BadRequestError extends AppError {}
