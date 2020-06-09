<!--
 * @Descripttion: 
 * @version: 
 * @Author: Miliky
 * @Date: 2020-05-29 15:16:01
 * @LastEditors: Miliky
 * @LastEditTime: 2020-06-05 10:14:47
--> 
<template>
  <div ref="simpletable" class="ls-simpletable">
    <div
      v-if="TableStore.states.columns.length > 0"
      ref="wrapper"
      class="ls-table-wrapper"
      :style="{ maxWidth: `${tableWidth}px` }">
      <div class="km-table-header" ref="theader">
        <table-header
          ref="theaderContent"
          :columnsWidth="columnsWidth"
          :fixedCount="fixedCount"
          :all-show="true"
          :store="TableStore" />
      </div>
      <div ref="tbody" class="km-table-body" :style="{maxHeight: `${maxHeight}px`}">
        <table-body
          ref="tbodyContent"
          :columnsWidth="columnsWidth"
          :all-show="true"
          :cellStyle="cellStyle"
          :cellClassName="cellClassName"
          :rowHeight="rowHeight"
          :store="TableStore">
          <!-- 编辑器 -->
          <editor-table
            ref="editor"
            :columnsWidth="columnsWidth"
            :fixedCount="fixedCount"
            :rowHeight="rowHeight"
            :store="TableStore" />
        </table-body>
        <div
          v-if="TableStore.states.showData.length == 0"
          class="empty-block"
          :style="{width: `${tableWidth}px`}">
            暂无数据
        </div>
      </div>
      <!-- 左侧固定- -->
      <!-- <div ref="fixedWrapper" class="km-table-fixed" :style="{width: `${fixedWidth}px`}">
        <div class="km-table-fixed-header" ref="fixedTheader">
          <table-header
            ref="fixedTheaderContent"
            :showIcon="showIcon"
            :columnsWidth="columnsWidth"
            :fixedCount="fixedCount"
            :store="TableStore" />
        </div>
        <div ref="fixedTbody" class="km-table-fixed-body">
          <table-body
            ref="fixedTbodyContent"
            :columnsWidth="columnsWidth"
            :cellStyle="cellStyle"
            :cellClassName="cellClassName"
            :rowHeight="rowHeight"
            :store="TableStore" />
        </div>
      </div> -->
    </div>
    <div ref="wrapper" class="empty-columns" v-else>
      <div ref="theader">
        <div ref="theaderContent"></div>
      </div>
      <div ref="tbody">
        <div ref="tbodyContent"></div>
      </div>
      暂无表头
    </div>
  </div>
</template>
<script lang="ts">
import TableStore from '../store'
import { Columns } from '../utils/TypeObject'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import EditTable from './EditTable.vue'
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component({
  components: {
    TableHeader,
    TableBody,
    EditTable
  }
})
export default class SimpleTable extends Vue {
  @Prop({ type: Array, default: () => [] }) columns: Array<Array<Columns>>
  private TableStore = new TableStore() // 状态
  private tableWidth: Number | null = null
  private fixedCount: Number = 0
  private excelPos: any = {}
  private wrapperWidth: Number = 0
  // 列宽
  public columnsWidth: Array<Number> = []

  // 初始化数据
  private msg = 123

  // 声明周期钩子
  mounted () {
    this.init()
  }

  // 计算属性
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // 方法
  init () {
    this.TableStore.handleIsMac()
    this.initColumns()
    this.handleResize()
  }
  initColumns () {
    const { states } = this.TableStore
    const fixedArr = this.columns[this.columns.length - 1].filter((item) => item.fixed)
    const unFixedArr = this.columns[this.columns.length - 1].filter((item) => !item.fixed)
    states.columns = fixedArr.concat(unFixedArr).map((item) => {
      if (!item.width) {
        // item.width = parseInt(item.width, 10)
        item.width = Math.floor(Math.random() * 10 + 1)
      }
      return { ...item }
    })
    this.columnsWidth = states.columns.map((item) => item.width)
    states.columnsStatusList = states.columns.map((item) => ({
      key: item.key,
      type: item.type,
      list: {},
      sort: ''
    }))
    states.filters = {}
  }

