import { getAddressList } from "@/apis/address";

export const getArea = async (code = 0) => {
  const response = await getAddressList(code);
  let list = [];
  const data = response.data?.data;
  if (Array.isArray(data) && data.length > 0) {
    list = data
      .map(item => {
        let obj = {};
        obj.text = item.name;
        obj.value = item.area_code;
        obj.zipCode = item.zip_code;
        obj.children = [];
        return obj;
      })
      // 不要其他选项
      .filter(item => item.value !== "1");
  }
  return list.length > 0 ? list : null;
};

export const findArea = (areaOptions, code) => {
  if (areaOptions.length === 0) {
    return null;
  }

  for (const areaOption of areaOptions) {
    if (areaOption.value === code) {
      return areaOption;
    } else if (areaOption.children) {
      const result = findArea(areaOption.children, code);
      if (result !== null) return result;
    }
  }
  return null;
};

export const parseAreas = async (areas, areaOptions = []) => {
  const areaCodes = areas.split("/");
  const selectedOptions = [];
  areaOptions = await getArea();
  let area;
  for (const code of areaCodes) {
    area = findArea(areaOptions, code);
    if (area) {
      area.children = await getArea(code);
      selectedOptions.push(area);
    }
  }
  if (area) {
    area.children = null;
  }
  return {
    selectedOptions,
    options: areaOptions,
  };
};

export const stringifyAreas = () => {};
