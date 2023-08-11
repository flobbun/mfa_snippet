import { LoginErrors } from "app/interfaces/auth.interface"

const ErrorMessage = ({
    error,
}: {
    error: LoginErrors | null
}) => {
    const messages = {
        [LoginErrors.INVALID_EMAIL]: 'No user found with this email',
        [LoginErrors.INVALID_OTP]: 'The code you entered is invalid',
        [LoginErrors.INVALID_CREDENTIALS]: 'Invalid Credentials',
        [LoginErrors.UNHANDLED_ERROR]: 'Something went wrong',
    }

    if (!error || !messages[error]) {
        return null
    }

    return (
        <p className="text-xs inline p-1 uppercase border border-red-300 w-2/4 mx-auto text-red-600 tracking-wider">{messages[error]}</p>
    )
}

export default ErrorMessage