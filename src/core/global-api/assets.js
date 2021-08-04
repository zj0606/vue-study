/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ASSET_TYPES = ['component','directive','filter']
  ASSET_TYPES.forEach(type => {
    // 例如：Vue.component = function(){}
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // 如果type 是组建 definition是纯对象
        if (type === 'component' && isPlainObject(definition)) {
          // 得到name
          definition.name = definition.name || id
          // 得到构造函数
          // definition就是传入组件的构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册例如：{components:{'comp':Ctor}}
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
