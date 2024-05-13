import { NextFunction, Request, Response } from 'express';
import { generalResponse } from 'helpers/common.helper';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const message: string = error.message || 'Something went wrong';
    return generalResponse(res, [], message, false, true, 500);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
