import { expect } from 'chai';
import {encryptPassword, isPasswordValid} from '../encryptor';

describe('Encryptor unit tests', function () {
  it('Should encrypt password',  async () => {
    const testPassword = '123456789';
    try {
      const encryptedPassword = await encryptPassword(testPassword);
      expect(encryptedPassword).to.not.eq(testPassword);
    } catch (err) {
      throw err;
    }
  })

  it('Should compare encrypted and not encrypted passwords validity',  async () => {
    const testPassword = '123456789';
    try {
      const encryptedPassword = await encryptPassword(testPassword);
      const isValid = await isPasswordValid(testPassword, encryptedPassword);
      expect(isValid).to.eq(true);
    } catch (err) {
      throw err;
    }
  })
});
