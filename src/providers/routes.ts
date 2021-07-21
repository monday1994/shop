// here imports of all routes
import { Express, Request, Response } from 'express';
import userRouter from '../components/user/usersRouter';

const healthCheckHandler = (req: Request, res: Response) => {
    res.json({status: 200, message: 'Health check - status ok!'})
};

export const mountRoutes = (app: Express, prefix: string): Express => {
    //health check
    app.get(`${prefix}/`, healthCheckHandler);
    //other routes
    app.use(`${prefix}/users`, userRouter);

    return app;
};

