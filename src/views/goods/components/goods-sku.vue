<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.id">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(item, val)" v-if="val.picture" class="" :src="val.picture" :title="val.name" alt="" />
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(item, val)" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set.js'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 切换选中状态的方法
    const changeSku = (item, val) => {
      // 如果按钮是禁用状态则直接返回
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((valItem) => {
          valItem.selected = false
        })
        val.selected = true
      }
      // 更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 将选中的sku信息发送给父组件
      const validSelectedValues = getSelectedValues(props.goods.specs).filter((v) => v)
      if (validSelectedValues.length === props.goods.specs.length) {
        const skuId = pathMap[validSelectedValues.join(spliter)][0]
        const sku = props.goods.skus.find((sku) => sku.id === skuId)
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 颜色: 魅力粉 尺寸: L码
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
    }
    const pathMap = getPathMap(props.goods.skus)
    // 设置默认选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    // 设置默认选中之后再更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    return { changeSku }
  }
}
// 默认选中，当props中有值的时候执行
const initDefaultSelected = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId)
  // 如果没找到，就return
  if (!sku) return
  sku.specs.forEach((spec) => {
    const name = spec.name // 颜色
    const valueName = spec.valueName // 薄荷绿
    // target就是要设置被选中的目标
    goods.specs.forEach((val) => {
      if (val.name === name) {
        val.values.forEach((newVal) => {
          if (newVal.name === valueName) {
            newVal.selected = true
            return
          }
          newVal.selected = false
        })
        // const target = val.values.find((newVal) => newVal.name === valueName)
        // target.selected = true
      }
    })
  })
}
const spliter = '★'
// 得到路径字典
const getPathMap = (skus) => {
  // 分隔符
  const pathMap = {}
  skus.forEach((sku) => {
    // 如果该sku有库存
    if (sku.inventory) {
      // 得到所有有效的
      const specs = sku.specs.map((spec) => spec.valueName) // 只得到了['薄荷绿','L码']
      const powerSet = getPowerSet(specs) // 得到的是[['薄荷绿'],['L码'],['薄荷绿','L码']]
      powerSet.forEach((set) => {
        const key = set.join(spliter)
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      // 如果已经被选中，则直接返回
      if (val.selected) return
      selectedValues[i] = val.name
      const key = selectedValues.filter((value) => value).join(spliter)
      val.disabled = !pathMap[key]
    })
  })
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
