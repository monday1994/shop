// component controller layer

import { Response, Request, NextFunction } from 'express';
import OrdersService from './ordersService';
import {OrderDTO} from './orderDTO';

export default class OrdersController {
  constructor(private ordersService: OrdersService) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params;
    const order = await this.ordersService.getById(id);

    res.status(200);
    res.json({
      data: order
    });
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const orders = await this.ordersService.getAllOrders();

    res.status(200);
    res.json({
      data: {
        results: orders,
      },
    });
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      price,
      address,
      productsIds,
      userId,
    } = req.body;

    const newOrder: OrderDTO = {
      name: name.toLowerCase(),
      price: price.toLowerCase(),
      address: address.toLowerCase(),
      productsIds,
      userId
    };

    const createdOrder = await this.ordersService.createOrder(newOrder);
    res.status(201);
    res.json({
      data: createdOrder,
    });
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const {
      name,
      price,
      address,
      productsIds,
      userId,
    } = req.body;

    const order: OrderDTO = {
      id,
      name: name.toLowerCase(),
      price: price.toLowerCase(),
      address: address.toLowerCase(),
      productsIds,
      userId
    };

    const updatedCategory = await this.ordersService.updateOrder(order);
    res.status(200);
    res.json({
      data: updatedCategory,
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    await this.ordersService.deleteById(id);

    res.status(204);
    res.send();
  };
}
