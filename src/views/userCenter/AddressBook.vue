<template>
  <div class="address-book">
    <te-header :title="$t(pageTitle)" fixed background="#fff" border>
      <template #right></template>
    </te-header>
    <template v-if="!loading">
      <van-cell
        class="address-book__cell"
        :class="{ active: item.id === activeId }"
        v-for="item in list"
        :key="item.id"
        clickable
        @click="onChange(item.id)"
      >
        <template #title>
          <span class="address-book__title">{{ item.consignee }}</span>
          <span class="address-book__title">{{ item.telephone }}</span>
        </template>

        <template #label>
          <span>{{ item.area }}</span>
          <span>{{ item.address }}</span>
        </template>

        <template v-if="isPickAddress" #icon>
          <svg-icon
            class="address-book__checkbox"
            name="address-edit"
            size="14"
            :to="{ name: 'EditAddress', params: { id: item.id } }"
          />
        </template>

        <template v-if="isAddressBook" #right-icon>
          <svg-icon
            name="address-edit"
            size="14"
            :to="{ name: 'EditAddress', params: { id: item.id } }"
          />
        </template>
      </van-cell>
      <te-button
        v-if="isPickAddress"
        class="address-book__button"
        block
        dark
        type="warning"
        :disabled="pickButtonDisabled"
        @click="onPick"
      >
        {{ $t("UserCenter.PickAddress") }}
      </te-button>
    </template>
    <te-button
      class="Address_btn"
      size="small"
      type="warning"
      dark
      :to="{ name: 'NewAddress' }"
      >{{ $t("UserCenter.AddNew") }}</te-button
    >
  </div>
</template>
<script>
import { getUserAddressInfo } from "@/apis/address";
import { parseAreas } from "@/views/userCenter/components/area";
import { Toast } from "vant";
import QueryString from "query-string";

function urlAddQuery(url, query) {
  const urlObj = QueryString.parseUrl(url);
  urlObj.query = { ...urlObj.query, ...query };
  return QueryString.stringifyUrl(urlObj);
}

export default {
  name: "AddressBook",
  data() {
    return {
      list: [],
      loading: true,
      activeId: ""
    };
  },
  created() {
    this.checkPickQuery();
    this.onLoad();
  },
  computed: {
    isAddressBook() {
      return this.$route.name === "AddressBook";
    },
    isPickAddress() {
      return this.$route.name === "PickAddress";
    },
    pageTitle() {
      if (this.isPickAddress) return "UserCenter.PickAddress";
      else return "UserCenter.AddressBook";
    },
    pickButtonDisabled() {
      return this.activeId === "";
    }
  },
  methods: {
    async onLoad() {
      this.loading = true;
      const toast = Toast.loading({});
      const res = await getUserAddressInfo();
      const list = res.data.data ?? [];
      for (const item of list) {
        const { country, province, city } = item;
        const areas = `${country}/${province}/${city}`;
        const { selectedOptions } = await parseAreas(areas);
        item.area = selectedOptions.map(item => item.text).join("");
      }
      this.list = list;
      toast.clear();
      this.loading = false;
    },
    checkPickQuery() {
      if (this.isPickAddress) {
        const redirectRoutePath = this.$route.query.redirect_route_path;
        const redirectURI = this.$route.query.redirect_uri;
        if (!redirectRoutePath && !redirectURI) {
          console.warn(
            "query 参数 redirect_route_path 或者 redirect_uri 至少存在一个"
          );
        }
      }
    },
    onChange(id) {
      this.activeId = id;
    },
    onPick() {
      this.checkPickQuery();
      const redirectRoutePath = this.$route.query.redirect_route_path;
      const redirectURI = this.$route.query.redirect_uri;
      const query = { address_id: this.activeId };
      if (redirectRoutePath) {
        const url = urlAddQuery(decodeURIComponent(redirectRoutePath), query);
        this.$router.push(url);
        return;
      }
      if (redirectURI) {
        window.location.href = urlAddQuery(
          decodeURIComponent(redirectURI),
          query
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.address-book {
  position: relative;
  background: @color-background;
  min-height: 100vh;
  padding-top: 44px;
  box-sizing: border-box;

  &__checkbox {
    visibility: hidden;
    margin-right: 10px;
  }

  &__cell {
    align-items: center;

    &.active {
      .address-book__checkbox {
        visibility: visible;
      }
    }
  }

  &__title {
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;

    &:nth-child(1) {
      margin-right: 20px;
    }
  }

  &__button {
    width: 90%;
    margin: 80px auto 0 auto;
  }
  .Address_btn {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
