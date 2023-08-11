import { ApiPaths } from "app/constants/apiPaths";
import { type LoginResponse } from "app/interfaces/auth.interface";
import { useState } from "react";
import fetcher from "../lib/fetcher";

const useLogin = () => {
    const [email, setEmail] = useState('');

    const login = async () => {
        const res = await fetcher({
            url: ApiPaths.LOGIN,
            method: 'post',
            body: {
                email,
            }
        }) as LoginResponse;

        if (res) {
            localStorage.setItem('session_hash', res.session_hash);
            return {
                status: res.status,
                error: res.error
            }
        }
    }

    return {
        login,
        setEmail,
        email,
    }
}

export default useLogin