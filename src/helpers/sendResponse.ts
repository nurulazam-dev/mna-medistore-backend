import { Response } from "express";

type IResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
