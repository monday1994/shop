import ProductsRepository from './productsRepository';
import {ProductDTO} from './productDTO';
import {NotFoundError} from '../../app/exceptions/error';
import {Product} from '../../entities/Product';

export default class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productsRepository.findById(id);
  }

  async createProduct(product: ProductDTO): Promise<Product> {
    return this.productsRepository.create(product);
  }

  async updateProduct(product: ProductDTO): Promise<Product | number> {
    const result = await this.productsRepository.update(product);

    if(typeof result !== 'number') {
      return result;
    } else {
      throw new NotFoundError(`Product with id: ${product.id} does not exist in db`);
    }
  }

  async deleteById(id: string): Promise<number> {
    const affectedRows = await this.productsRepository.removeById(id);

    if(affectedRows > 0) {
      return;
    } else {
      throw new NotFoundError(`Cannot delete product with id: ${id}, because it does not exist in db`);
    }
  }
}
