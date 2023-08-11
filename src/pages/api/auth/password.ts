import { LoginErrors, LoginStatus, type ValidatePasswordBody } from "app/interfaces/auth.interface";
import getUser from "app/server/controllers/users/getUser";
import { getPublicUser } from "app/server/helpers/auth.helper";
import { signToken } from "app/server/token";
import { compare } from "bcrypt";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({ message: "Invalid Request" });
    }

    const { email, password } = req.body as ValidatePasswordBody;
    const user = await getUser(email);
    if (user) {
        if (await compare(password, user.password)) {
            user.lastLogin = new Date();
            await user.save();
            return res.status(200).json({
                user: getPublicUser(user.toObject()),
                token: signToken(user.email),
                status: LoginStatus.SUCCESS
            });
        }
    }
    return res.status(401).json({
        error: LoginErrors.INVALID_CREDENTIALS
    })
}