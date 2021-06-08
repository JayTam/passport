<template>
  <div class="invite-popup">
    <van-popup
      v-model:show="showPopup"
      round
      position="bottom"
      :style="{ height: '200px' }"
      closeable
    >
      <van-cell-group class="invite-popup__content" :border="false">
        <van-cell
          :title="$t('TeamUp.CopyLink')"
          clickable
          v-clipboard="url"
          v-clipboard:success="onCopySuccess"
        >
          <template #extra>
            <svg-icon name="link" size="30" />
          </template>
        </van-cell>
      </van-cell-group>

      <p
        class="invite-popup__description"
        v-html="$t('TeamUp.description')"
      ></p>
      <!--   以下是带海报的文案     -->
      <!--        Send the link or invitation picture to a friend,<br />-->
      <!--        and the friend can click the link or scan the QR code of the picture to join the team-->
    </van-popup>
  </div>
</template>

<script>
import { computed } from "vue";
import SvgIcon from "@/components/SvgIcon";
import { Dialog } from "vant";
import { useI18n } from "vue-i18n";

export default {
  name: "InvitePopup",
  components: { SvgIcon },
  props: {
    show: { type: Boolean, default: false },
    url: String
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const { t } = useI18n();
    const showPopup = computed({
      get() {
        return props.show;
      },
      set(val) {
        emit("update:show", val);
      }
    });

    return {
      showPopup,
      onCopySuccess() {
        Dialog.alert({
          message: t("TeamUp.linkCopiedInvite")
        });
        showPopup.value = false;
      }
    };
  }
};
</script>

<style lang="less" scoped>
.invite-popup {
  &__content {
    padding-top: 50px;
  }

  &__description {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 12px;
    line-height: 14px;
    width: 70%;
    color: #d8d8d8;
  }
}
</style>