  handleResize () {
    const { states } = this.TableStore
    let $simpletable: any = this.$refs.simpletable
    this.excelPos = $simpletable.getBoundingClientRect()
    // // 获取编辑框可移动范围, X是横轴, Y是竖轴
    states.editor.editorRange = {
      minX: states.columns.filter((item) => item.type === 'selection').length,
      maxX: states.columns.length - 1,
      minY: 0,
      maxY: states.showData.length - 1
    }
    const $wrapper: any = this.$refs.wrapper
    this.wrapperWidth = $wrapper.offsetWidth
    console.log(this.wrapperWidth)
    // this.$nextTick(() => {
    //   // 计算剩余列宽度
    //   const surplusColumns = states.columns.filter((item) => !item.width)
    //   let surplusColumnAvg

    //   if (!this.$refs.tbodyContent.$el) return
    //   if (surplusColumns.length > 0) {
    //     const surplusWidth = this.wrapperWidth - states.columns.filter((item) => item.width).reduce((total, item) => total + item.width, 0);
    //     if (surplusWidth > 0) {
    //       if (this.$refs.tbodyContent.$el.offsetHeight > this.maxHeight) {
    //         surplusColumnAvg = (surplusWidth - 1 - states.scrollBarWidth) / surplusColumns.length
    //       } else {
    //         surplusColumnAvg = (surplusWidth - 1) / surplusColumns.length
    //       }
    //     }
    //   }

    //   // 设置单元格宽度
    //   states.columns.forEach((column, index) => {
    //     if (column.width) {
    //       this.$set(this.columnsWidth, index, column.width)
    //     } else {
    //       // 设置单元格最小宽度
    //       if (surplusColumnAvg > 80) {
    //         this.$set(this.columnsWidth, index, surplusColumnAvg)
    //       } else {
    //         this.$set(this.columnsWidth, index, 80)
    //       }
    //     }
    //   })

    //   this.scrollLeftArr = this.columnsWidth.map((item, index) => {
    //     const sum = this.columnsWidth.reduce((total, curVal, curIndex) => {
    //       if (curIndex <= index) {
    //         return total + curVal
    //       }
    //       return total
    //     }, 0)
    //     return sum
    //   })

    //   this.scrollTopArr = states.showData.map((item, index) => {
    //     const sum = states.showData.reduce((total, curVal, curIndex) => {
    //       if (curIndex <= index) {
    //         return total + parseInt(this.rowHeight, 10)
    //       }
    //       return total
    //     }, 0)
    //     return sum
    //   })
    //   this.scrollTopArr.unshift(0)

    //   this.fixedCount = states.columns.filter((item) => item.fixed).length
    //   this.fixedWidth = this.scrollLeftArr[this.fixedCount - 1] || 0

    //   // 如果每列均设置了宽度
    //   const allWidth = states.columns.every((cell) => cell.width)
    //   if (allWidth) {
    //     this.tableWidth = states.columns.map((cell) => cell.width).reduce((a, b) => a + b, 0)
    //   } else {
    //     this.tableWidth = this.columnsWidth.reduce((total, cur) => total + cur, 0)
    //     if (this.tableWidth < this.wrapperWidth) {
    //       this.tableWidth = this.wrapperWidth
    //     }
    //   }

    //   this.$refs.theaderContent.$el.style.width = `${this.tableWidth}px`
    //   this.$refs.tbodyContent.$el.style.width = `${this.tableWidth}px`

    //   // 设置左侧theader高度与tbody距离顶部距离
    //   this.theaderHeight = this.$refs.theaderContent.$el.offsetHeight

    //   // 设置左侧定位高度
    //   this.$nextTick(() => {
    //     if (this.tableWidth > this.wrapperWidth) {
    //       this.$refs.fixedWrapper.style.height = `${$wrapper.offsetHeight - states.scrollBarWidth}px`
    //       this.$refs.fixedTbody.style.height = `${$wrapper.offsetHeight - states.scrollBarWidth - this.theaderHeight}px`
    //     } else {
    //       this.$refs.fixedWrapper.style.height = `${$wrapper.offsetHeight}px`
    //       this.$refs.fixedTbody.style.height = `${$wrapper.offsetHeight - this.theaderHeight}px`
    //     }
    //   });
    //   // 当出现竖向滚动条时处理滚动条
    //   if (this.$refs.tbodyContent.$el.offsetHeight > this.maxHeight) {
    //     this.$refs.tbody.style.overflowY = 'auto'
    //     this.$nextTick(() => {
    //       const colgroup = this.$refs.theaderContent.$el.querySelector('colgroup')
    //       const tr = this.$refs.theaderContent.$el.querySelector('tr')
    //       // 如果已存在Col，删除组中重新在末尾添加
    //       for (let i = 0; i < colgroup.children.length; i += 1) {
    //         if (colgroup.children[i].width === states.scrollBarWidth) {
    //           colgroup.removeChild(colgroup.children[i])
    //           tr.removeChild(tr.children[i])
    //         }
    //       }
    //       const col = document.createElement('col')
    //       col.width = states.scrollBarWidth.toString()
    //       colgroup.appendChild(col)

    //       const th = document.createElement('th')
    //       th.style.width = `${states.scrollBarWidth}px`
    //       th.style.borderTop = '1px solid #d6dfe4'
    //       tr.appendChild(th)

    //       this.$refs.tbodyContent.$el.style.width = `${this.tableWidth - states.scrollBarWidth - 1}px`
    //     })
    //   }
    // })
  }
}
</script>
<style lang="scss" scoped>
@import '../style/reset.scss';

