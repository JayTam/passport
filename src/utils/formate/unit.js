import { isDef, isNumeric } from "../index";

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  return isNumeric(value) ? `${value}px` : String(value);
}
