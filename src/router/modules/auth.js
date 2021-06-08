import LoginLayout from "@/layouts/LoginLayout";

export default [
  {
    path: "/login",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "LoginAccount",
        component: () =>
          import(
            /* webpackChunkName: "LoginAccount" */ "@/views/auth/login/LoginAccount.vue"
          ),
        meta: { title: "Routes.Login" }
      },
      {
        path: "phone",
        name: "LoginPhone",
        component: () =>
          import(
            /* webpackChunkName: "LoginPhone" */ "@/views/auth/login/LoginPhone.vue"
          ),
        meta: { title: "Routes.Login" }
      }
    ]
  },
  {
    path: "/forget",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "ForgetPassword",
        component: () =>
          import(
            /* webpackChunkName: "ForgetPassword" */ "@/views/auth/forget/ForgetPassword"
          ),
        meta: { title: "Routes.ResetPassword" }
      },
      {
        path: "phone",
        name: "VerificationPhone",
        component: () =>
          import(
            /* webpackChunkName: "VerificationPhone" */ "@/views/auth/forget/VerificationPhone"
          ),
        meta: { title: "Routes.PhoneVerification" }
      },
      {
        path: "email",
        name: "VerificationEmail",
        component: () =>
          import(
            /* webpackChunkName: "VerificationEmail" */ "@/views/auth/forget/VerificationEmail"
          ),
        meta: { title: "Routes.EmailVerification" }
      },
      {
        path: "reset",
        name: "ResetPassword",
        component: () =>
          import(
            /* webpackChunkName: "ResetPassword" */ "@/views/auth/forget/ResetPassword"
          ),
        meta: { title: "Routes.ResetPassword" }
      }
    ]
  },
  {
    path: "/signup",
    component: LoginLayout,
    children: [
      {
        path: "phone",
        name: "SignUpPhone",
        component: () =>
          import(
            /* webpackChunkName: "SignUpPhone" */ "@/views/auth/signUp/SignUpPhone.vue"
          ),
        meta: { title: "Routes.SignUp" }
      },
      {
        path: "email",
        name: "SignUpEmail",
        component: () =>
          import(
            /* webpackChunkName: "SignUpEmail" */ "@/views/auth/signUp/SignUpEmail.vue"
          ),
        meta: { title: "Routes.SignUp" }
      },
      {
        path: "set_password",
        name: "SignUpSetPassword",
        component: () =>
          import(
            /* webpackChunkName: "SignUpSetPassword" */ "@/views/auth/signUp/SignUpSetPassword.vue"
          ),
        meta: { title: "Routes.PasswordUserID" }
      }
    ]
  },
  //TODO:将要第三方登陆callback页放在 /login 下
  {
    path: "/auth",
    component: LoginLayout,
    children: [
      // 第三方登陆回跳页
      {
        path: "third",
        component: () =>
          import(
            /* webpackChunkName: "ThirdLoginLandingPage" */ "@/views/auth/third/ThirdLoginLandingPage"
          ),
        meta: { title: "Routes.Login" }
      }
    ]
  },
  {
    path: "/change",
    component: LoginLayout,
    children: [
      {
        path: "email",
        name: "ChangeEmailNext",
        component: () =>
          import(
            /* webpackChunkName: "ChangeEmailNext" */ "@/views/auth/change/ChangeEmailNext"
          ),
        meta: { title: "Routes.ChangeEmail" }
      },
      {
        path: "email_done",
        name: "ChangeEmailDone",
        component: () =>
          import(
            /* webpackChunkName: "ChangeEmailDone" */ "@/views/auth/change/ChangeEmailDone"
          ),
        meta: { title: "Routes.ChangeEmail" }
      },
      {
        path: "phone",
        name: "ChangePhoneNext",
        component: () =>
          import(
            /* webpackChunkName: "ChangePhoneNext" */ "@/views/auth/change/ChangePhoneNext"
          ),
        meta: { title: "Routes.ChangePhoneNumber" }
      },
      {
        path: "phone_done",
        name: "ChangePhoneDone",
        component: () =>
          import(
            /* webpackChunkName: "ChangePhoneDone" */ "@/views/auth/change/ChangePhoneDone"
          ),
        meta: { title: "Routes.ChangePhoneNumber" }
      },
      {
        path: "password",
        name: "ChangePassWord",
        component: () =>
          import(
            /* webpackChunkName: "ChangePassWord" */ "@/views/others/ChangePassWord.vue"
          ),
        meta: { title: "Routes.ChangePassWord" }
      }
    ]
  },
  {
    path: "/campaign",
    name: "Rebate",
    component: () => import("@/views/campaign/Rebate.vue")
  }
];
