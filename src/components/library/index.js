import carousel from './carousel.vue'
export default {
  install (app) {
    app.component(carousel.name, carousel)
  }
}
