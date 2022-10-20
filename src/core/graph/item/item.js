export default class Item {
  /**
   * draw shape
   */
  draw = () => {

  }

  /**
   * 渲染后的逻辑，提供给子类复写
   */
  afterDraw = () => {

  }

  /**
   * 更新Item
   */
  update = () => {

  }

  /**
   * 更新后做一些工作
   */
  afterUpdate = () => {

  }

  /**
   * 更改元素状态， visible 不属于这个范畴
   */
  setState = () => {

  }
}
