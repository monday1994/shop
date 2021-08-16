// here imports of all routes
import { Express, Request, Response } from 'express';
import userRouter from '../components/user/usersRouter';
import productsRouter from '../components/product/productsRouter';
import categoriesRouter from '../components/category/categoriesRouter';
import ordersRouter from '../components/order/ordersRouter';
import authRouter from '../components/auth/authRouter';
import passport from 'passport';

const healthCheckHandler = (req: Request, res: Response) => {
    res.json({status: 200, message: 'Health check - status ok!'})
};

export const mountRoutes = (app: Express, prefix: string): Express => {
    //health check
    app.get(`${prefix}/`, healthCheckHandler);
    //other routes
    app.use(`${prefix}/auth`, authRouter);

    app.use(passport.authenticate('jwt-token', {session: false}));
    app.use(`${prefix}/users`, userRouter);
    app.use(`${prefix}/products`, productsRouter);
    app.use(`${prefix}/categories`, categoriesRouter)
    app.use(`${prefix}/orders`, ordersRouter)

    return app;
};

