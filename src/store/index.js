import { createStore } from "vuex";
import user from "./moduels/user";
import auth from "./moduels/auth";
import tenant from "./moduels/tenant";

export default createStore({
  modules: {
    user,
    auth,
    tenant
  }
});
