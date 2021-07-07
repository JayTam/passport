import { Toast, Dialog } from "vant";
import passportError from "../languages/zh/passport.json";
import brandCenterError from "../languages/zh/brandCenterError.json";

export function resolvePassportAxiosError(axiosError) {
  if (axiosError.response) {
    const code = axiosError.response.data.err_code;
    return passportError[code];
  }
}

export function toastPassportAxiosError(axiosError) {
  const message = resolvePassportAxiosError(axiosError);
  if (message) {
    Toast.fail(message);
  }
}

export function resolveBrandCenterAxiosError(axiosError) {
  if (axiosError.response) {
    const code = axiosError.response.data.err_code;
    return axiosError.response.data.message
      ? axiosError.response.data.message
      : brandCenterError[code];
  }
}

export function toastBrandCenterAxiosError(axiosError) {
  const message = resolveBrandCenterAxiosError(axiosError);
  if (message) {
    Toast.fail(message);
  }
}

export function alertBrandCenterAxiosError(axiosError) {
  const message = resolveBrandCenterAxiosError(axiosError);
  if (message) {
    Dialog.alert({
      message,
    });
  }
}
