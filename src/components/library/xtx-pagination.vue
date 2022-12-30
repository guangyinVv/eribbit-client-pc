<template>
  <div class="xtx-pagination">
    <a :class="{ disabled: changePageState.previousPage }" @click="changePage(myCurrentPage - 1)" href="javascript:;">上一页</a>
    <span v-show="pointsFlag.leftPoints">...</span>
    <a @click="changePage(item)" v-for="item in pageArray" :key="item" :class="{ active: myCurrentPage === item }" href="javascript:;">{{ item }}</a>
    <span v-show="pointsFlag.rightPoints">...</span>
    <a :class="{ disabled: changePageState.nextPage }" @click="changePage(myCurrentPage + 1)" href="javascript:;">下一页</a>
  </div>
</template>
<script lang="ts">
import { computed, Ref, ref, watch } from 'vue'
type PropsType = {
  btnCount: number
  pageCount: number
  page: number
}
export default {
  name: 'XtxPagination',
  props: {
    // 按钮的个数
    btnCount: {
      type: Number,
      default: 5
    },
    // 总页数
    pageCount: {
      type: Number,
      default: 10
    },
    // 当前页
    page: {
      type: Number,
      default: 1
    }
  },
  setup(props: PropsType, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    // 按钮个数
    const count = ref(props.btnCount)
    // 总页数
    const pageCount = ref(props.pageCount)
    // 当前页数
    const myCurrentPage = ref(props.page)
    // 监听props的更新，之后更新数据
    watch(props, (newValue) => {
      count.value = newValue.btnCount
      pageCount.value = newValue.pageCount
      myCurrentPage.value = newValue.page
      changePage(myCurrentPage.value)
    })
    const pageArray: Ref<number[]> = ref([1, 2, 3, 4, 5])
    // 两个boolean类型的数，判断左右的省略号是否显示
    const pointsFlag = computed(() => {
      return {
        leftPoints: pageArray.value[0] !== 1,
        rightPoints: pageArray.value[count.value - 1] !== pageCount.value
      }
    })
    // 两个boolean类型的数，判断上一页或下一页按钮是否可点
    const changePageState = computed(() => {
      return {
        previousPage: myCurrentPage.value - 1 < 1,
        nextPage: myCurrentPage.value + 1 > pageCount.value
      }
    })

    // 定义一个方法，当更换页数时触发
    const changePage = (page: number, flag?: boolean) => {
      // 在这里判断一下page是否超范围了
      if (page < 1 || page > pageCount.value) return
      // 特殊情况：总页数太小了，小于按钮数量
      if (pageCount.value <= count.value) {
        count.value = pageCount.value
      } else {
        count.value = props.btnCount
      }
      // 更新一下当前页
      myCurrentPage.value = page
      // 触发change事件，传给父元素
      if (!flag) {
        emit('change', page)
      }

      // 最小中间位置：5/2=3
      const minCenterPos = Math.ceil(count.value / 2)
      // 最大中间位置：10-(5/2)=7
      const maxCenterPos = pageCount.value - Math.floor(count.value / 2)

      let minFlag = false
      let maxFlag = false
      if (page >= minCenterPos) {
        // page大于等于最小中间位置
        minFlag = true
      }
      if (page <= maxCenterPos) {
        // page小于最大中间位置
        maxFlag = true
      }
      // 先清空
      pageArray.value = []
      // 如果以上两个条件都满足，那肯定处于中间位置
      if (minFlag && maxFlag) {
        // 依据page为中间数字，创建数组
        for (let i = 0; i < count.value; i++) {
          pageArray.value[i] = page - minCenterPos + 1 + i
        }
        return
      }
      // 如果只满足大于最小中间位置
      if (minFlag) {
        //  肯定不在中间，而是靠右,经分析，就是最后那几页
        for (let i = 0; i < count.value; i++) {
          pageArray.value[i] = pageCount.value - count.value + 1 + i
        }
        return
      }
      // 如果只满足小于最小中间位置
      if (maxFlag) {
        // 经分析，就是开头那几页
        for (let i = 0; i < count.value; i++) {
          pageArray.value[i] = i + 1
        }
      }
    }
    // 初始先显示一下当前页
    changePage(myCurrentPage.value, true)
    return { changePage, pointsFlag, pageArray, myCurrentPage, changePageState }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
