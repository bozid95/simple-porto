export default {
    template: `
      <nav>
        <div>
          <a href="#" @click.prevent="$emit('navigate', 'about')">About</a>
          <a href="#" @click.prevent="$emit('navigate', 'portfolio')">Portfolio</a>
          <a href="#" @click.prevent="$emit('navigate', 'blog')">Blog</a>
        </div>
      </nav>
    `
  };
  