import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // comparePassword(password: string, cb: (err: any, isMatch?: boolean) => void): void;
  comparePassword(password: string): Promise<boolean>;
}
