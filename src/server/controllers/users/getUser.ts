import UserModel from "app/server/models/UserModel";
import connect from "app/server/mongodb";

export default async function getUser(email: string) {
    await connect();
    const user = await UserModel.findOne({
        email
    });
    return user;
}