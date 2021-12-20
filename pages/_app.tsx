import "../styles/globals.css";
import "../styles/MultiColorProgressBar.css";

import App from "next/app";
import type { AppProps } from "next/app";
import { StandardLayout } from "~/layouts/standard-layout/StandardLayout";
import { ApiBaseUrl, UserId } from "~/constants/global";
import { UserContextProvider } from "~/context/UserContextProvider";

function MyApp({
  Component,
  pageProps,
  userProps,
}: AppProps & { userProps: any }) {
  const { channels } = userProps;

  return (
    <UserContextProvider channels={channels}>
      <StandardLayout>
        <Component {...pageProps} />
      </StandardLayout>
    </UserContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const data = await (
    await fetch(`${ApiBaseUrl}/user/${UserId}/channels`)
  ).json();

  // TODO: Lots of type safety improvements necessary throughout the application
  return {
    ...appProps,
    userProps: {
      channels: data.channels,
    },
  };
};

export default MyApp;
