type State = {
  scrollBarWidth: Number,
  tableBodyLeft: Number,
  tableBodyTop: Number,
  columns: any,
  showData: Array<Object>
  columnsStatusList: any,
  filters: any,
  isMac: boolean,
  editor: any
}

type Columns = {
  title: String
  readonly key: String
  type?: String
  width?: Number
  align?: String
  fixed?: Boolean
}


export {
  State,
  Columns
}
