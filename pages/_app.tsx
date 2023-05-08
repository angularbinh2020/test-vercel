import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "../store";
import "sites/mogivi/styles/index.scss";
import { PageDataContext } from "context/page-data.context";
import IPageData from "models/IPageData";

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
          <Component {...pageProps} />
        </PageDataContext.Provider>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
