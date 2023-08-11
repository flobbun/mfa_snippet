import { type UserFields } from "app/server/models/UserModel";

export interface LoginBody {
    email: string;
}

export interface LoginResponse {
    error?: LoginErrors,
    status: LoginStatus,
    user?: UserFields,
    token?: string,
    session_hash: string, 
}

export interface ValidateOTPBody {
    session_hash: string;
    otp_code: string;
}

export interface ValidatePasswordBody {
    email: string;
    password: string;
}

export interface SetPasswordBody {
    session_hash: string;
    password: string;
}

export enum LoginStatus {
    EMAIL_REQUIRED = 'email_required',
    OTP_REQUIRED = 'otp_required',
    PASSWORD_VALIDATION_REQUIRED = 'validation_password_required',
    PASSWORD_SETUP_REQUIRED = 'password_setup_required',
    SUCCESS = 'success',
}

export enum LoginErrors {
    INVALID_EMAIL = 'invalid_email',
    INVALID_OTP = 'invalid_otp',
    UNHANDLED_ERROR = 'unhandled_error',
    INVALID_CREDENTIALS = 'invalid_credentials',
}