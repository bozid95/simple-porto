import HeaderComponent from "./js/components/HeaderComponent.js";
import NavbarComponent from "./js/components/NavbarComponent.js";
import ContentComponent from "./js/components/ContentComponent.js";
import FooterComponent from "./js/components/FooterComponent.js";
//import BottomNavbarComponent from "./js/components/BottomNavbarComponent.js";

const { createApp } = Vue;

const app = createApp({
  components: {
    "header-component": HeaderComponent,
    "navbar-component": NavbarComponent,
    "content-component": ContentComponent,
    "footer-component": FooterComponent,
    //"bottom-navbar-component": BottomNavbarComponent,
  },
  data() {
    return {
      currentView: "about",
    };
  },
  methods: {},
});

app.mount("#app");
