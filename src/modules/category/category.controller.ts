import { Request, Response } from "express";

const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("create Category controller");
  } catch (err) {
    console.error(err);
  }
};

export const CategoryController = {
  createCategory,
};
