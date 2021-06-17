<template>
  <div :style="MySelectStyle" :class="{ MySelect: true, isPhone: isPhone }">
    <select
      name=""
      id=""
      ref="MySelect"
      @change="$emit('seleChange', value)"
      v-model="value"
    >
      <option v-for="item in sdata" :key="item.label" :value="item.value">{{
        item.label
      }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "MySelect",
  props: ["width", "type", "exdata", "exvalue", "isPhone"],
  data() {
    return {
      value: "",
      Month: [],
      Day: [],
      Year: [],
      Gender: [
        {
          value: "",
          label: "Gender",
        },
        {
          value: "2",
          label: "MEN",
        },
        {
          value: "3",
          label: "WOMEN",
        },
      ],
      MySelectStyle: {
        width: this.width,
      },
      sdata: [],
    };
  },
  computed: {},
  mounted() {
    // 如果select有传入默认选项 , 则显示默认选项
    if (this.exvalue) {
      this.value = this.exvalue;
    }
    for (let i = 1; i <= 12; i++) {
      this.Month.push({ value: i, label: i });
    }
    this.Month.unshift({ value: "", label: "Month" });
    for (let i = 1; i <= 31; i++) {
      this.Day.push({ value: i, label: i });
    }
    this.Day.unshift({ value: "", label: "Day" });

    for (let i = 2020; i >= 1900; i--) {
      this.Year.push({ value: i, label: i });
    }
    this.Year.unshift({ value: "", label: "Year" });

    if (this.type && this.exdata) {
      throw "type和exdata参数只能传一个";
    }
    // 如果是年月日,则通过type参数得到相应的下拉列表
    if (this.type) {
      this.sdata = this[this.type];
    }
    // 如果是其他类型的话,则通过传入的data数据生成相应的下拉列表
    if (this.exdata) {
      this.sdata = this.exdata;
    }

    this.$nextTick(function() {
      this.$refs.MySelect.firstElementChild.disabled = true;
    });
  },
  methods() {},
};
</script>

<style lang="less" scoped>
.MySelect {
  outline: none;
  // padding: 11px 20px;
  font-size: 14px;
  padding: 7px 7px;
  background: #f6f6f6;
  border: 2px solid #f6f6f6;
  border-radius: 8px;
  text-align: center;
  select {
    width: 100%;
    border: none;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    background-color: transparent;
    option {
      width: 100%;
    }
  }
}
.isPhone {
  padding: 11px 7px;
}
</style>
