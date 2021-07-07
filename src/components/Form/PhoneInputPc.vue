<template>
  <te-input
    type="tel"
    :placeholder="placeholder"
    :disabled="disabled"
    :model-value="phone"
    @input="handleInput"
  >
    <template #button-left>
      <my-select
        :isPhone="true"
        :exdata="columns"
        :exvalue="code"
        @seleChange="AreaCodeHandle"
      ></my-select>
    </template>
  </te-input>
</template>

<script>
import { reactive, toRefs } from "vue";
import TeInput from "./Input";
import { useI18n } from "vue-i18n";
import MySelect from "../MySelect.vue";

export default {
  name: "TePhoneInputPc",
  components: { TeInput, MySelect },
  props: {
    placeholder: String,
    disabled: { type: Boolean, default: false },
    code: { type: String, default: "+86" },
    phone: String,
  },
  emits: ["update:code", "update:phone", "input"],
  setup(props, { emit }) {
    const state = reactive({
      columns: [
        { value: "", label: "请选择" },
        { value: "+62", label: "ID +62" },
        { value: "+86", label: "CN +86" },
      ],
    });
    const { t } = useI18n();

    const handleInput = event => {
      if (event.target.nodeName === "SELECT") {
        return;
      }
      const phone = event.target.value;
      const code = props.code;
      emit("update:phone", phone);
      emit("input", { phone, code, fullPhone: code + phone });
    };

    const AreaCodeHandle = value => {
      const phone = props.phone;
      const code = value;
      emit("update:code", value);
      emit("input", { phone, code, fullPhone: code + phone });
    };

    return {
      ...toRefs(state),
      handleInput,
      t,
      MySelect,
      AreaCodeHandle,
      props,
    };
  },
};
</script>
