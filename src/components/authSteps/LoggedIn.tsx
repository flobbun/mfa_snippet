import { SmileOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"

const LoggedIn = ({
  handleLogout
}: {
  handleLogout: () => void
}) => {
  return (
    <Space direction="vertical">
      <p className="text-3xl">You&apos;re finally here! <SmileOutlined className="text-4xl" /></p>
      <Button onClick={() => handleLogout()} size="large">Logout</Button>
    </Space>
  )
}

export default LoggedIn