.ls-simpletable {
  position: relative;
}

div,
section,
ul {
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e9eaec;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbbec4;
    border-radius: 10px;
    transition: all 1s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #80848f;
  }
}

.km-table-wrapper {
  position: relative;
  overflow: hidden;
  &.scrollX {
    border-right: 1px solid #d6dfe4;
    border-left: 1px solid #d6dfe4;
    /deep/ th,
    /deep/ td {
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
    .km-table-body {
      overflow-x: auto;
    }
  }
  /deep/ table {
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 12px;
    table-layout: fixed;
    .km-cell-content {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.km-table-header {
  overflow: hidden;
  /deep/ table {
    border-bottom: 1px solid #d6dfe4;
  }
}

.km-table-body {
  overflow: hidden;
  user-select: none;
  border-bottom: 1px solid #d6dfe4;

  /deep/ tbody {
    tr:first-child {
      td {
        border-top: none;
      }
    }
  }
}

// 左侧固定
.km-table-fixed {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 1px 0 8px #d3d4d6;
  overflow-x: hidden;
  background: #fff;
  user-select: none;
  z-index: 2;
  .km-table-fixed-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    /deep/ table {
      border-bottom: 1px solid #d6dfe4;
    }
  }
  .km-table-fixed-body {
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 3;
    overflow: hidden;
    border-bottom: 1px solid #d6dfe4;
    /deep/ tbody {
      tr:first-child {
        td {
          border-top: 2px solid transparent;
        }
      }
    }
  }
}

// 数据为空
.empty-block {
  position: relative;
  z-index: 9;
  font-size: 14px;
  padding: 30px;
  text-align: center;
  border-right: 1px solid #d6dfe4;
  border-left: 1px solid #d6dfe4;
  color: #909399;
}

.empty-columns {
  text-align: center;
  border: 1px solid #DCDFE6;
  padding: 10px 20px;
  color: #909399;
}

.el-checkbox {
  font-size: 12px;
}

.km-adjustLine {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: #d6dfe4;
  z-index: 10;
}
</style>