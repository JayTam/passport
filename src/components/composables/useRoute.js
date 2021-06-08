import { getCurrentInstance } from "vue";

export function route(vm) {
  const router = vm.$router;
  const { to, url, replace } = vm;
  if (router && to) {
    router[replace ? "replace" : "push"](to);
  } else if (url) {
    replace ? location.replace(url) : (location.href = url);
  }
}

export function useRoute() {
  const vm = getCurrentInstance().proxy;
  return () => {
    route(vm);
  };
}
