import { AlertOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { type ChangeEvent } from "react";

const OTP = ({
    setCode,
    code
}: {
    code: string,
    setCode: (code: string) => void
}) => {

    const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCode(value.slice(0, 6));
    };

    return (
        <Space direction="vertical">
            <p className="text-xl">We have sent a code to the device associated to your account <AlertOutlined className="text-3xl" /></p>
            <Input value={code} maxLength={6} required size="large" type="number" onChange={handleOTPChange} placeholder="Code" />
        </Space>
    )
}

export default OTP