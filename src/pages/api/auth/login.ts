import { LoginErrors, LoginStatus } from "app/interfaces/auth.interface";
import createUser from "app/server/controllers/users/createUser";
import getUser from "app/server/controllers/users/getUser";
import { generateOTP, getPublicUser, isLoginOutdated, isValidEmail } from "app/server/helpers/auth.helper";
import { signToken } from "app/server/token";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.email && !isValidEmail(req.body.email as string)) {
        return res.status(401).json({
            error: LoginErrors.INVALID_EMAIL,
        });
    }

    const user = await getUser(req.body.email as string);
    if (user) {
        if (isLoginOutdated(user.lastLogin)) {
            user.otp_code = generateOTP();
            await user.save();
            console.info("OTP CODE -> ", user.otp_code);
            return res.status(200).json({
                status: LoginStatus.OTP_REQUIRED,
                session_hash: user.session_hash
            });
        }

        if (user.password) {
            user.lastLogin = new Date();
            await user.save();
            return res.status(200).json({
                status: LoginStatus.PASSWORD_VALIDATION_REQUIRED,
                session_hash: user.session_hash
            });
        }
        
        return res.status(200).json({
            status: LoginStatus.PASSWORD_SETUP_REQUIRED,
            session_hash: user.session_hash
        });
    }

    const newUser = await createUser(req.body.email as string);
    return res.status(200).json({
        user: getPublicUser(newUser.toObject()),
        token: signToken(newUser.email),
        status: LoginStatus.PASSWORD_SETUP_REQUIRED,
        session_hash: newUser.session_hash
    });
}