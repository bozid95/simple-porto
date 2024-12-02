// PostComponent.js
export const PostComponent = {
  props: ['post'],
  template: `
    <div class="portfolio-item">
      <a href="#" @click.prevent="$emit('view-post', post.id)">
        {{ post.title }}
      </a>
    </div>
  `
 };
 
 // ContentComponent.js
 export default {
  props: ["currentView"],
  components: {
    PostComponent
  },
  data() {
    return {
      blogPosts: [],
      selectedPost: null,
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
        this.blogPosts = data.items.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content
        }));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    },
    async viewPost(postId) {
      this.selectedPost = this.blogPosts.find(post => post.id === postId);
    },
    backToBlogList() {
      this.selectedPost = null;
    }
  },
  created() {
    this.fetchBlogPosts();
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
        <p>Hi! I'm a web developer passionate about creating amazing experiences on the web.</p>
      </div>
      </div>
 
      <div v-if="currentView === 'portfolio'">
        <div class="portfolio-item">
          <h4>Project A</h4>
          <p>Description of Project A</p>
        </div>
        <div class="portfolio-item">
          <h2>Project B</h2>
          <p>Description of Project B</p>
        </div>
      </div>
    </div>
  `
 };