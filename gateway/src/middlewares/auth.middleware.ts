import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET } from "config/config";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { generalResponse } from "helpers/common.helper";
import { PUBLIC_ENDPOINTS } from "constants/constants";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    //For non protected APIs
    console.log("Middleware req.path",req.path);
    if(PUBLIC_ENDPOINTS[req.path]) {
      console.log("Skipping Auth Check");
      return next();
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader) return generalResponse(res, null, "No authorization found", false, false, 401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: VerifyErrors, decoded: JwtPayload) => {
      if (err) {
        const error = err.name;
        if (error === "TokenExpiredError") {
          return generalResponse(res, null, "Token has expired", false, false, 401);
        } else {
          return generalResponse(res, null, "Unauthorized", false, false, 401);
        }
      }
      req["userData"] = decoded;
      next();
    });
  } catch (error) {
    return generalResponse(res, null, "Error Validating Authorization", false, true, 500);
  }
}

export default authMiddleware;