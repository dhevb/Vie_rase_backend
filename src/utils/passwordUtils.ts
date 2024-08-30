import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Simple random password generator
};
