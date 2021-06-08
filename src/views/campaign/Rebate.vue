<template>
  <div class="rebate">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(image, index) in data.product_image_url"
        :key="index"
        ><img :src="image"
      /></van-swipe-item>
    </van-swipe>
    <div class="product_info">
      <div class="product_name">
        <p class="_product_name">{{ data.product_name }}</p>
        <div class="icon_div">
          <span class="icon_div_icon">{{ DiscountRate }}% Off</span>
        </div>
      </div>
      <div class="product_price ">
        <p class="_current_price">
          <span class="money_type">$</span>{{ current_price }}
        </p>
        <p class="_rebate_price">
          Rebate<span class="money_type">$</span>{{ data.rebate_price }}
        </p>
        <br />
        <p class="_product_price">
          <span class="money_type">$</span>{{ data.product_price }}
        </p>
      </div>

      <div class="ends_in van-hairline--top">
        <p class="text">ENDS IN</p>
        <van-count-down :time="end_time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <div class="rebate_btn">
        <button @click="showPopup">Claim Rebate</button>
        <p class="only">Only <span class="num">5</span> more available!</p>
      </div>
    </div>
    <div class="view_desc">
      <p class="_view_desc_text" @click="showPopupDesc">
        View product description
      </p>
    </div>
    <div class="video_box">
      <p class="title">How it work</p>
      <div class="video_paly">
        <video width="320" height="240" controls>
          <source
            src="https://www.runoob.com/try/demo_source/movie.ogg"
            type="video/ogg"
          />
        </video>
      </div>
    </div>
    <div class="product_desc">
      <div class="item">
        <span class="icon">1</span>
        <p class="title">Buy It on {{ data.product_platform }} at full price</p>
        <p class="desc">
          First you’ll need to buy the product on {{ data.product_platform }} at
          the full price of
          <span
            v-html="data.product_money_type"
            style="text-indent: 5px;"
          ></span>
          {{ data.product_price }}
          . This helps us promote our brand.
        </p>
        <div class="other" @click="pruduct_url_jump">
          <div class="other_left">
            <img :src="product_image_url[0]" alt="" />
          </div>
          <div class="other_right">
            <p>{{ data.product_name }}</p>
            <p>
              <label
                ><span v-html="data.product_money_type"></span
                >{{ data.product_price }}</label
              >
              <button>
                Buy it now
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="item">
        <span class="icon">2</span>
        <p class="title">Enter your order number</p>
        <p class="desc">
          After you purchase on {{ data.product_platform }}, please enter your
          order number on this website.
        </p>
      </div>
      <div class="item">
        <span class="icon">3</span>
        <p class="title">We verify the order number</p>
        <p class="desc">
          Next we‘ll verify your order number. This is to make sure you actually
          placed an order on
          {{ data.product_platform }}.
        </p>
      </div>
      <div class="item">
        <span class="icon">4</span>
        <p class="title">Wait for the order to ship</p>
        <p class="desc">
          Once your order number is verified, we’ll wait untill your order
          ships.
        </p>
      </div>
      <div class="item">
        <span class="icon">5</span>
        <p class="title">
          Receive
          <span v-html="data.reward_money_type" style="text-indent: 5px;"></span
          >{{ data.rebate_price || 0 }} cash rebate via PayPal
        </p>
        <p class="desc">
          After your order has been shipped, we’ll contact you and send you your
          cash rebate via PayPal.
        </p>
      </div>
    </div>

    <!-- Claim Rebate 弹出层 -->
    <van-popup
      v-model:show="show"
      round
      :style="{ height: '60%', width: '80%' }"
      closeable
      close-icon="close"
      :get-container="getContainer"
      class="my_van_popup"
    >
      <p class="title">Claim Rebate</p>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <template #title>
            <div>
              Buy It on {{ data.product_platform }}
              <svg
                t="1622709967173"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8849"
                width="48"
                height="48"
              >
                <path
                  d="M392.96 447.232c-12.544 18.176-18.944 40.192-18.944 66.048 0 32.512 9.216 57.6 27.648 75.264 18.432 17.664 41.984 26.368 70.656 26.368 18.688 0 34.304-1.792 46.848-5.632 20.224-5.632 40.448-19.712 61.44-42.496 1.536 1.792 4.096 5.632 7.936 11.008 3.584 5.376 6.4 8.96 8.192 11.008 1.536 1.792 4.352 4.864 8.448 8.96 3.84 4.096 8.448 8.448 13.568 12.8 6.4 2.56 11.776 2.304 16.128-1.024 2.56-2.304 19.456-16.64 50.432-43.52 3.072-2.304 4.352-4.864 4.352-7.68 0-2.56-1.024-5.632-3.328-8.96l-12.8-17.152c-2.56-3.584-5.376-9.216-8.192-17.408-2.816-8.448-4.352-17.408-4.096-26.368V353.28c0-1.536-0.256-6.144-0.512-14.336-0.256-7.936-1.024-13.312-1.792-15.616-1.28-4.352-2.304-8.704-3.328-13.056-1.536-6.4-3.072-11.264-4.864-14.592-2.304-4.096-4.864-7.936-7.68-11.52-3.072-4.352-6.656-8.192-10.24-12.032-23.808-22.016-57.088-33.024-99.328-33.024h-14.08c-33.024 1.792-62.208 10.752-86.784 26.88-24.832 16.128-40.192 40.448-46.592 73.728-0.256 1.28-0.512 2.56-0.512 3.84 0 5.12 3.072 8.448 9.472 9.984l64.256 7.936c5.888-1.024 9.728-5.376 11.264-12.8 2.56-11.776 8.448-21.248 17.408-27.904 8.96-6.656 19.456-10.496 31.744-11.776h4.352c16.896 0 29.184 5.632 36.864 16.896 5.12 8.192 7.936 24.064 7.936 48.128v9.472c-16.384 1.28-32.768 2.816-49.152 4.352-29.44 3.84-54.272 9.984-74.24 18.432-22.528 8.96-39.68 22.784-52.48 40.96z m88.064 89.856c-7.168-8.96-10.752-20.48-10.752-35.072 0-32 16.384-52.736 49.152-61.952 11.008-3.072 27.648-4.608 49.152-4.608v13.824c0 12.032 0 20.48-0.256 25.856-0.512 6.912-1.536 13.568-3.328 20.224-2.048 8.192-5.12 15.872-9.216 23.296-8.448 16.128-20.736 26.112-36.352 30.208-0.768 0-2.304 0.256-4.096 0.512-1.536 0.256-3.072 0.512-4.864 0.512-12.544 0.256-22.272-4.096-29.44-12.8z"
                  fill="#221F1F"
                  p-id="8850"
                ></path>
                <path
                  d="M704.768 681.984c0.768-1.536 2.048-3.072 3.328-4.608 9.216-6.4 18.176-10.496 26.88-12.8 13.568-3.584 27.392-5.632 41.216-6.144 3.584-0.256 7.168-0.256 10.496 0.512 16.64 1.536 26.88 4.352 30.208 8.448 1.536 2.304 2.304 5.632 2.304 9.984v3.84c0 13.056-3.584 28.416-10.496 46.08-7.168 17.664-16.896 32-29.44 42.752-2.048 1.536-3.584 2.304-5.12 2.304-0.768 0-1.536-0.256-2.304-0.512-2.304-1.024-2.816-3.072-1.792-6.144 13.824-32.512 20.736-55.04 20.736-67.584 0-4.096-0.768-7.168-2.304-8.96-3.84-4.352-14.08-6.656-31.232-6.656-6.4 0-13.824 0.256-22.272 1.024-9.472 1.28-17.92 2.304-25.856 3.328-2.304 0-3.584-0.256-4.608-1.024-0.768-0.768-1.024-1.536-0.512-2.304 0.256-0.256 0.256-0.768 0.768-1.536z"
                  fill="#FF9900"
                  p-id="8851"
                ></path>
                <path
                  d="M205.824 672.512c1.792-3.072 4.864-3.072 8.96-0.512 93.184 54.016 194.304 80.896 303.872 80.896 72.96 0 145.152-13.568 216.32-40.704l7.936-3.328c3.584-1.536 6.144-2.56 7.424-3.328 5.632-2.304 9.984-1.28 13.056 3.328 3.072 4.352 2.048 8.704-3.072 12.288-6.656 4.864-15.36 10.496-25.856 16.64-32 18.944-67.84 33.792-107.264 44.032-39.424 10.496-78.08 15.616-115.712 15.616-58.112 0-112.896-10.24-164.864-30.464-51.2-19.968-98.304-48.896-139.264-85.76-2.304-1.792-3.328-3.84-3.328-5.632 0.768-1.024 1.28-2.048 1.792-3.072z"
                  fill="#FF9900"
                  p-id="8852"
                ></path>
              </svg>
            </div>
          </template>
          <div class="other" @click="pruduct_url_jump">
            <div class="other_left">
              <img :src="product_image_url[0]" alt="" />
            </div>
            <div class="other_right">
              <p>{{ data.product_name }}</p>
              <p>
                <label
                  ><span v-html="data.product_money_type"></span
                  >{{ data.product_price }}</label
                >
                <button>
                  Buy it now
                </button>
              </p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item name="2">
          <template #title>
            <div>
              PayPal Account
              <svg
                t="1622709498594"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6032"
                width="48"
                height="48"
              >
                <path
                  d="M241.534 764.95H188.01c-3.692 0-7.385 1.852-7.385 7.408l-22.149 138.886c0 1.852 1.846 3.704 3.692 3.704h25.842c3.692 0 7.38-1.852 7.38-7.408l7.384-38.888c0-3.705 3.692-7.41 7.384-7.41h18.458c35.066 0 57.216-18.516 62.754-51.848 1.846-14.813 0-25.927-7.384-35.184-9.227-5.556-22.15-9.26-42.452-9.26z m5.538 50c-1.846 20.367-18.456 20.367-33.221 20.367h-9.23l7.383-35.184c0-1.852 1.847-5.552 3.688-5.552h3.692c9.232 0 20.304 0 23.996 7.404 3.692 1.852 5.538 7.409 3.692 12.966z m158.73 0h-25.84c-1.846 0-3.692 1.848-3.692 3.7l-1.846 7.41-1.846-1.853c-7.381-9.256-18.458-11.109-31.376-11.109-29.53 0-53.524 22.219-57.216 53.701-1.846 14.813 0 29.628 9.23 40.74 9.226 9.257 20.303 12.962 33.222 12.962 12.918 0 25.84-3.705 35.067-14.814l-1.846 7.41c0 1.851 1.846 3.7 3.692 3.7h23.995c3.693 0 7.38-1.849 7.38-7.405l12.923-88.89c1.846-3.704 0-5.551-1.846-5.551z m-38.758 51.85c-1.847 14.812-14.765 24.074-29.534 24.074-7.38 0-12.918-1.852-18.457-7.408-3.692-3.706-3.692-11.11-3.692-18.519 1.846-14.813 14.77-24.074 29.533-24.074 7.385 0 12.919 1.853 18.457 7.41 3.693 5.556 7.385 11.108 3.693 18.516z m179.033-51.85h-25.84c-1.847 0-3.693 1.848-7.385 1.848l-35.068 53.706-14.764-51.853c0-1.853-3.692-3.7-7.385-3.7h-25.837c-1.846 0-3.692 1.847-3.692 3.7v1.852l29.529 85.184-25.837 38.889c-1.846 1.852 0 3.704 0 7.408h29.53c1.846 0 3.692-1.852 7.384-1.852l86.746-127.777c-3.692-1.852-5.535-5.557-7.38-7.404z"
                  fill="#253B80"
                  p-id="6033"
                ></path>
                <path
                  d="M632.823 764.95h-55.37c-3.692 0-7.38 1.852-7.38 7.408l-22.15 140.738c0 1.852 1.843 3.7 3.692 3.7h29.53c1.846 0 3.692-1.848 3.692-3.7l7.38-40.74c0-3.704 3.692-7.409 7.385-7.409h18.457c35.067 0 57.216-18.517 62.754-51.849 1.846-14.817 0-25.927-7.384-35.188-9.226-9.256-22.149-12.96-40.606-12.96z m7.384 50c-1.846 20.367-18.456 20.367-33.22 20.367h-9.23l7.383-35.184c0-1.852 1.847-3.704 3.693-3.704h3.687c9.23 0 20.303 0 23.995 7.408 3.692 0 3.692 5.557 3.692 11.114z m155.04 0h-25.842c-1.842 0-3.688 1.848-3.688 3.7l-1.846 7.41-1.846-1.853c-7.384-9.256-18.456-11.109-31.38-11.109-29.528 0-53.524 22.219-57.216 53.701-1.846 14.813 0 29.628 9.23 40.74 9.227 9.257 20.304 12.962 33.222 12.962 12.918 0 25.842-3.705 35.068-14.814l-1.846 7.41c0 1.851 1.846 3.7 3.692 3.7h23.994c3.692 0 7.386-1.849 7.386-7.405l12.918-88.89c3.692-3.704 3.692-5.551-1.846-5.551z m-35.068 51.85c-1.846 14.812-14.764 24.074-29.534 24.074-7.38 0-12.918-1.852-18.456-7.408-3.688-3.706-3.688-11.11-3.688-18.519 1.842-14.813 14.764-24.074 29.53-24.074 7.384 0 12.918 1.853 18.456 7.41 3.692 5.556 3.692 11.108 3.692 18.516z m66.443-98.146l-22.145 142.59c0 1.852 1.846 3.704 3.688 3.704h22.15c3.692 0 7.384-1.852 7.384-7.408l22.148-140.738c0-1.853-1.846-3.705-3.692-3.705H832.16c-3.688 1.852-5.538 3.705-5.538 5.557z"
                  fill="#179BD7"
                  p-id="6034"
                ></path>
                <path
                  d="M426.106 690.878l11.072-68.519H298.75l77.52-503.69c0-1.852 0-1.852 1.846-5.557 0 0 1.846-1.852 5.538-1.852h191.953c64.6 0 107.052 14.813 131.048 40.74 9.226 11.11 16.61 24.074 22.148 38.888 1.842 18.518 1.842 35.183 0 55.554v16.665l11.073 5.556c7.385 5.557 16.61 9.261 22.149 16.667 9.226 11.113 16.61 24.074 18.456 40.739 1.848 18.518 1.848 38.888-1.846 57.406-5.538 24.074-11.072 44.445-23.994 64.815-9.226 16.665-22.15 31.479-38.76 40.74-14.764 9.26-33.222 18.517-49.832 24.074-22.149 5.553-40.606 7.405-60.909 7.405h-22.15c-22.148 0-40.605 16.67-44.297 38.891v7.406L520.236 685.32v5.557s0 1.852-1.846 1.852h-1.846c0-3.704-90.438-1.852-90.438-1.852z"
                  fill="#253B80"
                  p-id="6035"
                ></path>
                <path
                  d="M765.717 248.294c0 5.556-1.846 7.409-1.846 12.96-27.687 138.887-116.279 183.331-230.716 183.331h-59.063c-14.764 0-23.991 9.261-27.683 24.075l-29.533 192.587-7.381 55.558c-1.846 7.404 5.535 14.813 12.92 16.665h107.052c12.918 0 22.148-9.26 23.991-22.222v-5.556l20.303-125.925 1.846-7.405c1.846-12.962 12.922-22.222 23.995-22.222h14.764c101.515 0 177.189-42.593 203.03-161.108 9.226-49.997 5.537-92.59-20.303-120.369-11.072-7.408-18.458-14.813-31.376-20.37z"
                  fill="#179BD7"
                  p-id="6036"
                ></path>
                <path
                  d="M738.03 237.185c-5.539 0-7.385-1.853-12.919-1.853-5.538 0-9.23-1.852-12.922-1.852-16.61-1.852-35.068-5.557-51.678-5.557H505.472c-12.923 0-22.15 9.262-23.995 22.223L450.1 463.103v5.557c1.846-14.814 14.765-24.075 27.683-24.075h59.063c114.433 0 204.876-46.292 230.716-183.33 0-5.552 1.842-7.405 1.842-12.961-7.38-1.852-14.764-7.409-22.144-9.257l-9.23-1.852c0 1.852 0 0 0 0z"
                  fill="#222D65"
                  p-id="6037"
                ></path>
                <path
                  d="M481.477 251.998c1.846-12.96 12.918-22.223 23.995-22.223h155.039c16.61 0 35.067 0 51.678 5.557 5.538 0 9.23 1.853 12.922 1.853 5.534 0 7.38 1.852 12.92 1.852l5.538 1.848c7.38 1.852 14.764 5.557 22.148 9.261 7.38-49.997 0-85.185-27.687-114.812-29.53-35.183-84.904-50.001-153.193-50.001H385.5c-14.764 0-23.995 9.26-27.687 24.075l-81.211 529.616c-1.843 9.261 5.538 16.671 14.768 20.371h125.506l31.379-196.292c1.846 0 33.222-211.105 33.222-211.105z"
                  fill="#253B80"
                  p-id="6038"
                ></path>
              </svg>
            </div>
          </template>
          <div class="input_paypal">
            <input
              type="text"
              placeholder="Paypal Account Email"
              v-model="pay_email"
              @blur="pay_email_blur"
            />
            <p>
              Enter your PayPal email to claim your rebate;please make sure it's
              the correct email;we will send your money using it.
            </p>
          </div>
        </van-collapse-item>
        <van-collapse-item name="3">
          <template #title>
            <div>
              Order ID
              <svg
                t="1622709386726"
                class="icon"
                viewBox="0 0 1280 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3885"
                width="48"
                height="48"
              >
                <path
                  d="M970.496 881.4976c0 15.0784-11.2128 27.3024-25.0496 27.3024H334.5664c-13.8496 0-25.0624-12.224-25.0624-27.3024V215.04c0-15.0912 11.2128-27.3024 25.0624-27.3024h610.8928c13.8368 0 25.0496 12.224 25.0496 27.3024v666.4576z"
                  fill="#B3B3B3"
                  p-id="3886"
                ></path>
                <path
                  d="M970.496 846.4512c0 15.0784-11.2128 27.3024-25.0496 27.3024H334.5664c-13.8496 0-25.0624-12.224-25.0624-27.3024V179.9936c0-15.0912 11.2128-27.3152 25.0624-27.3152h610.8928c13.8368 0 25.0496 12.224 25.0496 27.3152v666.4576z"
                  fill="#E5E7E6"
                  p-id="3887"
                ></path>
                <path
                  d="M355.0464 205.3248h569.8944v609.3056H355.0464z"
                  fill="#FFFFFF"
                  p-id="3888"
                ></path>
                <path
                  d="M834.88 203.392l-0.0384-0.0384a26.4448 26.4448 0 0 0-6.1824-6.0544c-28.5696-27.8784-46.4128-44.5568-46.4128-44.5568H497.7664s-17.8304 16.6784-46.4128 44.5568a25.728 25.728 0 0 0-6.1824 6.0544c-0.0256 0-0.0256 0.0128-0.0256 0.0256a24.2944 24.2944 0 0 0-4.6592 14.2848c0 13.5168 11.136 24.5248 25.0496 25.1136l0.0384 0.0512H814.464l0.0384-0.0512c13.9392-0.6016 25.0496-11.5968 25.0496-25.1136a24.6528 24.6528 0 0 0-4.672-14.272z"
                  fill="#F4C258"
                  p-id="3889"
                ></path>
                <path
                  d="M497.152 115.2h285.696v37.5424H497.152z"
                  fill="#FAD362"
                  p-id="3890"
                ></path>
                <path
                  d="M865.3312 465.5872a30.0544 30.0544 0 0 1-30.0544 30.0544H444.7104a30.0544 30.0544 0 0 1-30.0544-30.0544V325.376a30.0416 30.0416 0 0 1 30.0544-30.0416h390.5792a30.0416 30.0416 0 0 1 30.0544 30.0416v140.2112z"
                  fill="#23B08D"
                  p-id="3891"
                ></path>
                <path
                  d="M867.4432 381.0048c-0.1408-0.0128-60.3776-0.0128-60.5312-0.0384-15.3216-0.064-30.656 0.1408-45.9648-0.0896-6.1312-0.0768-10.0736 2.2784-12.5824 7.8336-1.5488 3.4304-2.8416 7.1552-5.8496 10.3296-4.8-6.6048-8.064-13.2608-11.6736-19.6864a9484.9024 9484.9024 0 0 0-36.7104-64.8704c-1.0752-1.8688-1.9072-4.7616-4.8896-4.0192-2.2784 0.5632-2.7008 2.9696-3.2 5.0176a76.9792 76.9792 0 0 0-0.768 3.4048c-7.232 34.304-14.2464 68.6592-21.4656 102.976-0.3712 1.8432-0.3584 3.904-2.0608 6.0544-11.968-23.6928-23.3728-46.7712-34.9568-69.7728-1.152-2.2784-2.176-4.608-3.6608-6.72-1.9712-2.8672-4.0448-2.7648-6.08-0.128-2.1504 2.7904-3.4944 6.016-4.928 9.1904a1596.9408 1596.9408 0 0 1-19.52 41.6c-0.7168 1.472-0.896 3.4944-3.264 4.2624-10.5344-28.7488-20.9536-57.3056-31.5136-85.8112-1.344-3.6992-1.2928-10.0864-6.0928-9.6768-4.3392 0.3712-4.0704 6.656-5.056 10.56-8.7808 35.1872-18.368 70.144-26.7904 105.4208 0.2816-2.0864-0.8064-3.9552-1.3312-5.8624-2.7904-10.3168-5.7856-20.5568-8.7424-30.8224-2.3296-8.0512-3.7376-9.1264-12.3392-9.1904-8.2688-0.064-76.6464-0.0768-84.928-0.0512v16.9856c4.6592 0.3328 69.4144 0.7936 74.048 0.4224 6.528-0.512 8.9472 1.5744 10.5472 7.6544 5.9392 22.6816 12.544 45.2096 18.9312 67.776 0.7808 2.7648 0.9344 6.9632 4.5824 6.8992 3.6992-0.064 3.52-4.352 4.288-7.0912 6.4256-23.0528 11.712-46.4 17.856-69.5168 3.84-14.3744 7.2448-28.864 11.5456-44.1984 7.9744 21.1584 15.0656 41.3184 22.464 61.3504 2.2528 6.1056 4.4928 12.2112 6.6816 18.3168 0.8576 2.3808 1.7664 5.504 4.416 5.8496 2.9696 0.384 3.84-2.9312 4.9664-5.1072 3.2384-6.1696 6.208-12.4672 9.1776-18.7648 5.952-12.6592 11.392-25.6 18.3168-38.6432l30.0416 60.0704a822.528 822.528 0 0 0 13.0432 24.6272c1.0368 1.9072 1.9328 4.8512 4.6976 4.288 2.5088-0.5248 2.8672-3.3792 3.4304-5.6192 0.2432-0.896 0.3968-1.8176 0.6016-2.7264 3.8784-16.9856 7.1424-34.0992 10.7776-51.136 4.2752-20.0704 8.1664-40.2304 12.9024-61.1072 14.72 25.8944 28.6464 51.0848 42.9568 76.0064 3.4944 6.0928 5.7472 6.08 8.9984-0.0128a489.856 489.856 0 0 0 11.5584-23.04c1.7408-3.7248 4.16-5.6832 8.4096-6.144 23.0656-2.5472 91.2 0.064 94.5664-0.3584h5.0816v-16.6912z"
                  fill="#E9EEF1"
                  p-id="3892"
                ></path>
                <path
                  d="M860.3392 590.144H419.6864a22.0288 22.0288 0 1 1 0-44.032h440.6528a22.016 22.016 0 1 1 0 44.032zM860.3392 673.3056H419.6864a22.016 22.016 0 1 1 0-44.032h440.6528a22.016 22.016 0 0 1 0 44.032zM860.3392 756.48H419.6864a22.0416 22.0416 0 0 1 0-44.0576h440.6528a22.016 22.016 0 0 1 0 44.0576z"
                  fill="#CCCCCC"
                  p-id="3893"
                ></path>
              </svg>
            </div>
          </template>
          <div class="input_order">
            <input
              type="text"
              placeholder="Amazon Order ID"
              v-model="order_id"
              @blur="order_id_blur"
            />
            <p>
              Find your order ID in your Amazon order history.It should look
              like this: 123-1234567-7654321
            </p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <button
        :class="{ submit_btn: true, succes: isSucces }"
        @click="claimSubmit"
      >
        Submit
      </button>
    </van-popup>

    <!-- product dsec viwe -->
    <van-popup
      v-model:show="show_desc"
      round
      :style="{ height: '50%', width: '80%' }"
      closeable
      close-icon="close"
      :get-container="getContainer"
      class="my_van_popup"
    >
      <p class="title">Product description</p>
      <div class="dateil" v-html="data.product_description"></div>
    </van-popup>

    <van-overlay :show="showOverlay">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { campaign_detail, get_reward } from "@/apis/campaign";
