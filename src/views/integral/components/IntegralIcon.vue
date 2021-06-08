<template>
  <div :class="integralIconClass">
    <div v-if="date" class="integral-icon__date">{{ date }}</div>
    <div class="integral-icon__container" :style="integralIconStyle">
      <svg-icon
        class="integral-icon__svg"
        :name="active ? 'checked' : 'uncheck'"
        :size="size / 2"
      />
    </div>
    <div v-if="integral" class="integral-icon__points">+{{ integral }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { addUnit, formatTime } from "@/utils";
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "IntegralIcon",
  components: { SvgIcon },
  props: {
    size: {
      type: [Number, String],
      default: 44
    },
    active: Boolean,
    integral: [Number, String],
    time: [Number, String]
  },
  setup(props) {
    const integralIconStyle = computed(() => ({
      width: addUnit(props.size),
      height: addUnit(props.size)
    }));

    const date = computed(() => {
      const format = formatTime(props.time, "MM/dd");
      return format ? format : props.time;
    });

    const integralIconClass = computed(() => ({
      "integral-icon": true,
      "integral-icon--active": props.active
    }));

    return {
      integralIconStyle,
      integralIconClass,
      date
    };
  }
};
</script>

<style lang="less" scoped>
.integral-icon {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafaf9;
    border-radius: 6px;
  }
  &__date {
    margin-bottom: 5px;
    font-size: 12px;
  }

  &__points {
    margin-top: 5px;
    font-weight: bold;
    font-size: 12px;
    color: #735400;
  }

  &--active {
    .integral-icon__container {
      background: #fbf2d9;
    }
  }
}
</style>
