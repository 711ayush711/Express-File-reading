import FileType from "../types/fileType";
import prisma from "./prisma";

const batch = async (data: FileType[]): Promise<void> => {
  try {
    const batchSize: number = 150;
    const noOfBatch: number = Math.ceil(data.length / batchSize);
    for (let i = 0; i < noOfBatch; i++) {
      const start: number = i * batchSize;
      const end: number = Math.min((i + 1) * batchSize, data.length);
      const batchData: FileType[] = data.slice(start, end);
      //interactive transiction:- in which i can do some operation other than db
      await prisma.$transaction(async (tx) => {
        for (let i = 0; i < batchData.length; i++) {
          const { sku, ...rest } = batchData[i];
          if (sku) {
            await tx.file.upsert({
              where: { sku: sku },
              update: {},
              create: { sku: sku, data: rest },
            });
          }
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default batch;