import { Toast } from "vant";
import { EMAIL_REG } from "@/utils";
export default {
  name: "Rebate",
  data() {
    return {
      id: this.$route.query.id || "1399924259475820544",
      data: {},
      // 倒计时
      end_time: 0,
      product_image_url: [],
      // 控制Claim Rebate 弹出层中的提交按钮样式
      isSucces: false,
      // 控制Claim Rebate 弹出层
      show: false,
      // 控制produce desc的弹出层
      show_desc: false,
      // 控制展开的面板列表
      activeNames: [],
      pay_email: "",
      order_id: "",
      // 遮罩层
      showOverlay: true
    };
  },
  computed: {
    current_price() {
      return Number(this.data.product_price) - Number(this.data.rebate_price);
    },
    DiscountRate() {
      return (
        ((Number(this.data.product_price) - Number(this.data.rebate_price)) /
          Number(this.data.product_price)) *
        100
      ).toFixed(0);
    }
  },
  mounted() {
    const self = this;
    // 获取活动详情
    async function getInfo() {
      const result = await campaign_detail(self.id);
      setTimeout(function() {
        self.showOverlay = false;
      }, 200);
      self.data = result.data.data;
      self.end_time = result.data.data.end_date - new Date().getTime();
      if (self.end_time <= 0) {
        this.end_time = 0;
        Toast.fail("本次活动已经结束");
      }
      self.product_image_url = result.data.data.product_image_url;
      console.log(result.data.data);
    }
    getInfo();
  },
  methods: {
    pruduct_url_jump() {
      location.href = this.data.product_url;
    },
    getContainer() {
      return document.querySelector(".rebate");
    },
    showPopup() {
      this.show = true;
    },
    showPopupDesc() {
      this.show_desc = true;
    },
    // 倒计时结束时触发
    // endInFinish() {
    //   this.end_time = 0;
    //   Toast.fail("本次活动已经结束");
    // },
    pay_email_blur() {
      /* 用于邮箱验证的函数 */
      function validateEmail(email) {
        // 邮箱验证正则
        var reg = EMAIL_REG;
        return reg.test(email);
      }
      if (!validateEmail(this.pay_email)) {
        Toast.fail("Please enter the correct email account");
      } else {
        if (this.order_id) {
          this.isSucces = true;
        }
      }
    },
    order_id_blur() {
      if (this.pay_email === "") {
        Toast.fail("Please enter the correct order ID");
      } else {
        if (this.order_id) {
          this.isSucces = true;
        }
      }
    },
    // 用户参加返利活动(点击按钮)
    async claimSubmit() {
      if (this.pay_email === "") {
        await Toast.fail("please enter PayPal Account");
        return false;
      }
      if (this.order_id === "") {
        await Toast.fail("please enter Order ID");
        return false;
      }
      get_reward(this.id, this.pay_email, this.order_id)
        .then(() => {
          Toast.success("success");
        })
        .catch(res => {
          Toast.fail(res.message);
        });
    }
  }
};
</script>

