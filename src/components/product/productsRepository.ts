import { getRepository } from 'typeorm';
import { Product } from '../../entities/Product';
import { ProductDTO } from './productDTO';
import { GeneralPostgresError, NotFoundError } from '../../app/exceptions/error';

export default class ProductsRepository {
  async findAll(): Promise<Product[]> {
    return getRepository(Product)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
  }

  async findById(id: string): Promise<Product> {
    return getRepository(Product).findOne(id);
  }

  async create(product: ProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product);
    const { name, description, price, categoryId } = product;

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.category_id = categoryId;

    try {
      const createdProduct = await productsRepository.save(newProduct);
      return createdProduct;
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }

  async update(product: ProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product);

    const { id, name, description, price, categoryId } = product;

    const productToUpdate = new Product();

    productToUpdate.id = id;
    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.price = price;
    productToUpdate.category_id = categoryId;

    try {
      const { affected } = await productsRepository.update({ id }, productToUpdate);

      if (affected > 0) {
        return productToUpdate;
      }

      throw new NotFoundError(`Product with id: ${product.id} does not exist in db`);
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
      const { affected } = await getRepository(Product).delete({ id });

      if (affected > 0) {
        return;
      }

      throw new NotFoundError(`Cannot delete product with id: ${id}, because it does not exist in db`);
    } catch (err) {
      if (err.code) {
        throw new GeneralPostgresError(err);
      } else {
        throw err;
      }
    }
  }
}
