import axios from "axios";
import store from "@/store";
import { generateTenantUrl } from "@/utils";

const instance = axios.create({
  baseURL: generateTenantUrl(process.env.VUE_APP_BRAND_CENTER_URL),
  headers: {
    "Paasport-App-Id": process.env.VUE_APP_BRAND_CENTER_APP_ID
  }
});

instance.interceptors.request.use(
  config => {
    const tenement = store.state.tenant.name;
    if (tenement) config.headers["paasport-tenant-name"] = tenement;
    if (store.state.auth.brandCenterToken)
      config.headers["X-Auth-Token"] = store.state.auth.brandCenterToken;
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
