<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder">{{ selectedCitys }}</span>
      <span class="value"></span>
      <i style="display: flex; align-items: center" class="iconfont icon-angle-down">
        <svg style="transform: rotate(90deg)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeClickCity(item)" v-for="item in currList" :key="item.code">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  // modelValue需要provinceCode,countyCode,cityCode三个数据
  props: ['modelValue', 'placeholder'],
  setup(props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    const openDialog = () => {
      open()
      active.value = true
    }
    const closeDialog = () => {
      active.value = false
      // 如果中途退出，则清空已经点击的城市数据
      if (selectedCityList.value.length < 3) {
        currentLevel.value = 0
        clickCity.value = null
        selectedCityList.value = []
      }
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })

    // 获取城市数据,显示当前地方列表
    // 2. 显示和隐藏函数（为什么是函数，做更多事情）
    const loading = ref(false)
    const cityData = ref([])
    const open = () => {
      loading.value = true
      // 获取数据
      getCityData().then((data) => {
        cityData.value = data
        loading.value = false
      })
    }
    // 设置一个初始化函数
    const init = () => {
      closeDialog()
      currentLevel.value = 0
      clickCity.value = null
    }
    // 设置一个数组，放置选中的城市数据
    const selectedCityList = ref([])
    // setInterval(() => {
    //   console.log(props)
    // }, 3000)
    watch(
      () => props.modelValue,
      (newVal) => {
        if (props.modelValue && props.modelValue.countyCode !== selectedCityList.value[2]?.code) {
          selectedCityList.value = [{ code: props.modelValue.provinceCode }, { code: props.modelValue.cityCode }, { code: props.modelValue.countyCode }]
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    // 用来存选中城市的拼接形式
    const selectedCitys = computed(() => {
      if (selectedCityList.value.length === 3) {
        if (selectedCityList.value[0].name) {
          return `${selectedCityList.value[0].name} ${selectedCityList.value[1].name} ${selectedCityList.value[2].name}`
        }
        return props.modelValue.fullLocation
      }
      return props.placeholder || '请选择配送地址'
    })
    // 数据的双向绑定
    watch(
      () => selectedCityList,
      (newVal) => {
        if (newVal.value.length === 3) {
          emit('update:modelValue', {
            provinceCode: selectedCityList.value[0].code,
            provinceName: selectedCityList.value[0].name,
            cityName: selectedCityList.value[1].name,
            countryName: selectedCityList.value[2].name,
            cityCode: selectedCityList.value[1].code,
            countyCode: selectedCityList.value[2].code,
            fullLocation: selectedCityList.value[0].name ? `${selectedCityList.value[0].name} ${selectedCityList.value[1].name} ${selectedCityList.value[2].name}` : props.modelValue.fullLocation
          })
        }
      },
      { immediate: true, deep: true }
    )

    // 当前的城市等级
    const currentLevel = ref(0)
    // 被点击的城市
    const clickCity = ref(null)
    const changeClickCity = (item) => {
      // 在点击之前，先把点击的城市数据加入数组
      if (selectedCityList.value.length === 3) {
        selectedCityList.value = []
      }
      selectedCityList.value.push({
        code: item.code,
        name: item.name
      })
      if (item.areaList) {
        clickCity.value = item
        currentLevel.value++
      } else {
        init()
      }
    }
    // 定义计算属性,显示当前需要显示的城市列表信息
    const currList = computed(() => {
      let currList
      switch (currentLevel.value) {
        case 0: {
          currList = cityData.value
          break
        }
        default: {
          if (clickCity.value) {
            currList = clickCity.value.areaList
          }
          break
        }
      }
      // TODO 根据点击的省份城市获取对应的列表
      return currList
    })

    return { active, toggleDialog, target, currList, loading, clickCity, changeClickCity, selectedCitys }
  }
}
// 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  // margin-left: 10px;
  .option {
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/load.gif) no-repeat center;
    }
  }
  .select {
    display: flex;
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
