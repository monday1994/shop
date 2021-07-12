import {NextFunction, Request, Response} from 'express';

export interface ErrorMessage {
    message: string,
    status: number
}

export const genericExceptionHandler = (err: ErrorMessage, req: Request, res: Response, next: NextFunction) : void => {
    if(err?.message && err?.status) {
        const {status, message} = err;
        res.status(status);
        res.json({status, message});
    }

    next(err);
};
