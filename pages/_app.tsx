import "../styles/globals.css";
import "../styles/MultiColorProgressBar.css";

import type { AppProps } from "next/app";
import { StandardLayout } from "~/layouts/standard-layout/StandardLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StandardLayout>
      <Component {...pageProps} />
    </StandardLayout>
  );
}

export default MyApp;
