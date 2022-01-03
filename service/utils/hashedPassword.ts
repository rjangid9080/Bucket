import bcrypt from "bcryptjs";

export default async (p: string, cp: string) => {
  const salt: string = await bcrypt.genSalt();
  const hashed = {
    password: await bcrypt.hash(p, salt),
    confirmPassword: await bcrypt.hash(cp, salt),
  };
  return hashed;
};
