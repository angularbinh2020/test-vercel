import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "../store";
import "sites/mogivi/styles/index.scss";
import { PageDataContext } from "context/page-data.context";
import IPageData from "models/IPageData";
import { Roboto } from "next/font/google";
import styles from "sites/mogivi/styles/global.module.scss";
import classNames from "classnames";
import "sites/mogivi/styles/global.css";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["400", "500", "700", "900"],
});
interface Props extends AppProps {
  pageProps: {
    pageData: IPageData;
  };
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <PageDataContext.Provider value={pageProps?.pageData}>
          <main className={classNames(roboto.className, styles.layout)}>
            <Component {...pageProps} />
          </main>
        </PageDataContext.Provider>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
