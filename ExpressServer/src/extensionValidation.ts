import { Request } from 'express';

const allowedExtensions = ['html', 'htm'];

const extensionValidation = (filename: string): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return !!extension && allowedExtensions.includes(extension);
};

const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
  if (!extensionValidation(file.originalname)) {
    return callback(new Error(`File extension not allowed`), false);
  }
  callback(null, true);
};

export { fileFilter };
