export default {
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true" || true, // Default ke dark mode
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    },
    scrollToTop() {
      // Mendapatkan posisi scroll saat ini
      const scrollPosition = window.scrollY;
      const scrollDuration = 500; // Durasi scroll dalam milidetik (500ms)

      // Fungsi untuk animasi scroll
      const startTime = performance.now();
      const smoothScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / scrollDuration, 1); // Hitung progres animasi

        // Hitung posisi scroll yang baru
        window.scrollTo(0, scrollPosition - (scrollPosition * progress));

        // Lanjutkan animasi jika belum selesai
        if (progress < 1) {
          requestAnimationFrame(smoothScroll);
        }
      };

      // Mulai animasi scroll
      requestAnimationFrame(smoothScroll);
    }
  },
  watch: {
    isDarkMode(newVal) {
      if (newVal) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },
  mounted() {
    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
    }
  },
  template: `
    <div>
      <nav>
        <div>
          <a href="#" @click.prevent="$emit('navigate', 'about')">About</a>
          <a href="#" @click.prevent="$emit('navigate', 'projects')">Projects</a>
          <a href="#" @click.prevent="$emit('navigate', 'certificates')">Certificates</a>
          <a href="#" @click.prevent="$emit('navigate', 'blog')">Blog</a>
        </div>
      </nav>
      <button 
        class="dark-mode-floating-toggle" 
        @click="toggleDarkMode">
        {{ isDarkMode ? '☀' : '🌙' }} <!-- Ikon berubah tergantung mode -->
      </button>
      <button 
        class="scroll-to-top-button"
        @click="scrollToTop">
        ↑
      </button>
    </div>
  `,
};
