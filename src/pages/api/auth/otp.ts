import { LoginErrors, LoginStatus, type ValidateOTPBody } from "app/interfaces/auth.interface";
import { getPublicUser } from "app/server/helpers/auth.helper";
import UserModel from "app/server/models/UserModel";
import { signToken } from "app/server/token";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.otp_code || !req.body.session_hash) {
        return res.status(400).json({ message: "Invalid Request" });
    }

    const { session_hash, otp_code } = req.body as ValidateOTPBody;
    const user = await UserModel.findOne({session_hash, otp_code});
    if (user) {
        return res.status(200).json({
            user: getPublicUser(user.toObject()),
            token: signToken(user.email),
            status: user.password ? LoginStatus.PASSWORD_VALIDATION_REQUIRED : LoginStatus.PASSWORD_SETUP_REQUIRED
        })
    }

    return res.status(401).json({ error: LoginErrors.INVALID_OTP })
}