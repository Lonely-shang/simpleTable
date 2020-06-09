import { State } from '../utils/TypeObject'

export default class TableStore {
  public states: State
  constructor () {
    this.states = {
      scrollBarWidth: 10,
      tableBodyLeft: 0,
      tableBodyTop: 0,
      columns: [],
      showData: [],
      columnsStatusList: [],
      filters: {},
      isMac: false,

       // 编辑器
      editor: {
        editorRange: {},
        editorXIndex: 0,
        editorYIndex: 0,
        curEditorCoverValue: '',
        editorShow: false,
        editorIsFixed: false,
        editing: false,
        editType: 'text',
        options: [],
        curEditorWidth: 80
      }

    }
  }
  // 判断是否是mac
  handleIsMac () {
    if (/macintosh|mac os x/i.test(navigator.userAgent)) {
      this.states.isMac = true
    }
  }
}
