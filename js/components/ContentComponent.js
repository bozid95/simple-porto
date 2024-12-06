// PostComponent.js
export const PostComponent = {
  props: ["post"],
  template: `
    <div class="portfolio-item">
      <a href="#" @click.prevent="$emit('view-post', post.id)">
        {{ post.title }}
      </a>
    </div>
  `,
};

// ContentComponent.js
export default {
  props: ["currentView"],
  components: {
    PostComponent,
  },
  data() {
    return {
      blogPosts: [],
      selectedPost: null,
      aboutPage: null, 
      certificatesPage: null,
      apiKey: "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE",
      blogId: "2531488134356491737",
      
    };
  },
  methods: {
    async fetchBlogPosts() {
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/posts?key=${this.apiKey}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.blogPosts = data.items.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
        }));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    },
    async fetchAbout() {
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/pages/1121065789300202390?key=${this.apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Menyimpan detail halaman "About"
        this.aboutPage = {
          id: data.id,
          title: data.title,
          content: data.content,
        };

        console.log("About page loaded:", this.aboutPage);
      } catch (error) {
        console.error("Error fetching about page:", error);
      }
    },
    async fetchCertificates() {
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${this.blogId}/pages/3651892132507865260?key=${this.apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Menyimpan detail halaman "Certificates"
        this.certificatesPage = {
          id: data.id,
          title: data.title,
          content: data.content,
        };

        console.log("About page loaded:", this.certificatesPage);
      } catch (error) {
        console.error("Error fetching about page:", error);
      }
    },
    async viewPost(postId) {
      this.selectedPost = this.blogPosts.find((post) => post.id === postId);
    },
    backToBlogList() {
      this.selectedPost = null;
    },
  },
  watch: {
    currentView(newView) {
      if (newView === "about" && !this.aboutPage) {
        this.fetchAbout(); // Muat konten "About" saat view berubah ke "about"
      }
      if (newView === "certificates" && !this.certificatesPage) {
        this.fetchCertificates(); // Muat konten "Certificates" saat view berubah ke "certificates"
      }
    },
  },
  created() {
    this.fetchBlogPosts();
    if (this.currentView === "about") {
      this.fetchAbout();
    }
  },
  template: `
    <div class="container">
      <div v-if="currentView === 'blog'">
        <div v-if="!selectedPost">
          <post-component 
            v-for="post in blogPosts" 
            :key="post.id" 
            :post="post"
            @view-post="viewPost"
          ></post-component>
        </div>
 
        <div v-else class="post-detail">
          <a href="#" @click="backToBlogList">Back to Blog List</a>
          <div class="about">
          <h2>{{ selectedPost.title }}</h2>
          <div v-html="selectedPost.content"></div>
        </div>
        </div>
      </div>
 
      <div v-if="currentView === 'about'">
        <div class="about">
          <div v-html="aboutPage?.content || '<p>Loading content...</p>'"></div>
        </div>
      </div>
            <div v-if="currentView === 'certificates'">
        <div class="certificates">
          <div v-html="certificatesPage?.content || '<p>Loading content...</p>'"></div>
        </div>
      </div>
 
      <div v-if="currentView === 'portfolio'">
        <div class="portfolio-item">
          <h4>Project A</h4>
          <p>Description of Project A</p>
        </div>
      </div>
    </div>
  `,
};

