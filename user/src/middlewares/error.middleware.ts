import { NextFunction, Request, Response } from 'express';
import { generalResponse } from 'helpers/common.helper';
import logger from 'utils/logger';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const message: string = error.message || 'Something went wrong';
    logger.error("Error: ", error);
    return generalResponse(res, [], message, false, true, 500);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
