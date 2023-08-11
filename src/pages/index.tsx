import { Card, Space } from "antd";
import LoginButton from "app/components/LoginButton";
import { Email, LoggedIn, OTP, Password } from "app/components/authSteps";
import { useLogin, usePassword, useValidateOTP } from "app/hooks";
import { type LoginErrors, LoginStatus } from "app/interfaces/auth.interface";
import Head from "next/head";
import { useState } from "react";
import s from '../styles/index.module.css';
import ErrorMessage from "app/components/ErrorMessage";

export default function Home() {
  const [status, setStatus] = useState<LoginStatus | null>(LoginStatus.EMAIL_REQUIRED);
  const [error, setError] = useState<LoginErrors | null>(null);
  const { login, setEmail, email } = useLogin()
  const { validateOTP, code, setCode } = useValidateOTP();
  const { setNewPassword, validatePassword, setPassword } = usePassword();

  const actions: Partial<Record<LoginStatus, () => Promise<{
    status: LoginStatus | null,
    error: LoginErrors | undefined 
  } | undefined>>> = {
    [LoginStatus.EMAIL_REQUIRED]: login,
    [LoginStatus.OTP_REQUIRED]: validateOTP,
    [LoginStatus.PASSWORD_SETUP_REQUIRED]: setNewPassword,
    [LoginStatus.PASSWORD_VALIDATION_REQUIRED]: async () => await validatePassword(email),
  }

  const handleLogin = async () => {
    setError(null);
    if (!status) return;
    const action = actions[status];
    if (!action) return;
    const res = await action();
    if (res?.status) {
      setStatus(res.status);
    }
    if (res?.error) {
      setError(res.error);
    }
  }

  const handleLogout = () => {
    setStatus(LoginStatus.EMAIL_REQUIRED);
    localStorage.clear();
  }

  return (
    <>
      <Head>
        <title>MFA Snippet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={s.root}>
        <Card hoverable className={s.loginCard}>
          <Space className="max-w-md" direction="vertical" size="large">
            <h1 className={s.title}>Login</h1>
            <ErrorMessage error={error} />
            {
              status === LoginStatus.OTP_REQUIRED ? <OTP code={code!} setCode={setCode} />
                :
                status === LoginStatus.PASSWORD_SETUP_REQUIRED || status === LoginStatus.PASSWORD_VALIDATION_REQUIRED ? <Password setPassword={setPassword} status={status} />
                  :
                  status === LoginStatus.SUCCESS ? <LoggedIn handleLogout={handleLogout} />
                    :
                    status === LoginStatus.EMAIL_REQUIRED ? <Email setEmail={setEmail} /> : null
            }
            <LoginButton status={status} handleLogin={() => void handleLogin()}/> 
          </Space>
        </Card>
      </main>
    </>
  );
}
