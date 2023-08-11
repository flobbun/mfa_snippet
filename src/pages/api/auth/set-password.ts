import { LoginStatus, type SetPasswordBody } from "app/interfaces/auth.interface";
import { getPublicUser, hashPassword } from "app/server/helpers/auth.helper";
import UserModel from "app/server/models/UserModel";
import { signToken } from "app/server/token";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.password || !req.body.session_hash) {
        return res.status(400).json({ message: "Invalid Request" });
    }

    const { session_hash, password } = req.body as SetPasswordBody;
    const user = await UserModel.findOne({ session_hash });
    if (user) {
        user.password = await hashPassword(password);
        user.lastLogin = new Date();
        await user.save();
        return res.status(200).json({
            user: getPublicUser(user.toObject()),
            token: signToken(user.email),
            status: LoginStatus.SUCCESS
        });
    }

    return res.status(401).json({ message: "User not found" })
}