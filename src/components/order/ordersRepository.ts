import { EntityManager, getManager, Repository } from 'typeorm';
import { Order } from '../../entities/Order';
import { OrderDTO } from './orderDTO';
import { GeneralPostgresError, NotFoundError } from '../../app/exceptions/error';

export default class OrdersRepository {
  constructor(private repository: Repository<Order>, private manager: EntityManager) {}

  async findAll(): Promise<Order[]> {
    return this.repository.createQueryBuilder('order').leftJoinAndSelect('order.products', 'products').getMany();
  }

  async findById(id: string): Promise<Order> {
    return this.repository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'products')
      .where('order.id = :id', { id })
      .getOne();
  }

  async create(order: OrderDTO): Promise<Order> {
    const { name, price, address, userId, productsIds } = order;

    const newOrder = new Order();
    newOrder.name = name;
    newOrder.price = price;
    newOrder.address = address;
    newOrder.user_id = userId;
    try {
      // many to many relation creation using transaction
      const result = await getManager().transaction(async (transactionalEntityManager) => {
        const createdOrder = await transactionalEntityManager.save(newOrder);
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Order, 'products')
          .of(createdOrder.id)
          .add(productsIds);

        return createdOrder;
      });

      return result;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async update(order: OrderDTO): Promise<Order> {
    const { id, name, price, address, userId, productsIds } = order;

    const orderToUpdate = new Order();
    orderToUpdate.id = id;
    orderToUpdate.name = name;
    orderToUpdate.price = price;
    orderToUpdate.address = address;
    orderToUpdate.user_id = userId;
    try {
      // many to many relation creation using transaction
      await this.manager.transaction(async (transactionalEntityManager) => {
        const { affected } = await transactionalEntityManager.update(Order, { id }, orderToUpdate);
        if (affected > 0) {
          const orderMeta = await this.findById(orderToUpdate.id);

          const oldProductsIds = orderMeta.products.map(({ id }) => id);
          await transactionalEntityManager
            .createQueryBuilder()
            .relation(Order, 'products')
            .of(id)
            .addAndRemove(productsIds, oldProductsIds);
        } else {
          throw new NotFoundError(`Order with id: ${id} does not exist in db`);
        }
      });
      //inside transaction orderMeta is old one meta thats why there is no point to return it from transaction
      return orderToUpdate;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<void> {
    try {
      const { affected } = await this.repository.delete({ id });

      if (affected > 0) {
        return;
      } else {
        throw new NotFoundError(`Cannot delete order with id: ${id}, because it does not exist in db`);
      }
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }
}
