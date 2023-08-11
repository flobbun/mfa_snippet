import { type LoginResponse } from "app/interfaces/auth.interface";
import fetcher from "../lib/fetcher";
import { useState } from "react";
import { ApiPaths } from "app/constants/apiPaths";

const useValidateOTP = () => {
    const [code, setCode] = useState<string>();

    const validateOTP = async () => {
        const res = await fetcher({
            url: ApiPaths.VALIDATE_OTP,
            method: 'post',
            body: {
                session_hash: localStorage.getItem('session_hash'),
                otp_code: code
            }
        }) as LoginResponse;
        setCode('');
        return {
            status: res.status,
            error: res.error
        }
    }

    return {
        validateOTP,
        setCode,
        code,
    }
}

export default useValidateOTP; 