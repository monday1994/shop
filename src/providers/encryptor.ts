import {hash, compare} from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  return hash(password, saltRounds);
}

export const isPasswordValid = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return compare(plainPassword, hashedPassword);
}
