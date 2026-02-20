import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Validation error: Check your input fields!";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate entry found!";
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Foreign key constraint fail!";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found!";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "DB connection fail!";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails:
      process.env.NODE_ENV === "development" ? errorDetails : undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
