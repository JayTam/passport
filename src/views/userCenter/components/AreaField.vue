<template>
  <van-field
    readonly
    clickable
    :name="name"
    v-model="fieldValue"
    :label="$t(label)"
    label-width="4em"
    :input-align="inputAlign"
    @click="show = true"
    right-icon="arrow"
  />
  <van-popup v-model:show="show" position="bottom" round>
    <van-cascader
      v-model="cascader"
      :title="$t(label)"
      :options="options"
      @change="onChange"
      @close="show = false"
      @finish="onFinish"
      active-color="#ffe256"
    />
  </van-popup>
</template>

<script>
import { onMounted, watch, reactive, toRefs } from "vue";
import { findArea, getArea, parseAreas } from "./area";

export default {
  name: "AreaField",
  props: {
    name: {
      type: String,
      default: "area",
    },
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "UserCenter.Area",
    },
    inputAlign: {
      type: String,
      default: "right",
    },
    // 地址选择器深度，最大可选择层级
    deep: {
      type: Number,
      default: 3,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const state = reactive({
      show: false,
      fieldValue: "",
      options: [],
      cascader: "",
    });

    const parseAreasToText = areas => {
      parseAreas(areas).then(({ options, selectedOptions }) => {
        state.options = options;
        state.fieldValue = selectedOptions.map(({ text }) => text).join("/");
        state.cascader = selectedOptions[selectedOptions.length - 1]?.value;
      });
    };

    onMounted(() => {
      parseAreasToText(props.modelValue);
    });

    watch(
      () => props.modelValue,
      val => parseAreasToText(val)
    );

    const onChange = async ({ value, selectedOptions }) => {
      const area = findArea(state.options, value);
      if (area) {
        if (selectedOptions.length === props.deep) {
          area.children = null;
          return;
        }
        area.children = await getArea(area.value);
      }
    };

    const onFinish = ({ selectedOptions }) => {
      const value = selectedOptions.map(({ value }) => value).join("/");
      state.fieldValue = selectedOptions.map(({ text }) => text).join("/");
      emit("update:modelValue", value);
      emit("change", { value: JSON.parse(JSON.stringify(selectedOptions)) });
      state.show = false;
    };

    return {
      ...toRefs(state),
      onChange,
      onFinish,
    };
  },
};
</script>

<style scoped></style>
