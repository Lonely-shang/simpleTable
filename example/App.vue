<template>
	<div>
    <SimpleTable :columns="columns" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SimpleTable from '../src/components/SimpleTable.vue'

@Component({
  components: {
    SimpleTable
  }
})
export default class App extends Vue {
  // 初始化数据
  private msg = 123

  private columns = [
    [
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      },
      {
        title: '单位',
        key: 'deptName',
        disabled: true,
        width: 100
      }
    ]
  ]
  // 声明周期钩子
  // mounted () {
  //   console.log( "11111" )
  // }

  // 计算属性
  // get computedMsg () {}

  // // 方法
  // greet () {}
}
</script>
<style lang="scss" scoped>

</style>
