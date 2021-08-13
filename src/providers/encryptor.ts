import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
}

export const isPasswordValid = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
}
