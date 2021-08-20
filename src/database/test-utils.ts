import {getRepository} from 'typeorm';
import {User} from '../entities/User';
import {encryptPassword} from '../providers/encryptor';

//test data
import users from './test-data/users';
import categories from './test-data/categories';
import products from './test-data/products';
import orders from './test-data/orders';
import {Category} from '../entities/Category';
import {Product} from '../entities/Product';
import {Order} from '../entities/Order';

export const seedDbWithTestData = async () => {

  for(const user of users) {
    const newUser = new User();

    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.password = await encryptPassword(user.password);

    await getRepository(User).save(newUser);
  }

  for(const category of categories) {
    const newCategory = new Category();

    newCategory.name = category.name;

    await getRepository(Category).save(newCategory);
  }

  for(const product of products) {
    const newProduct = new Product();

    newProduct.name = product.name;
    newProduct.description = product.description;
    const {id: categoryId} = await getRepository(Category).findOne({name: product.categoryName});
    newProduct.category_id = categoryId;
    newProduct.price = product.price;

    await getRepository(Product).save(newProduct);
  }

  for(const order of orders) {
    const product = await getRepository(Product).findOne({name: order.productName});
    const user = await getRepository(User).findOne({firstName: order.userFirstName});

    const newOrder = new Order();
    newOrder.name = order.name;
    newOrder.address = order.address;
    newOrder.price = product.price;
    newOrder.products = [product];
    newOrder.user_id = user.id;

    await getRepository(Order).save(newOrder);
  }
}
