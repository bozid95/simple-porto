export default {
  data() {
    return {
      isDarkMode: false, // Status Dark Mode
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode; // Toggle Dark Mode
      if (this.isDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },
  template: `
    <div>
      <nav>
        <div>
          <a href="#" @click.prevent="$emit('navigate', 'about')">About</a>
          <a href="#" @click.prevent="$emit('navigate', 'portfolio')">Portfolio</a>
          <a href="#" @click.prevent="$emit('navigate', 'certificates')">Certificates</a>
          <a href="#" @click.prevent="$emit('navigate', 'blog')">Blog</a>
        </div>
      </nav>
      <button 
        class="dark-mode-floating-toggle" 
        @click="toggleDarkMode">
        {{ isDarkMode ? '☀' : '🌙' }}
      </button>
    </div>
  `,
};
