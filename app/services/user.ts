import { promises as fs } from 'fs';
import { UserType } from '../types/User';

export async function getUser() {
  const file = await fs.readFile(
    process.cwd() + "/public/user.json",
    "utf8"
  );
  const user: UserType = JSON.parse(file);

  return user;
}