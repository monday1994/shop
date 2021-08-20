const expect = require('chai').expect
import {isNotEmptyArray} from './utils';

describe('utils.ts test', () => {
  it('isNotEmptyArray - not empty array', (done) => {
    const isEmpty = isNotEmptyArray([1,2,3]);
    expect(isEmpty).to.eq(true);
    done();
  });

  it('isNotEmptyArray - empty array', (done) => {
    const isEmpty = isNotEmptyArray([]);
    expect(isEmpty).to.eq(false);
    done();
  });
})