<style scoped lang="less">
.rebate {
  .my-swipe {
    .van-swipe-item {
      height: auto;
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: white;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .product_info {
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
    border-radius: 0 0 12px 12px;
    padding-top: 5px;
    padding-left: 5px;
    .product_name {
      position: relative;
      ._product_name {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        letter-spacing: 0.692308px;
        color: #0e1117;
      }
      .icon_div {
        position: absolute;
        right: 0;
        top: 0;
        width: 80px;
        height: 22px;
        line-height: 22px;
        background: url("./images/Rectangle 74.png") no-repeat center center;
        background-size: cover;
        .icon_div_icon {
          font-weight: bold;
          margin-left: 11px;
          font-family: Open Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 0.538462px;
          color: #ea384d;
        }
      }
    }
    .product_price {
      margin: 8px 0;
      position: relative;
      > p {
        display: inline-block;
      }
      ._current_price {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 23px;
        line-height: 22px;
        letter-spacing: 0.538462px;
        color: #ea384d;
        .money_type {
          font-size: 16px;
        }
      }
      ._rebate_price {
        padding: 0 12px;
        position: absolute;
        top: 4px;
        margin-left: 20px;
        height: 20px;
        background: #ffe256;
        border-radius: 24px;
        color: #ea384d;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        margin-top: -5px;
      }
      ._product_price {
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.538462px;
        text-decoration-line: line-through;
        color: #979797;
      }
    }
    .ends_in {
      width: 98%;
      padding: 20px 0;
      text-align: center;
      .text {
        display: inline-block;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        vertical-align: middle;
      }
      > .van-count-down {
        margin-left: 10px;
        display: inline-block;
        .colon {
          display: inline-block;
          margin: 0 4px;
          color: black;
        }
        .block {
          border-radius: 2px;
          font-weight: bold;
          display: inline-block;
          width: 22px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: black;
        }
      }
    }
    .rebate_btn {
      text-align: center;
      > button {
        width: 335px;
        height: 44px;
        background: linear-gradient(270deg, #ffe259 0%, #faf102 100%);
        border-radius: 22px;
        border: none;
        outline: none;
      }
      .only {
        margin: 15px 0;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        letter-spacing: 0.5px;
        .num {
          color: #ea384d;
        }
      }
    }
  }
  .view_desc {
    margin: 20px 0;
    ._view_desc_text {
      text-align: center;
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-decoration-line: underline;
      color: #0095ff;
    }
  }
  .video_box {
    text-align: center;
    overflow: hidden;
    .title {
      height: 45px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 45px;
      color: #000000;
    }
    .video_paly {
      width: 100%;
      height: 240px;
      margin: 0 auto;
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
  .product_desc {
    .item {
      .icon {
      }
      .title {
      }
      .detail {
      }
    }
  }

  .product_desc {
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
    > .item {
      margin: 25px 10px 25px 35px;
      position: relative;
      .icon {
        display: block;
        position: absolute;
        top: -2px;
        color: white;
        left: -25px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: url("./images/Rectangle 35.png") no-repeat center center;
        background-size: cover;
      }
      .title {
        height: 15px;
        line-height: 15px;
        margin: 8px 0;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        align-items: center;
        letter-spacing: 0.5px;
        color: #000000;
      }
      .desc {
        height: 57px;
        left: 388.27;
        font-family: Open Sans;
        font-style: normal;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: 0.5px;
        color: #d5d5d5;
      }
      .other {
        width: 95%;
        height: 80px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        text-align: left;
        background: #f7f7f7;
        .other_left {
          width: 40%;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .other_right {
          width: 60%;
          font-size: 10px;
          letter-spacing: 0.5px;
          color: #000000;
          p {
            width: 100%;
            text-align: center;
          }
          p:first-child {
            margin-top: 5px;
            line-height: 25px;
            font-size: 16px;
          }
          p:last-child {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
          }
          label {
            font-weight: bold;
            line-height: 22px;
          }
          button {
            margin-left: 40px;
            border: none;
            outline: none;
            color: #ffffff;
            width: 80px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            background: linear-gradient(90deg, #1d84fa 0%, #3a5aff 100%);
            border-radius: 2px;
          }
        }
      }
    }
  }
  .my_van_popup {
    .title {
      padding: 20px 0;
      text-align: center;
    }
    .submit_btn {
      width: 100px;
      height: 38px;
      background: #d8d8d8;
      border-radius: 4px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      letter-spacing: 0.571429px;
      color: #ffffff;
      border: none;
      outline: none;
      display: block;
      margin: 20px auto;
      &.succes {
        background: #07c160;
      }
    }
    .van-collapse {
      .van-collapse-item {
        svg {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
        .other {
          width: 100%;
          height: 80px;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          text-align: left;
          background: #f7f7f7;
          .other_left {
            width: 40%;
            img {
              width: 80px;
              height: 80px;
            }
          }
          .other_right {
            width: 60%;
            font-size: 10px;
            letter-spacing: 0.5px;
            color: #000000;
            p {
              width: 100%;
              text-align: center;
            }
            p:first-child {
              margin-top: 5px;
              line-height: 25px;
              font-size: 16px;
            }
            p:last-child {
              margin-top: 20px;
              display: flex;
              justify-content: flex-start;
            }
            label {
              font-weight: bold;
              line-height: 22px;
            }
            button {
              margin-left: 40px;
              border: none;
              outline: none;
              color: #ffffff;
              width: 80px;
              height: 22px;
              text-align: center;
              line-height: 22px;
              background: linear-gradient(90deg, #1d84fa 0%, #3a5aff 100%);
              border-radius: 2px;
            }
          }
        }
        .input_paypal,
        .input_order {
          // padding: 5px;
          input {
            background: #f6f6f6;
            border-radius: 6px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border: none;
            outline: none;
            text-indent: 10px;
            &::placeholder {
              font-size: 8px;
            }
          }
          p {
            margin-top: 5px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #bfbfbf;
          }
        }
      }
    }
    > .dateil {
      width: 80%;
      margin: 0 auto;
    }
  }
  .van-overlay {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
}
</style>
