import HeaderComponent from "./js/components/HeaderComponent.js";
import NavbarComponent from "./js/components/NavbarComponent.js";
import ContentComponent from "./js/components/ContentComponent.js";
import FooterComponent from "./js/components/FooterComponent.js";

const { createApp } = Vue;

const app = createApp({
  components: {
    "header-component": HeaderComponent,
    "navbar-component": NavbarComponent,
    "content-component": ContentComponent,
    "footer-component": FooterComponent,
  },
  data() {
    return {
      currentView: "about",
      darkMode: false, // Default mode
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },
});

app.mount("#app");
