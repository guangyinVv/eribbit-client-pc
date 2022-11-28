import carousel from './carousel.vue'
import xtxSkeleton from './xtx-skeleton.vue'
export default {
  install (app) {
    app.component(carousel.name, carousel)
    app.component(xtxSkeleton.name, xtxSkeleton)
  }
}
