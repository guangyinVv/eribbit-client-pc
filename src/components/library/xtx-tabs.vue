<script lang="jsx">
export default {
  name: 'XtxTabs',
  render() {
    const items = this.$slots.default()
    const nav = (
      <nav>
        {items.map((item) => {
          return <a href="javascript:;">{item.props.label}</a>
        })}
      </nav>
    )
    // const content = (
    //   <div>
    //     <div>内容1</div>
    //     <div>内容2</div>
    //     <div>内容3</div>
    //   </div>
    // )
    return <div class="xtx-tabs">{[nav, items]}</div>
  }
}
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
