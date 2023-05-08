import axios from "axios";
import { DATE_TIME_FORMAT } from "const/date-time-format";
import dayjs from "dayjs";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    console.log(
      `[${dayjs().format(
        DATE_TIME_FORMAT.FULL
      )}] ${config.method?.toUpperCase()}: ${config.url}`
    );
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: () => 15000,
  onRetry: function onRetry(retryCount, error, requestConfig) {
    console.log(`Retry ${retryCount} :`, requestConfig);
    return;
  },
});

export default axiosInstance;
