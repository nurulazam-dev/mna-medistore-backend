import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import ApiErrorHandler from "../helpers/ApiErrorHandler";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
        status?: string;
        phone?: string;
        address?: string;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        throw new ApiErrorHandler(401, "You are unauthorize!");
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
        status: session.user.status as string,
        phone: session.user.phone as string,
        address: session.user.address as string,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        throw new ApiErrorHandler(
          403,
          "Forbidden! You don't have permission to access!",
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
