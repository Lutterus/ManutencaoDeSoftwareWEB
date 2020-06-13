// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import moment from "moment";
import VuejsDialog from "vuejs-dialog";
import VueMaterial from "vue-material";
import Toasted from 'vue-toasted';
import Autocomplete from '@trevoreyre/autocomplete-vue'
// Import one of available themes
import "vuejs-dialog/dist/vuejs-dialog.min.css";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import '@trevoreyre/autocomplete-vue/dist/style.css'

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);
Vue.use(Toasted)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(Autocomplete)
Vue.use(require("vue-moment"), {
  moment
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
