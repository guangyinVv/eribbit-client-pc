<template>
  <div class="goods-comment" v-if="commentInfo">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <!-- <a href="javascript:;" class="active">全部评价（{{ commentInfo.evaluateCount }}）</a> -->
          <a @click="changeTagsActive(item)" :class="{ active: item.active }" href="javascript:;" v-for="(item, index) in commentInfo.tags" :key="index">{{ item.title }}（{{ item.tagCount }}）</a>
          <!-- <a href="javascript:;">好吃（1000）</a>
          <a href="javascript:;">便宜（1000）</a>
          <a href="javascript:;">很好（1000）</a>
          <a href="javascript:;">再来一次（1000）</a>
          <a href="javascript:;">快递棒（1000）</a> -->
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a @click="changeSort(null)" :class="{ active: reqParams.sortField === null }" href="javascript:;">默认</a>
      <a @click="changeSort('createTime')" :class="{ active: reqParams.sortField === 'createTime' }" href="javascript:;">最新</a>
      <a @click="changeSort('praiseCount')" :class="{ active: reqParams.sortField === 'praiseCount' }" href="javascript:;">最热</a>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png" alt="" />
          <span>{{ formatNick(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </i>
            <i v-for="i in 5 - item.score" :key="i + 'k'" class="iconfont icon-wjx02"
              ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
              </svg>
            </i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 评论图片组件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"
                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                  <path
                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                  /></svg></i
              >{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
      <XtxPagination v-if="pageCount > 0" :page="reqParams.page" :pageCount="pageCount" @change="changePage" />
    </div>
  </div>
</template>
<script lang="ts">
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product'
import { reactive, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GoodsCommentImage from './goods-comment-image.vue'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup() {
    const commentInfo: Ref<any> = ref(null)
    const route = useRoute()
    findGoodsCommentInfo(route.params.id).then((data: any) => {
      data.result.tags.unshift({ title: '有图', tagCount: data.result.hasPictureCount, type: 'img' })
      data.result.tags.unshift({ title: '全部评价', tagCount: data.result.evaluateCount, active: true, type: 'all' })
      commentInfo.value = data.result
    })
    type reqParamsType = {
      page: number
      pagesize: number
      hasPicture: null | true
      tag: null | string
      sortField: null | 'praiseCount' | 'createTime'
    }
    const reqParams: reqParamsType = reactive({
      page: 1,
      pagesize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式：praiseCount 热度 createTime 最新
      sortField: null
    })
    // 改变排序方式
    const changeSort = (sort: null | 'praiseCount' | 'createTime') => {
      reqParams.sortField = sort
      // 重置页码
      reqParams.page = 1
    }
    // 点击“全部评价”，“有图”等 时触发的函数
    const changeTagsActive = (item: any) => {
      commentInfo.value.tags.forEach((item: any) => (item.active = false))
      item.active = true
      // 情况一：全部评价
      if (item.type === 'all') {
        reqParams.tag = null
        reqParams.hasPicture = null
      } else if (item.type === 'img') {
        // 情况二：有图
        reqParams.tag = null
        reqParams.hasPicture = true
      } else {
        // 情况三：其他tag
        reqParams.tag = item.title
        reqParams.hasPicture = null
      }
      // 重置页码
      reqParams.page = 1
    }
    const changePage = (page: number) => {
      reqParams.page = page
    }
    const commentList: Ref<any> = ref([])
    // pagesize用来存页数
    const pageCount = ref(0)
    // setInterval(() => {
    //   pageCount.value++
    // }, 3000)
    // 监听reqParams数据变化，一变化就更新评论列表
    watch(
      reqParams,
      () => {
        findGoodsCommentList(route.params.id, reqParams).then((data: any) => {
          commentList.value = data.result.items
          pageCount.value = Math.ceil(data.result.counts / reqParams.pagesize)
        })
      },
      { immediate: true }
    )
    const formatSpecs = (specs: any[]) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    // 格式化昵称，保护隐私
    const formatNick = (nickname: string) => {
      if (nickname.length <= 1) {
        return nickname[0] + '****'
      }
      return nickname[0] + '****' + nickname[nickname.length - 1]
    }
    return { commentInfo, changeTagsActive, reqParams, changeSort, commentList, formatSpecs, formatNick, changePage, pageCount }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
