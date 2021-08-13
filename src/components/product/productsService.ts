import ProductsRepository from './productsRepository';
import {ProductDTO} from './productDTO';
import {Product} from '../../entities/Product';

export default class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getAllProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.findById(id);
  }

  createProduct(product: ProductDTO): Promise<Product> {
    return this.productsRepository.create(product);
  }

  updateProduct(product: ProductDTO): Promise<Product> {
    return this.productsRepository.update(product);
  }

  deleteById(id: string): Promise<void> {
    return this.productsRepository.removeById(id);
  }
}
