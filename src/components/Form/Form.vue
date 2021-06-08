<template>
  <form>
    <slot />
  </form>
</template>

<script>
import { provide, toRefs } from "vue";
import { FORM_KEY, formEvents } from "./token";
import mitt from "mitt";

export default {
  name: "TeForm",
  props: {
    model: { type: Object, default: () => ({}) },
    rules: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const formMitt = mitt();
    const fields = [];

    formMitt.on(formEvents.addField, filed => {
      if (filed) fields.push(filed);
    });

    formMitt.on(formEvents.removeField, filed => {
      if (filed.prop) fields.splice(fields.indexOf(filed), 1);
    });

    /**
     * 检查表单所有字段
     */
    function validate() {
      let count = 0;
      let isError = false;
      let invalidFields = {};
      return new Promise((resolve, reject) => {
        if (fields.length === 0) {
          resolve();
          return;
        }

        fields.map(filed => {
          filed
            .validate()
            .catch(({ fields }) => {
              isError = true;
              invalidFields = { ...invalidFields, fields };
            })
            .finally(() => {
              if (++count === fields.length) {
                isError ? reject(invalidFields) : resolve();
              }
            });
        });
      });
    }

    /**
     * 校验指定的表单字段
     * @param { string[] | string } props 字段名
     */
    function validateField(props) {
      props = [].concat(props);
      let count = 0;
      let isError = false;
      let invalidFields = {};
      return new Promise((resolve, reject) => {
        const filteredFields = fields.filter(field =>
          props.includes(field.prop)
        );
        if (filteredFields.length === 0) {
          resolve();
          return;
        }

        filteredFields.map(filed => {
          filed
            .validate()
            .catch(({ fields }) => {
              isError = true;
              invalidFields = { ...invalidFields, fields };
            })
            .finally(() => {
              if (++count === filteredFields.length) {
                isError ? reject(invalidFields) : resolve();
              }
            });
        });
      });
    }

    provide(FORM_KEY, {
      ...toRefs(props),
      formMitt,
      validateField
    });

    return {
      validate,
      validateField
    };
  }
};
</script>

<style scoped></style>
