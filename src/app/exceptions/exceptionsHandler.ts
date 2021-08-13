import {NextFunction, Request, Response} from 'express';
import {HttpStatusCode} from './error';
import {logger} from '../../middlewares/logger';

//todo read https://www.toptal.com/nodejs/node-js-error-handling

export interface ErrorMessage {
    message?: string,
    httpCode?: number
}

// next callback have to be here, otherwise handler won't properly return response
export const genericExceptionHandler = (err: ErrorMessage, req: Request, res: Response, next: NextFunction) : void => {
    logger.error('Error', err);

    if(err?.message && err?.httpCode) {
        const {httpCode, message} = err;
        res.status(httpCode);
        res.json({status: httpCode, message});
    } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
        res.json({
            message: 'Internal Server Error'
        })
    }
};
