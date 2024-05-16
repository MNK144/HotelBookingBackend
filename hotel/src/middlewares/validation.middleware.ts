import { RequestHandler } from 'express';
import { generalResponse } from 'helpers/common.helper';
import Joi from 'joi';
import logger from 'utils/logger';

interface Error {
  message: string;
  path: Object;
  type: string;
  context: any;
}

const errorFilterValidator = (error: Array<Error>) => {
  const extractedErrors: Array<string> = [];
  error.map((err: Error) => extractedErrors.push(err.message));
  const errorResponse = extractedErrors.join(', ');
  return errorResponse;
};

const validationMiddleware = (type: Joi.ObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await type.validateAsync(req.body);
      next();
    } catch (error: any) {
      logger.error("Validation error:",error);
      if (error.details) {
        const errorResponse = errorFilterValidator(error.details);
        return generalResponse(res, null, errorResponse, false, true, 400);
      }
      return generalResponse(res, null, 'Something went wrong!', false, true, 400);
    }
  };
};

export default validationMiddleware;
