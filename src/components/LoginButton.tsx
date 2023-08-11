import { SendOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { LoginStatus } from "app/interfaces/auth.interface"

const LoginButton = ({
    handleLogin,
    status
}: {
    handleLogin: () => void,
    status: LoginStatus | null
}) => {
  if (LoginStatus.SUCCESS === status) return null;

  return (
    <Button size="large" icon={<SendOutlined />} onClick={handleLogin} className="bg-white text-black p-1">{
        status === LoginStatus.OTP_REQUIRED ? 'Validate OTP'
        : status === LoginStatus.PASSWORD_SETUP_REQUIRED ? 'Set Password'
        : status === LoginStatus.PASSWORD_VALIDATION_REQUIRED ? 'Validate Password'
        : 'Login'
    }</Button>
  )
}

export default LoginButton