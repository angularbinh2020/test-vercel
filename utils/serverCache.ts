import { NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND } from "const/config";
import NodeCache from "node-cache";
import logger from "./logger";

class ServerCacheService {
  serverCache = new NodeCache();
  set(
    key: NodeCache.Key,
    value: any,
    ttl: string | number = NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND
  ) {
    return this.serverCache.set(key, value, ttl);
  }

  get(key: NodeCache.Key) {
    return this.serverCache.get(key);
  }

  queryWithCacheApi(key: NodeCache.Key, apiRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const storedResponse = this.get(key);

      if (storedResponse) {
        logger.info(`Get response from cache : ${key} `);
        resolve(storedResponse);
        return;
      }

      apiRequest()
        .then((response: any) => {
          this.set(key, response);
          resolve(response);
        })
        .catch(reject);
    });
  }

  queryAxios(key: NodeCache.Key, apiRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const storedResponse = this.get(key);

      if (storedResponse) {
        logger.info(`Get response from cache : ${key} `);
        resolve(storedResponse);
        return;
      }

      apiRequest()
        .then((response: any) => {
          this.set(key, {
            data: response.data,
          });
          resolve(response);
        })
        .catch(reject);
    });
  }
}

export default new ServerCacheService();
