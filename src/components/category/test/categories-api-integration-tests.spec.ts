import supertest from 'supertest';
import app from '../../../app/app';
import {seedDbWithTestData} from '../../../database/test-utils';
import {getRepository} from 'typeorm';
import {Category} from '../../../entities/Category';

describe('Categories integration tests',  function() {
  let request: any;
  beforeAll(async() => {
    await app.init();
    await seedDbWithTestData();
    request = supertest(app)
  });

  it('Should get all categories', async () => {
    const res = await request.get('/api/v1/categories');
    expect(res.statusCode).toEqual(200);

    const {body: {data: {results}}} = res;
    expect(results.length).toEqual(5);
    const categoriesInDb = await getRepository(Category).find();
    expect(results).toEqual(JSON.parse(JSON.stringify(categoriesInDb)));
  })

  it('Should create new category', async () => {
    const newCategory = {
      name: 'new test category'
    }
    const res = await request.post('/api/v1/categories').send(newCategory);
    expect(res.statusCode).toEqual(201);
    const {
      body: {data}
    }  = res;

    const categoryFromDb = await getRepository(Category).findOne(newCategory);

    expect(data).toEqual(JSON.parse(JSON.stringify(categoryFromDb)));
  })

  it('Should update existing category', async () => {
    const categoryToUpdate = {
      name: 'new test category'
    }
    const newName = 'updated category name';
    const categoryFromDb = await getRepository(Category).findOne(categoryToUpdate);
    
    const res = await request.put('/api/v1/categories/' + categoryFromDb.id).send({name: newName});
    expect(res.statusCode).toEqual(200);
    const {
      body: {data}
    }  = res;

    const updatedCategoryFromDb = await getRepository(Category).findOne({name: newName});
    expect(data).toEqual({id: updatedCategoryFromDb.id, name: updatedCategoryFromDb.name});
  })

  it('Should delete category by id', async () => {
    const categoryName = 'updated category name';
    const categoryFromDb = await getRepository(Category).findOne({name: categoryName});

    const res = await request.delete('/api/v1/categories/' + categoryFromDb.id);
    expect(res.statusCode).toEqual(204);

    const notExistingCategory = await getRepository(Category).findOne({id: categoryFromDb.id});
    expect(notExistingCategory).toEqual(undefined);
  })
})
