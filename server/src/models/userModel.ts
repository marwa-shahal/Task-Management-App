import { IUser } from "./../types/user";
import { Schema, model, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: [validator.isEmail, "please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: [validator.isStrongPassword, "please enter a strong password"],
      select: false,
    },
  },
  { collection: "Users", timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  console.log('Plain text password:', user.password);
  console.log('Hashed password:', hash);

  user.password = hash;
  return next();
});


UserSchema.methods.comparePassword = async function(password: string) {
  const user = this as IUser;
  console.log('Stored hashed password:', user.password);
  console.log('Password to compare:', password);
  return bcrypt.compareSync(password, user.password);
}

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
