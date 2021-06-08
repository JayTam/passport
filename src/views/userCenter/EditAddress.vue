<template>
  <div class="edit-address">
    <te-header :title="$t('UserCenter.EditAddress')" background="#fff" border />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="addressInfo.firstName"
          name="firstName"
          :label="$t('UserCenter.FirstName')"
          placeholder="First Name"
          input-align="right"
          :rules="[{ required: true, message: 'please input first name' }]"
        />
        <van-field
          v-model="addressInfo.lastName"
          name="lastName"
          :label="$t('UserCenter.LastName')"
          placeholder="Last Name"
          input-align="right"
          :rules="[{ required: true, message: 'please input last name' }]"
        />
        <van-field
          v-model="addressInfo.telephone"
          type="tel"
          name="phoneNum"
          :label="'UserCenter.PhoneNumber'"
          placeholder="Phone Number"
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
      class="edit-address__button"
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
import {
  getSingleUserAddressInfo,
  updateSingleUserAddressInfo
} from "@/apis/address";
import { toastPassportAxiosError } from "@/utils";
import AreaField from "@/views/userCenter/components/AreaField";

export default {
  name: "EditAddress",
  components: { AreaField },
  data() {
    return {
      cityIndex: 0,
      addressInfo: {
        firstName: "",
        lastName: "",
        telephone: "",
        area: "",
        zipCode: "",
        address: ""
      },
      submitFlag: false
    };
  },
  created: async function() {
    const res = await getSingleUserAddressInfo(this.$route.params.id);
    const data = res.data;
    const { country, province, city, zip_code } = res.data;
    this.addressInfo = Object.assign(this.addressInfo, data);
    this.addressInfo.firstName = this.addressInfo.consignee.split("/")[0];
    this.addressInfo.lastName = this.addressInfo.consignee.split("/")[1];
    this.addressInfo.area = `${country}/${province}/${city}`;
    this.addressInfo.zipCode = zip_code ? zip_code : "";
  },
  methods: {
    async onSubmit() {
      const [country, province, city] = this.addressInfo.area.split("/");
      const data = {
        id: this.$route.params.id,
        consignee: this.addressInfo.firstName + "/" + this.addressInfo.lastName,
        telephone: this.addressInfo.telephone,
        country,
        province,
        city,
        area: "",
        address: this.addressInfo.address,
        zip_code: this.addressInfo.zip_code,
        is_default_addr: true
      };

      if (!this.submitFlag) {
        try {
          this.isloading = true;
          this.submitFlag = true;
          await updateSingleUserAddressInfo(data);
          this.$router.back();
        } catch (e) {
          toastPassportAxiosError(e);
          this.submitFlag = false;
        } finally {
          this.isloading = false;
        }
      }
    },
    onAreaChange({ value }) {
      if (Array.isArray(value) && value.length > 0) {
        const zipCode = value[value.length - 1].zipCode;
        this.addressInfo.zipCode = zipCode ? zipCode : "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.edit-address {
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
