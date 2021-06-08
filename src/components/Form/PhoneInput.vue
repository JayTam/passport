<template>
  <te-input
    type="tel"
    :placeholder="placeholder"
    :disabled="disabled"
    :model-value="phone"
    @input="handleInput"
  >
    <template #button-left>
      <te-button width="80" @click="popupShow = true" color="#f6f6f6" dark>
        {{ code }}
      </te-button>
    </template>
  </te-input>
  <van-popup
    v-model:show="popupShow"
    round
    position="bottom"
    :style="{ height: '50%' }"
    teleport="body"
  >
    <van-picker
      :columns="columns"
      @confirm="handleConfirm"
      @cancel="popupShow = false"
      :title="t('Common.AreaCode')"
      :confirm-button-text="t('Common.Confirm')"
      :cancel-button-text="t('Common.Cancel')"
    />
  </van-popup>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import TeInput from "./Input";
import TeButton from "@/components/Button";
import { useI18n } from "vue-i18n";

export default {
  name: "TePhoneInput",
  components: { TeButton, TeInput },
  props: {
    placeholder: String,
    disabled: { type: Boolean, default: false },
    code: { type: String, default: "+86" },
    phone: String
  },
  emits: ["update:code", "update:phone", "input"],
  setup(props, { emit }) {
    const state = reactive({
      columns: ["+62", "+86"],
      popupShow: false
    });
    const { t } = useI18n();
    const inputClass = computed(() => {
      return {
        "is-disabled": props.disabled
      };
    });

    const handleInput = event => {
      const phone = event.target.value;
      const code = props.code;
      emit("update:phone", phone);
      emit("input", { phone, code, fullPhone: code + phone });
    };

    const handleConfirm = value => {
      state.popupShow = false;
      const phone = props.phone;
      const code = value;
      emit("update:code", value);
      emit("input", { phone, code, fullPhone: code + phone });
    };

    return {
      ...toRefs(state),
      inputClass,
      handleConfirm,
      handleInput,
      t
    };
  }
};
</script>
