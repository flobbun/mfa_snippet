import { generateSessionHash } from "app/server/helpers/auth.helper";
import UserModel from "app/server/models/UserModel";
import connect from "app/server/mongodb";

export default async function createUser(email: string) {
    try {
      await connect();
      const user = await UserModel.create({
        email,
        session_hash: await generateSessionHash(),
        lastLogin: new Date(),
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }