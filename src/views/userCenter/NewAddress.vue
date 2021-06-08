<template>
  <div class="new-address">
    <te-header :title="$t('UserCenter.NewAddress')" background="#fff" border />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="addressInfo.firstName"
          name="firstName"
          :label="$t('UserCenter.FirstName')"
          :placeholder="$t('UserCenter.FirstName')"
          input-align="right"
          :rules="[{ required: true, message: 'please input first name' }]"
        />
        <van-field
          v-model="addressInfo.lastName"
          name="lastName"
          :label="$t('UserCenter.LastName')"
          :placeholder="$t('UserCenter.LastName')"
          input-align="right"
          :rules="[{ required: true, message: 'please input last name' }]"
        />
        <van-field
          v-model="addressInfo.telephone"
          type="tel"
          name="phoneNum"
          :label="$t('UserCenter.PhoneNumber')"
          :placeholder="$t('UserCenter.PhoneNumber')"
          label-width="8em"
          input-align="right"
          :rules="[
            {
              required: true,
              message: 'Please enter a valid mobile phone number'
            }
          ]"
        />
      </van-cell-group>
      <van-cell-group title=" ">
        <area-field v-model="addressInfo.area" @change="onAreaChange" />

        <van-field
          readonly
          name="codePicker"
          v-model="addressInfo.zipCode"
          :label="$t('UserCenter.code')"
          visible-item-count="100"
          label-width="10em"
          input-align="right"
        />

        <van-field
          v-model="addressInfo.address"
          rows="3"
          autosize
          :label="$t('UserCenter.AddressLine')"
          type="textarea"
          maxlength="100"
          :placeholder="$t('UserCenter.Street')"
          show-word-limit
        />
      </van-cell-group>
    </van-form>
    <van-button
      class="new-address__button"
      round
      block
      type="info"
      native-type="submit"
      @click="onSubmit"
    >
      {{ $t("UserCenter.Save") }}
    </van-button>
  </div>
</template>
<script>
import { createUserAddressInfo } from "@/apis/address";
import { toastPassportAxiosError } from "@/utils";
import { Toast } from "vant";
import AreaField from "@/views/userCenter/components/AreaField";

export default {
  name: "NewAddress",
  components: { AreaField },
  data() {
    return {
      submitFlag: true,
      showProPicker: false,
      showCityPicker: false,
      showCodePicker: false,
      addressInfo: {
        firstName: "",
        lastName: "",
        telephone: "",
        area: "",
        zipCode: "",
        address: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      const [country, province, city] = this.addressInfo.area.split("/");
      const data = {
        uid: this.$store.state.user.uid,
        consignee: this.addressInfo.firstName + "/" + this.addressInfo.lastName,
        telephone: this.addressInfo.telephone,
        country,
        province,
        city,
        area: "",
        address: this.addressInfo.address,
        zip_code: this.addressInfo.zipCode,
        is_default_addr: true
      };
      if (this.submitFlag) {
        this.submitFlag = false;
        try {
          await createUserAddressInfo(data);
          Toast.success("创建成功");
          this.$router.back();
        } catch (e) {
          toastPassportAxiosError(e);
        } finally {
          this.submitFlag = true;
        }
      }
    },
    onAreaChange({ value }) {
      if (Array.isArray(value) && value.length > 0) {
        this.addressInfo.zipCode = value[value.length - 1].zipCode;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.new-address {
  background: @color-background;
  min-height: 100vh;

  &__button {
    position: fixed;
    bottom: 56px;
    height: 48px;
    width: 84%;
    left: 50%;
    transform: translateX(-50%);
    line-height: 48px;
    text-align: center;
    background: #ffe256;
    font-size: 18px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
  }
}
</style>
