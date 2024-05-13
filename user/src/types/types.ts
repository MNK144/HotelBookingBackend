import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface Routes {
  path?: string;
  router: Router;
}

export type GeneralResponse = (
  response: Response,
  data?: any,
  message?: string,
  isSuccess?: boolean,
  toast?: boolean,
  statusCode?: number
) => void;
