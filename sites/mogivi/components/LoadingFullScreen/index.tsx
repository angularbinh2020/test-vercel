import { useEffect } from "react";
import { useGetLoadingFullScreenState } from "sites/mogivi/redux/loadingFullScreen.slice";
import styles from "./styles.module.scss";

const LoadingFullScreen = () => {
  const { isLoading } = useGetLoadingFullScreenState();

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "unset";
  }, [isLoading]);

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return null;
};

export default LoadingFullScreen;
