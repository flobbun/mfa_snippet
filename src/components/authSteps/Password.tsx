import { Input, Space } from "antd"
import { LoginStatus } from "app/interfaces/auth.interface"

const Password = ({ status, setPassword }: {
    status: LoginStatus.PASSWORD_SETUP_REQUIRED | LoginStatus.PASSWORD_VALIDATION_REQUIRED,
    setPassword: (password: string) => void
}) => {
    return <Space direction="vertical">
        {
            status === LoginStatus.PASSWORD_SETUP_REQUIRED ?
                <>
                    <p className="text-xl">It&apos;s time for you to setup a password!</p>
                    <Input minLength={6} required className="text-black" type="password" onChange={(e) => setPassword(e.target.value)} />
                </>
                : status === LoginStatus.PASSWORD_VALIDATION_REQUIRED ?
                    <>
                        <p className="text-xl">Please, enter your password</p>
                        <Input minLength={6} required className="text-black" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </> :
                    null
        }
    </Space>

}

export default Password