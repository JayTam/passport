import axios from "axios";
import store from "@/store";
import JSONBigint from "json-bigint";

const instance = axios.create({
  baseURL: process.env.VUE_APP_PAASPORT_URL,
  headers: {
    "Paasport-App-Id": process.env.VUE_APP_PAASPORT_APP_ID
  },
  transformResponse: [
    // 因为id是一个bigint，JSON.parse解析会发生精度丢失问题，所以使用JSONBigint解析，将超过精度的Number类型转换成String类型
    responseString =>
      JSONBigint.parse(responseString, (key, value) => {
        return value?._isBigNumber ? value.toString() : value;
      })
  ]
});

instance.interceptors.request.use(
  config => {
    const tenement = store.state.tenant.name;
    if (tenement) config.headers["paasport-tenant-name"] = tenement;
    if (store.state.auth.passportToken)
      config.headers["X-Auth-Token"] = store.state.auth.passportToken;
    if (store.state.auth.deviceId)
      config.headers["Paasport-device-id"] = store.state.auth.deviceId;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
