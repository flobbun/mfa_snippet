import { type LoginResponse } from "app/interfaces/auth.interface";
import fetcher from "../lib/fetcher";
import { useEffect, useState } from "react";
import { ApiPaths } from "app/constants/apiPaths";

const usePassword = () => {
    const [password, setPassword] = useState<string>();

    useEffect(() => {
        if (password && password.length > 6) {
            setPassword(password.slice(0, 6));
        }
    }, [password]);

    const setNewPassword = async () => {
        const res = await fetcher({
            url: ApiPaths.SET_PASSWORD,
            method: 'post',
            body: {
                session_hash: localStorage.getItem('session_hash'),
                password
            }
        }) as LoginResponse;
        setPassword('');
        return {
            status: res.status,
            error: res.error
        }
    }

    const validatePassword = async (email?: string) => {
        const res = await fetcher({
            url: ApiPaths.VALIDATE_PASSWORD,
            method: 'post',
            body: {
                email,
                password
            }
        }) as LoginResponse;
        return {
            status: res.status,
            error: res.error
        }
    }

    return {
        setNewPassword,
        validatePassword,
        setPassword,
    }
}

export default usePassword; 