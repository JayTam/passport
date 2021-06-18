<template>
  <svg class="svg-icon" aria-hidden="true" :style="iconStyle" @click="onClick">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { useRoute } from "./composables/useRoute";
import { addUnit } from "@/utils";

export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 25,
    },
    to: Object,
    replace: Boolean,
    url: String,
  },
  emits: ["click"],
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    iconStyle() {
      return {
        fontSize: addUnit(this.size),
      };
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const onClick = () => {
      route();
      emit("click");
    };

    return {
      onClick,
    };
  },
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
