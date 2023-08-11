import { Input, Space } from 'antd'
import React from 'react'

const Email = ({
  setEmail
}: {
  setEmail: (email: string) => void
}) => {
  return (
    <Space direction='vertical'>
      <p className="text-xl">Please enter your email address</p>
      <Input size='small' onChange={(e) => setEmail(e.target.value)} className="p-2 text-black" type="email" placeholder="example@example.com" required />
    </Space>
  )
}

export default Email