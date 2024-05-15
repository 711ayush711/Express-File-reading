import { Request, Response } from "express";
import fs from "fs/promises";
import { parse } from "csv-parse";
import prisma from "../utils/prisma";
import FileType from "../types/fileType";
import batch from "../utils/batch";
const fileUpload = async (req: Request, res: Response) => {
  try {
    const filePath: string = req.file?.path!;
    if (filePath) {
      const fileContent: string = await fs.readFile(filePath, {
        encoding: "utf-8",
      });
      const result: FileType[] = await new Promise((resolve, reject) => {
        parse(fileContent, { columns: true }, (error, result: FileType[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
      await batch(result);
      res.status(200).send({ message: "Inserted" });
    } else {
      res.status(400).send({ message: "File not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const showData = async (req: Request, res: Response) => {
  try {
    const data: FileType[] = await prisma.file.findMany({});
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export { fileUpload, showData };
