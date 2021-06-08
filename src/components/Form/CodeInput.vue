<template>
  <te-input
    type="tel"
    :placeholder="placeholder"
    :disabled="disabled"
    :model-value="modelValue"
    :maxLength="maxLength"
    @input="handleInput"
  >
    <template #button-right>
      <te-button
        width="151"
        color="#f6f6f6"
        :disabled="waiting"
        :loading="loading"
        @click="handleClick"
        :tab-index="-1"
        dark
      >
        {{ buttonText }}
      </te-button>
    </template>
  </te-input>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import TeInput from "./Input";
import TeButton from "../Button";
import { useI18n } from "vue-i18n";

export default {
  name: "TeCodeInput",
  components: { TeButton, TeInput },
  props: {
    placeholder: String,
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    waitTime: { type: Number, default: 60 },
    modelValue: String,
    maxLength: [Number, String],
    codeRequest: { type: Function }
  },
  emits: ["update:modelValue", "send-code"],
  setup(props, { emit }) {
    const { t } = useI18n();

    const state = reactive({
      waitResendTime: props.waitTime
    });
    const inputClass = computed(() => {
      return {
        "is-disabled": props.disabled
      };
    });

    const handleInput = event => {
      emit("update:modelValue", event.target.value);
    };

    const handleClick = async () => {
      let timer = null;
      try {
        await props.codeRequest();
        --state.waitResendTime;
        timer = setInterval(() => {
          --state.waitResendTime;
          if (state.waitResendTime <= 0) {
            clearInterval(timer);
            state.waitResendTime = props.waitTime;
          }
        }, 1000);
      } catch (e) {
        console.error(e);
        clearInterval(timer);
        state.waitResendTime = props.waitTime;
      }
    };

    const buttonText = computed(() => {
      return state.waitResendTime === props.waitTime
        ? t("Common.GetCode")
        : t("Common.Resend") + `(${state.waitResendTime})`;
    });

    const waiting = computed(() => {
      return state.waitResendTime < props.waitTime;
    });

    return {
      ...toRefs(state),
      inputClass,
      buttonText,
      waiting,
      handleInput,
      handleClick
    };
  }
};
</script>
