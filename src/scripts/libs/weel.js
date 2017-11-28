import * as fn from './functions.js'

export default class WeeL {

  constructor(selector, scope) {
    this.elems    = this.p(selector, scope)
    this.elem     = this.elems[0]
    this.selector = selector.toString()
    this.length   = this.elems.length

    return this
  }

  p(selector, scope) {
    if (selector.nodeType === 1) return [selector]

    if (fn.type(selector) === 'nodelist') return [...selector]

    return [...(!scope ? document : (scope.elem || scope)).querySelectorAll(selector)]
  }

  ready(callback) {
    callback(this)

    return this
  }

  /**
   * Proving this's elems has certain elem
   * @param  {String} selector Certain element's selector
   * @return {Array}           Result of proving elements
   */
  sight(selector) {
    const r = []

    for (let i = 0; i < this.length; i++) {
      const tg = this.elems[i]

      if (tg === tg.parentElement.querySelector(selector)) r.push(tg)
    }

    return r
  }

  children(selector) {
    const r = []

    this.elems.forEach(elem => r.push(elem.querySelector(selector)))

    this.elems = r
    this.elem = r[0]

    return this
  }

  /**
   * Find Parents Of Current Element (Not Full Test)
   * @param  {String} selector A element target of collection
   * @return {this}
   */
  parents(selector) {
    const r = []

    let parent = this.elem.parentElement

    while (parent.parentElement) {
      if (!selector) {
        r.push(parent)
      } else {
        if (parent.parentElement.querySelector(selector) === parent) r.push(parent)
      }

      parent = parent.parentElement
    }

    this.elems = r
    this.elem = r[0]

    return this
  }

  eq(idx = 0) {
    this.elem = this.elems[idx]

    return this
  }

  filter(callback) {
    this.elems = this.elems.filter(callback)
    this.elem = this.elems[0]
    
    return this
  }

  /**
   * Set Listeners of NodeList
   * @param  {String} type Listener method type, [add|remove]
   * @return {Function}    Generate a carry function
   */
  listener(type) {
    /**
     * Traversal function of event listener
     * @param  {String}   event    Event type, [click|focus|...]
     * @param  {Callback} method   Listener's Callback function
     * @param  {Boolean}  capture  Capture, true or false
     * @return {this}
     */
    return (event, method, capture) => {
      this.elems.forEach(elem => elem[`${type}EventListener`](event, method, capture))

      return this
    }
  }

  register(event, method, capture = false) {
    return this.listener('add')(event, method, capture)
  }

  forget(event, method, capture = false) {
    return this.listener('remove')(event, method, capture)
  }

  /**
   * Global Proxy Events by Propagating
   * @param  {String} event     Event Type, [click|...]
   * @param  {Array}  callbacks Events's callback list in arguments
   * @return {this}
   */
  delegate(event, ...callbacks) {
    return this.register(event, ev => {
      callbacks.forEach(callback => callback(ev))
    }, true)
  }

  on(list) {
    (list || this.elems).forEach(elem => !elem.classList.contains('_on') ? elem.classList.add('_on') : 0)

    return this
  }

  isOn() {
    return this.hasClass('_on')
  }

  off(list) {
    (list || this.elems).forEach(elem => elem.classList.contains('_on') ? elem.classList.remove('_on') : 0)

    return this
  }

  isOff() {
    return !this.hasClass('_on')
  }

  turn(list) {
    (list || this.elems).forEach(elem => elem.classList.toggle('_on'))
  }

  /**
   * Inspect Node Whether Has Specified Class Name
   * @param  {Element} node  A element that need to inspect
   * @param  {Array}   clses Some class name as flag
   * @return {Boolean}       Yes or no
   */
  hasClass(...clses) {
    const target = this.elem

    for (let i = 0; i < clses.length; i++)
      if (!target.classList.contains(clses[i])) return false

    return true
  }

  isUI(...clses) {
    return this.hasClass('-js', ...clses)
  }

  getAttr(name) {
    return this.elem.getAttribute(name)
  }

  attr(name, prefix = '') {
    const attrName = prefix + name
    const origin = this.getAttr(attrName) || ''
    const values = origin ? origin.split(' ') : []

    return ({
      del: value => {
        this.elem.setAttribute(attrName, values.filter(val => (val !== value)).join(' '))
      },
      add: value => {
        if (~values.indexOf(value)) return 0

        values.push(value)

        this.elem.setAttribute(attrName, values.join(' '))
      },
      get: () => origin,
      set: value => this.elem.setAttribute(attrName, value),
      clear: () => this.elem.setAttribute(attrName, ''),
    })
  }

  data(name) {
    return this.attr(name, 'data-')
  }

  text(content) {
    if (!content) return void 0

    const textNode = document.createTextNode(content)
    const target = this.elem
    while (target.firstChild) target.removeChild(target.firstChild)

    target.appendChild(textNode)

    return this
  }

  html(content, obj) {
    fn.injectHTML(content, obj || this.elem)

    return this
  }

}

/**
 * Export Module as Function
 * @param  {String} selector Param "selector" of Weel's constructor
 * @return {Object}          Weel's instance
 */
export const weel = (selector, scope) => new WeeL(selector, scope)

weel.type = fn.type
weel.log = fn.log
weel.i18n = fn.i18n
