<template>
  <div class="user-login-box">
    <div class="upper">
      <div class="left" @click="goPage('Reputation')">
        <div class="left__user">
          <img class="__logo" :src="avatar" alt="left__user__logo" />
          <div class="left__user__level">lv{{ level }}</div>
        </div>
        <div class="left__points">
          <span class="left__points__data">{{ integral }}</span>
          <span class="left__points__uint">{{ $t("Home.points") }}</span>
        </div>
      </div>
      <div class="right">{{ $t("Home.History") }}</div>
    </div>
    <div class="center">
      <div class="entry">
        <div class="entry__item" @click="goPage('Offers')">
          <svg-icon name="offers-b" size="56" />
          <p class="entry__item__text">{{ $t("Home.Offers") }}</p>
        </div>
        <div class="entry__item">
          <svg-icon name="rank-b" size="56" />
          <p class="entry__item__text">{{ $t("Home.Ranking") }}</p>
        </div>
        <div class="entry__item">
          <svg-icon name="event-b" size="56" />
          <p class="entry__item__text">{{ $t("Home.Events") }}</p>
        </div>
        <div class="entry__item" @click="goPage('Assets')">
          <svg-icon name="reward-b" size="56" />
          <p class="entry__item__text">{{ $t("Home.Rewards") }}</p>
        </div>
      </div>
      <div class="reward-list">
        <div class="reward-list__top">
          <div class="reward-list__top__title">
            {{ $t("Home.RedeemRewards") }}
          </div>
          <div class="reward-list__top__more">
            {{ $t("Home.SeeMore") }}
          </div>
        </div>
        <div class="reward-list__content">
          <div
            class="reward"
            v-for="(reward, index) in combineList"
            :key="index"
          >
            <router-link
              v-if="reward.source_type !== 'mall_commodities'"
              :to="{ name: 'IntegralCoupon', params: { id: reward.id } }"
            >
              <div class="reward__img">
                <img
                  :src="reward.icon"
                  alt="reward"
                  class="reward__img__content"
                  mode="center aspectFit"
                />
              </div>
              <div class="reward__info">
                <div class="reward__info__name">
                  {{ reward.name }}
                </div>
                <div class="reward__info__points">
                  <div class="reward__info__points__data">
                    {{ reward.score }} {{ $t("Home.points") }}
                  </div>
                  <!-- <div class="reward__info__points__uint"></div> -->
                </div>
              </div>
            </router-link>
            <router-link
              v-else
              :to="{ name: 'IntegralProduct', params: { id: reward.id } }"
            >
              <div class="reward__img">
                <img
                  :src="reward.photos[0].image"
                  alt="reward"
                  class="reward__img__content"
                  mode="center aspectFit"
                />
              </div>
              <div class="reward__info">
                <div class="reward__info__name">
                  {{ reward.title }}
                </div>
                <div class="reward__info__points">
                  <div class="reward__info__points__data">
                    {{ reward.score }} {{ $t("Home.points") }}
                  </div>
                  <!-- <div class="reward__info__points__uint"></div> -->
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-show="loading" class="loading-container">
          <te-loading color="#000"></te-loading>
        </div>
        <div v-show="loadCompleted" class="loading-container">
          <p class="loading-container--completed">
            {{ $t("Home.LoadCompleted") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { getExchangeable } from "@/apis/user";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
import TeLoading from "@/components/Loading";
import useInfiniteScroll from "@/composables/useInfiniteScroll";

export default defineComponent({
  name: "user-login",
  components: { TeLoading },
  data() {
    return {
      subPortrait: require("@/assets/imgs/subportrait.png")
    };
  },
  computed: {
    ...mapGetters("user", ["level", "integral", "avatar"])
  },
  setup() {
    // rewardList  为api  获取
    // rewardShowList 为处理后 ，方便展示
    // 其他业务使用次数据可以导入此处理，降低代码冗余度
    const router = useRouter();
    const state = reactive({
      couponList: [],
      entitiesList: [],
      combineList: [],
      loading: false,
      loadCompleted: false,
      page: 1
    });
    const exchangeList = async function() {
      const params = {
        limit: 10,
        offset: 10 * (state.page++ - 1)
      };
      if (!state.loadCompleted) {
        state.loading = true;
        const res = await getExchangeable(params);
        state.loading = false;
        if (res.data.data.length < params.limit) {
          state.loadCompleted = true;
        }
        state.combineList = [...state.combineList, ...res.data.data];
      }
    };
    const goPage = function(name) {
      router.push({ name: name });
    };
    useInfiniteScroll(exchangeList);
    return {
      ...toRefs(state),
      goPage
    };
  }
});
</script>

<style lang="less" scoped>
.user-login-box {
  .upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    margin: 12px 20px 0;
    height: 68px;
    background: linear-gradient(140.55deg, #edde5d -31.46%, #f09819 135.93%);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1645);
    border-radius: 12px 12px 0px 0px;
    color: #735400;

    .left {
      display: flex;
      align-items: center;

      .left__user {
        position: relative;

        .__logo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        &__level {
          position: absolute;
          height: 15px;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0 7px;
          line-height: 15px;
          border-radius: 8px;
          background: #ffffff;
          font-size: 0.1em;
        }
      }

      .left__points {
        display: flex;
        align-items: center;
        padding-left: 19px;

        &__data {
          padding-right: 8px;
          font-size: 24px;
          font-weight: 600;
        }

        &__unit {
          font-weight: 600;
          font-size: 14px;
        }
      }
    }

    .right {
      height: 44px;
      line-height: 44px;
    }
  }

  .center {
    background: #ffffff;

    .entry {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      padding-top: 19px;

      .entry__item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;

        &__text {
          padding-top: 5px;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }

    .reward-list {
      padding-top: 30px;

      .reward-list__top {
        display: flex;
        justify-content: space-between;
        padding: 4px 2vw;

        &__title {
          font-weight: 600;
          font-size: 16px;
        }

        &__more {
          font-weight: 400;
          font-size: 12px;
          color: #919191;
        }
      }

      .reward-list__content {
        padding: 0 2vw 20px;
        font-weight: 400;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        background: #f6f6f6;

        .reward {
          margin-top: 10px;
          width: 47vw;
          border-radius: 12px;
          background: #ffffff;

          .reward__img {
            width: 100%;
            height: 47vw;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 12px;

            &__content {
              max-width: 47vw;
              max-height: 47vw;
              border-radius: 12px;
            }
          }

          .reward__info {
            padding: 10px;

            &__name {
              font-size: 16px;
            }

            &__points {
              color: #735400;

              &__data {
                display: inline-block;
                padding-right: 5px;
                font-size: 14px;
              }

              &__unit {
                display: inline-block;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

.loading-container {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: @color-background;

  &--completed {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
