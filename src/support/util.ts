import _ from "lodash"
import DebugModule from "debug"

export default class Debug {
  public debug: DebugModule.Debugger
  constructor(namespace: string) {
    this.debug = DebugModule(namespace)
  }
  debugFromWin = (obj: {}) => {
    _.extend(window, obj)
  }
  debugObj = (obj: {}) => {
    _.each(obj, (val, key) => {
      this.debug(key, val)
    })
  }
  static enable = DebugModule.enable.bind(DebugModule)
}
