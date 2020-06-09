<template>
	<table cellspacing="0" cellpadding="0" style="position: relative;">
    <colgroup>
      <col
        v-for="(columnWidth, index) in columnsWidth" :width="columnWidth"
        :key="index">
    </colgroup>
    <thead class="ls-thead">
      <tr ref="tr">
        <th
          v-for="(th, index) in columns"
          :key="index"
          :style="{
              width: `${columnsWidth[index]}px`,
              'text-align': th.align
          }">
          <!-- <el-checkbox
            v-if="th.type === 'selection'"
            size="mini"
            v-model="checkedAll"
            @change="selectAll">
          </el-checkbox> -->
          <p
            class="km-cell-content"
            :style="{width: `${columnsWidth[index] - 20}px`}"
            >
            <!-- <span class="icon" :class="iconClass(th.type)" v-if="showIcon"></span> -->
            <span class="content">{{ th.title }}</span>
          </p>
          <!-- <div
            v-if="th.type != 'selection'"
            class="dropdown"
            :class="{active: dropdown.index === index}">
            <i v-if="th.action" @click.stop="openDropdown(index)"></i>
          </div>
          <div
            v-if="th.type != 'selection'"
            class="handler"
            @mousedown="handlerDown(index)">
          </div> -->
        </th>
      </tr>
    </thead>
	</table>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
@Component({})
export default class TableHeader extends Vue {
  @Prop({ required: true }) store
  @Prop({ type: Array, default: () => [] }) columnsWidth

  get columns () {
    return this.store.states.columns
  }
}
</script>
<style lang="scss" scoped>
.ls-thead {
  position: relative;
  user-select: none;
  tr {
    background-color: #eef1f6;
  }
  th {
    position: relative;
    text-align: center;
    text-indent: 4px;
    border: 1px solid #d6dfe4;
    border-bottom: none;
    height: 30px;
  }
  // .dropdown {
  //   position: absolute;
  //   top: 10px;
  //   right: 10px;
  //   z-index: 1;
  //   display: flex;
  //   i {
  //     display: inline-block;
  //     width: 10px;
  //     height: 10px;
  //     background: url("../assets/dropdown.png") center center no-repeat;
  //     cursor: pointer;
  //     transition: all 0.3s;
  //   }
  //   &.active {
  //     i {
  //       transform: rotateZ(180deg);
  //     }
  //   }
  // }
  .handler {
    position: absolute;
    z-index: 1;
    top: 0;
    right: -8px;
    width: 16px;
    height: 30px;
    cursor: col-resize;
    text-align: center;
  }
  .active {
    color: #2d8cf0;
  }

  .content {
    vertical-align: middle;
  }

  // .icon {
  //   display: inline-block;
  //   width: 14px;
  //   height: 14px;
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   vertical-align: middle;
  //   &.text {
  //     background-image: url("../assets/text.png");
  //   }
  //   &.select {
  //     background-image: url("../assets/select.png");
  //   }
  //   &.date {
  //     background-image: url("../assets/date.png");
  //   }
  //   &.number {
  //     background-image: url("../assets/number.png");
  //   }
  // }
}
</style>