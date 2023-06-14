import axios from "apis/axios";
import { mapBaseApiUrl } from "utils/mapBaseApiUrl";
import { v4 } from "uuid";
const API_URL = {
  SEARCH_LOG_CREATE_EVENT: "v1/search-log/createEvent",
  LINK_LOG_CREATE_EVENT: "v1/link-log/createEvent",
};

mapBaseApiUrl(API_URL, process.env.NEXT_PUBLIC_TRACKING_API_HOST);

const USER_ID_LOCAL_STORAGE = "USER_ID_LOCAL_STORAGE";
const DEVICE_ID_LOCAL_STORAGE = "DEVICE_ID_LOCAL_STORAGE";

const getId = (localStorageName: string) => {
  const storedId = localStorage.getItem(localStorageName);
  if (storedId) return storedId;
  const newId = v4();
  localStorage.setItem(localStorageName, newId);
  return newId;
};

export enum APP_TRACKING {
  MOGIVI = "mogivi.vn",
  CLIENT = "client",
  BROKER = "broker",
  MOGIVERSE = "mogiverse",
}

export enum TYPE_TRACKING {
  APARTMENT_NEWS = "apartment_news",
  PROJECTS = "projects",
  CHAT_BROKER_BROKER = "chat-broker-broker",
  BLOGS = "blogs",
  CHAT_NOW = "chat-now",
  SHOW_PHONE = "show-phone",
  MAKE_CALL = "make-call",
  CHAT_BROKER_SUPPORT = "chat-broker-support",
  CHAT_CLIENT_SUPPORT = "chat-client-support",
  CHAT_CLIENT_BROKER = "chat-client-broker",
}

interface SearchTracking {
  pageUrl: string;
  type?: TYPE_TRACKING;
  app?: APP_TRACKING;
  keyword: string;
}

export const searchLog = ({ pageUrl, type, app, keyword }: SearchTracking) => {
  const requestBody = {
    uidRedis: "",
    deviceId: getId(DEVICE_ID_LOCAL_STORAGE),
    type: type || TYPE_TRACKING.APARTMENT_NEWS,
    screenName: pageUrl,
    description: "",
    firebaseToken: "",
    app: app || APP_TRACKING.CLIENT,
    userId: getId(USER_ID_LOCAL_STORAGE),
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    keyword,
  };
  axios.post(API_URL.SEARCH_LOG_CREATE_EVENT, requestBody);
};

interface OtherLogTracking {
  type?: TYPE_TRACKING;
  pageUrl: string;
  app?: APP_TRACKING;
  link: string;
  linkTitle: string;
  linkId: string | number;
  phone?: string;
}

export const otherLog = ({
  type,
  pageUrl,
  app,
  link,
  linkId,
  linkTitle,
  phone,
}: OtherLogTracking) => {
  const requestBody = {
    uidRedis: "",
    deviceId: getId(DEVICE_ID_LOCAL_STORAGE),
    type: type || TYPE_TRACKING.APARTMENT_NEWS,
    screenName: pageUrl,
    description: "",
    firebaseToken: "",
    app: app || APP_TRACKING.MOGIVI,
    userId: getId(USER_ID_LOCAL_STORAGE),
    fullName: "",
    email: "",
    gender: "",
    phone: phone || "",
    link,
    linkId,
    linkTitle,
    text: "",
    priceStart: null,
    typeText: "",
    jsonData: "",
  };
  axios.post(API_URL.LINK_LOG_CREATE_EVENT, requestBody);
};
