export default class AbstractGraph {
  constructor (cfg) {
    if (this.constructor === AbstractGraph) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  getDefaultCfg = () => {
    return {
      container: undefined,
      width: undefined,
      height: undefined,
      modes: {},
      data: {},
      minZoom: 0.02,
      maxZoom: 10,
      nodes: [], // 节点集合
      edges: [], // 关系线集合
      combos: [], // 组合集
      comboTrees: {}, //
      // 暂未弄清使用
      vedges: [], // 存储所有与折叠组合相关的虚拟关系线的关系线实例
      vnodes: [], // 存储所有与折叠组合相关的虚拟关系线的节点实例
      vcombos: [], // 存储所有与折叠组合相关的虚拟关系线的组合实例
      itemMap: {}, // 所有被排序后的实例
      tooltips: [] // 存储图上的 tooltip dom，方便销毁
    }
  }

  init = () => {
    this.initCanvas()

    // 初始化布局机制
    this.initLayoutController()

    // 初始化事件机制
    this.initEventController()

    // 创建群组
    this.initGroups()
  }

  initEventController = () => {
    throw new Error("Method 'data()' must be implemented.")
  }

  initLayoutController = () => {
    throw new Error("Method 'data()' must be implemented.")
  }

  /**
   * 获取 this.cfg 中的值
   * @param key 键
   */
  get = (key) => {
    return this.cfg?.[key]
  }

  /**
   * 将值设置到 this.cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  set = (key, val) => {
    this.cfg[key] = val
  }

  /**
   * 设置视图初始化数据
   * @param {*} data 初始化数据
   */
  data = (data) => {
    throw new Error("Method 'data()' must be implemented.")
  }

  /**
   * 根据data接口的数据渲染视图
   */
  render = () => {
    throw new Error("Method 'render()' must be implemented.")
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {*} data 源数据
   */
  changeData = (propsData) => {

  }

  /**
   * 导出图数据
   * @return {object} data
   */
  save () {

  }

  /**
     * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
     */
  refresh () {

  }

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  refreshPositions () {

  }

  /**
   * 清除画布元素
   * @return {object} this
   */
  clear () {

  }

  /**
   * 销毁画布
   */
  destroy () {

  }

  /**
   * 重新以当前示例中配置的属性进行一次布局
   */
  layout () {

  }

  /**
   * 更换布局配置项
   */
  updateLayout () {

  }

  /**
   * 注册节点
   * @param {*} typeName
   * @param {*} nodeDefinition
   */
  registerNode = (typeName, nodeDefinition) => {

  }

  /**
   * 注册关系线
   * @param {*} typeName
   * @param {*} nodeDefinition
   */
  registerEdge = (typeName, edgeDefinition) => {

  }

  /**
   * 注册组合
   * @param {*} comboName
   * @param {*} options
   */
  registerCombo = (comboName, options) => {

  }

  /**
   * 注册事件
   * @param {*} name
   * @param {*} func
   */
  on = (name, func) => {

  }

  findById = (id) => {

  }

  paint = () => {

  }

  addCombos = (combos) => {

  }

  /**
   * 根据已经存在的节点或 combo 创建新的 combo
   * @param combo combo ID 或 Combo 配置
   * @param children 添加到 Combo 中的元素，包括节点和 combo
   */
  createCombo = (combo, children) => {

  }

  /**
   * 解散 combo
   * @param {String | INode | ICombo} combo 需要被解散的 Combo item 或 id
   */
  uncombo = (combo) => {

  }

  /**
   * 根据 combo 位置更新内部节点位置
   */
  updateCombos = () => {

  }

  /**
   * 根据节点的更新，更新combo及其祖先combos
   * @param {*} combo
   */
  updateCombo (combo) {

  }

  /**
   * 删除元素
   * @param {元素id或元素实例} item
   */
  removeItem = (item) => {

  }

  /**
   * 新增元素
   * @param {*} type 元素类型(node | edge)
   * @param {*} model 元素数据模型
   */
  addItem = (type, model) => {

  }

  /**
   * 新增元素集合
   * @param {*} items
   */
  addItems = (items) => {

  }

  /**
   * 更新元素
   * @param {*} item
   * @param {*} cfg
   */
  updateItem = (item, cfg) => {

  }

  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态名称
   * @param {string | boolean} value 是否启用状态 或 状态值
   */
  setItemState = (item, state, value) => {

  }

  /**
   * 获取指定 Combo 中所有的节点
   * @param comboId combo ID
   */
  getComboChildren = (combo) => {

  }

  /**
   * 收起指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  collapseCombo = (combo) => {

  }

  /**
   * 展开指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  expandCombo = (combo) => {

  }

  collapseExpandCombo = (combo) => {

  }
}
