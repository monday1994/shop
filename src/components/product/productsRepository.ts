import { getRepository } from 'typeorm';
import { Product } from '../../entities/Product';
import { ProductInterface } from './productModel';
import { GeneralPostgresError } from '../../app/exceptions/error';
import { getTimestamp } from '../../utils/utils';

export default class ProductsRepository {
  async findAll(): Promise<Product[]> {
    return getRepository(Product).find();
  }

  async findById(id: string): Promise<Product> {
    return getRepository(Product).findOne(id);
  }

  async create(product: ProductInterface): Promise<Product> {
    const productsRepository = getRepository(Product);
    const { name, description, price } = product;

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.createdAt = getTimestamp();
    newProduct.updatedAt = getTimestamp();

    try {
      await productsRepository.save(newProduct);

      return newProduct;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
      } else {
        throw err;
      }
    }
  }

  async update(product: ProductInterface): Promise<Product | number> {
    const productsRepository = getRepository(Product);

    const { id, name, description, price } = product;

    const productToUpdate = new Product();

    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.price = price;
    productToUpdate.updatedAt = getTimestamp();

    try {
      const { affected } = await productsRepository.update({ id }, productToUpdate);

      if (affected > 0) {
        return productToUpdate;
      }

      return affected;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(`Db error with code: ${err.code}`);
      } else {
        throw err;
      }
    }
  }

  async removeById(id: string): Promise<number> {
    const { affected } = await getRepository(Product).delete({ id });
    return affected;
  }
}
