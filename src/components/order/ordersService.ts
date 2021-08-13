import OrdersRepository from './ordersRepository';
import { OrderDTO } from './orderDTO';
import { Order } from '../../entities/Order';

export default class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  getById(id: string): Promise<Order> {
    return this.ordersRepository.findById(id);
  }

  getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  createOrder(order: OrderDTO): Promise<Order> {
    return this.ordersRepository.create(order);
  }

  updateOrder(order: OrderDTO): Promise<Order> {
    return this.ordersRepository.update(order);

  }

  deleteById(id: string): Promise<void> {
    return this.ordersRepository.removeById(id);
  }
}
