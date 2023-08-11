import { type LoginBody } from "app/interfaces/auth.interface";
import ENV_VARS from "../environment";
import jwt from "jsonwebtoken";

export const signToken = (email: LoginBody["email"]) => {
  const token = jwt.sign({ email }, ENV_VARS.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
  return decoded;
};
