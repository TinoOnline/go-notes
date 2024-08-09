Vue.js Journey

***Tinotenda Kurimwi 07-08-2024***

# template for major functions
```
Vue.createApp({
  // The root data object, where you define reactive state for the component.
  data() {
    return {
      // Define global variables that return a dataset that can be used within the Vue app.
    }
  },
  
  // Methods are functions that can be executed by your HTML components.
  methods: {
    // Define functions here.
  },
  
  // Computed properties are cached based on their dependencies and will only re-evaluate when their dependencies change.
  computed: {
    // Define computed properties here.
  },
  
  // Watchers are functions that observe and react to data changes on the Vue instance.
  watch: {
    // Define watcher functions here.
  },
  
  // Lifecycle hooks allow you to perform actions at specific stages of the component's lifecycle.
  created() {
    // Called after the instance is created.
  },
  mounted() {
    // Called after the instance is mounted.
  },
  updated() {
    // Called after the instance updates.
  },
  destroyed() {
    // Called after the instance is destroyed.
  },
  
  // Components can be registered locally within the parent component.
  components: {
    // Register child components here.
  },
  
  // Directives are special tokens in the markup that tell the library to do something to a DOM element.
  directives: {
    // Register custom directives here.
  },
  
  // Mixins allow you to write reusable chunks of code that can be included in multiple components.
  mixins: [
    // Define mixins here.
  ],
  
  // Plugins are ways to add global-level functionality to Vue.
  plugins: [
    // Register plugins here.
  ],
  
  // Provide/inject allows you to pass data across the component tree without having to pass props down manually at every level.
  provide() {
    // Define provide properties here.
  },
  inject: [
    // Define inject properties here.
  ],
  
  // Filters allow you to define custom formatting functions that can be used in your templates.
  filters: {
    // Define filters here.
  },

  // Template is a string of HTML that will be rendered as the component's content.
  template: `
    <!-- Define your template here. -->
  `,
  
  // Render function allows you to define the component's output using JavaScript, instead of a template.
  render(createElement) {
    return createElement('div', {}, 'Hello Vue!')
  }
}).mount('#app') // Mount the app to an element in the DOM.

```