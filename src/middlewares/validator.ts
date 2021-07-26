import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors.array().map((err) => {
    //todo make sure to return only one message per field
    extractedErrors.push({ [err.param]: err.msg })
    /*if(err.msg !== 'Invalid value') {
      extractedErrors.push({ [err.param]: err.msg })
    }*/
  });

  return res.status(400).json({
    errors: extractedErrors
  });
};
