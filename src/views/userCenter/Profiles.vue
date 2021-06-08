<template>
  <div class="profiles">
    <te-header :title="$t('UserCenter.Profiles')" background="#fff" border />

    <van-cell-group :border="false">
      <van-cell
        :title="$t('UserCenter.ProfilePhoto')"
        :to="{ name: 'EditAvatar' }"
        :border="false"
        center
        is-link
      >
        <template #default>
          <div class="profiles__avatar-container">
            <van-image
              class="profiles__avatar"
              :src="avatar"
              alt="profiles"
              round
            />
          </div>
        </template>
      </van-cell>
      <van-cell
        :title="$t('UserCenter.Name')"
        :to="{ name: 'EditName' }"
        is-link
        :border="false"
        :value="user.name"
      />
      <van-cell
        :title="$t('UserCenter.UserID')"
        :border="false"
        :value="user.uid"
      />
      <van-cell
        :title="$t('UserCenter.Gender')"
        is-link
        :border="false"
        :value="genderText"
        @click="showGender = true"
      />
      <van-cell
        :title="$t('UserCenter.DateOfBirth')"
        is-link
        :border="false"
        :value="user.birthday"
        @click="showBirth = true"
      />
      <van-cell
        :title="$t('UserCenter.Bio')"
        :to="{ name: 'EditBio' }"
        is-link
        :border="false"
        :value="user.signature"
      />
    </van-cell-group>

    <van-cell-group title=" " :border="false">
      <van-cell
        :title="$t('UserCenter.AddressBook')"
        :to="{ name: 'AddressBook' }"
        is-link
        :border="false"
      />
    </van-cell-group>

    <van-popup
      v-model:show="showGender"
      round
      position="bottom"
      :style="{ height: '300px' }"
    >
      <van-picker
        :title="$t('UserCenter.Gender')"
        show-toolbar
        :default-index="defaultGenderIndex"
        :columns="gender"
        @cancel="showGender = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup
      v-model:show="showBirth"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        @cancel="showBirth = false"
        @confirm="onBirthConfirm"
        type="date"
        :title="$t('UserCenter.DateOfBirth')"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import { mapGetters } from "vuex";
import { formatTime, toastPassportAxiosError } from "@/utils";

export default {
  name: "Profile",
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      user: this.$store.state.user,
      showGender: false,
      showBirth: false,
      submitFlag: true,
      gender: [
        { text: this.$t("UserCenter.Male"), value: 2 },
        { text: this.$t("UserCenter.Female"), value: 3 },
        { text: this.$t("UserCenter.Other"), value: 1 }
      ],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(1996, 0, 1)
    };
  },
  computed: {
    defaultGenderIndex: function() {
      return this.gender.findIndex(item => item.value === this.user.gender);
    },
    genderText() {
      switch (this.user.gender) {
        case 1:
          return this.$t("UserCenter.Other");
        case 2:
          return this.$t("UserCenter.Male");
        case 3:
          return this.$t("UserCenter.Female");
        default:
          return this.$t("UserCenter.Other");
      }
    },
    ...mapGetters("user", ["avatar"])
  },
  methods: {
    async onConfirm(value) {
      const data = {
        gender: value.value
      };
      if (this.submitFlag) {
        this.submitFlag = false;
        try {
          await this.$store.dispatch("user/updateUserInfo", data);
          this.showGender = false;
        } catch (e) {
          toastPassportAxiosError(e);
        } finally {
          this.submitFlag = true;
        }
      }
    },
    async onBirthConfirm(value) {
      const data = {
        birthday: formatTime(value, "yyyy-MM-dd")
      };
      if (this.submitFlag) {
        this.submitFlag = false;
        try {
          await this.$store.dispatch("user/updateUserInfo", data);
          this.showBirth = false;
        } catch (e) {
          toastPassportAxiosError(e);
        } finally {
          this.submitFlag = true;
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.profiles {
  background-color: @color-background;
  height: 100vh;

  &__avatar-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
  }

  &__avatar {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
}
</style>
