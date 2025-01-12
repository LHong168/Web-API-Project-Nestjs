import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

export function isPasswordMatched(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
