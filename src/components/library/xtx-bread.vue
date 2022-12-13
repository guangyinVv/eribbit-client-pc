<!-- <template>
  <div class='xtx-bread'>
    <slot />
  </div>
</template> -->

<script lang="ts">
import { h, Slot } from 'vue'

export default {
  name: 'XtxBread',
  render() {
    /* eslint-disable */
    // h函数动态渲染
    // @ts-ignore
    const temp: { [name: string]: Slot } = this.$slots
    /* eslint-disable */
    const dynamicItems: any = []
    temp.default().forEach((item: any, index: number) => {
      dynamicItems.push(item)
      if (index < temp.default().length - 1) {
        dynamicItems.push(h('i', { class: 'iconfont icon-angle-right', innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right"viewBox="0 0 16 16" ><path fill - rule="evenodd"d = "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /></svg>' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dynamicItems)
  }
}
</script>

<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  >i {
    display: flex;
    align-items: center;
  }

  &-item {
    display: flex;

    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @xtxColor;
      }
    }

    // &:last-of-type {
    //   i {
    //     display: none;
    //   }
    // }

    >i {
      // font-size: 12px;
      // margin-left: 5px;
      // margin-right: 5px;
      // line-height: 22px;
      display: flex;
      align-items: center;
    }
  }

}
</style>
