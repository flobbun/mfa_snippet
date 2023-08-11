import { type AppType } from "next/dist/shared/lib/utils";
import "app/styles/globals.css";
import { ConfigProvider } from "antd";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ConfigProvider theme={{
      "token": {
        "colorInfo": "#1f7588",
        "colorTextBase": "#060505",
        "colorPrimaryBg": "#151817",
        "colorPrimaryBorder": "#151616",
        "colorPrimary": "#070708",
        "colorText": "#000000"
      }
    }
    }>
      <Component {...pageProps} />;
    </ConfigProvider>
  )
};

export default MyApp;
