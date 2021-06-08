export function isDef(val) {
  return val !== undefined && val !== null;
}

export function isFunction(val) {
  return typeof val === "function";
}

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isNumeric(val) {
  return typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}
