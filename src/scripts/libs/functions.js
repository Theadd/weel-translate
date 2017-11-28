export const type = (obj, val = '') => {
  const str = /(\w+)\]$/.exec(Object.prototype.toString.apply(obj).toLowerCase())[1]

  return !val ? str : (val === str)
}

export const getInputMeta = target => {
  const { name } = target
  let value

  switch (target.type) {

  case 'checkbox':
    value = target.checked
    break

  default:
    value = target.value
  }

  return [name, value]
}

export const log = (...params) => {
  console.log(...params)
}

export const injectHTML = (content, obj) => {
  if (!content) return void 0
  let doms = [content]

  if (type(content, 'string')) {
    const parser = new DOMParser()

    doms = [...parser.parseFromString(content, 'text/html').body.childNodes]
  }

  const target = obj
  while (target.firstChild) target.removeChild(target.firstChild)

  doms.forEach(dom => target.appendChild(dom))
}

export const i18n = {
  get(msg = '') {
    let r = ''

    try {
      r = browser.i18n.getMessage(msg)
    } catch (e) {
      r = msg
      .replace(/\_+/g, ' ').toLowerCase()
      .replace(/( |^)[a-z]/g, a => a.toUpperCase())
    }

    return r
  },

  html(obj) {
    const str = obj.innerHTML.toString()
    const msg = str.replace(/\_\_MSG\_(\w+)\_\_/g, (match, $1) => $1 ? this.get($1) : '')

    if (msg !== str) injectHTML(msg, obj)
  },
}

/**
 * Generate API's fetch request
 * @param  {Object}  preset          API's kinds of service
 * @param  {String}  [type='text'] The kind of service
 * @return {Closure}
 */
export const apiParse = (preset, type = 'text') => {
  if (!preset.parse) return console.error('Supply A `parse` Method in API Preset!')

  /**
   * Beginning the fetch
   * @param  {Object}  [args={}] API's params
   * @param  {Boolean} getURL    Whether or not return URL string
   * @return {Response}          Use `then` method to recevie a json data
   */
  return (args = {}, getURL = false) => {
    if (!args.q) return console.error('Required Content to Translating!')

    const s = new URLSearchParams()
    const { url, params } = preset[type](args)

    for (let el of params) s.append(el[0], el[1])

    if (getURL) return `${url}?${s}`

    return fetch(`${url}?${s}`, { mode: 'no-cors' })
      .then(res => res[preset.dataType]())
      .then(data => preset.parse(data, args))
  }
}

/** @type {Map} Stores Callbacks with Action Name */
export const doActions = new Map()

/**
 * Define What An Action Is Going To Be Stored
 * @param  {String} name   Define an action's name by string const
 * @param  {Array}  params Provide to callback function as params
 * @return {Boolean}       Operation status with boolean
 */
export const do_action = (name, ...params) => {
  const callbacks = doActions.get(name)

  if (!callbacks) return 0

  callbacks.forEach(callback => callback(...params))

  return 1
}

/**
 * Add Callback Function Into Action
 * @param {String}   name     Action name existed in `doAction` Map
 * @param {Function} callback Do something when action is active
 */
export const add_action = (name, callback) => {
  const callbacks = doActions.get(name) || new Set()

  if (callback.name.length) {
    for (let cb of callbacks) {
      if (cb.name === callback.name) return 1
    }
  }

  if (callbacks.has(callback)) return 0

  callbacks.add(callback)

  doActions.set(name, callbacks)
}

/**
 * Detect Language's Type, Default return 'en'
 * @param  {String}   text    Some words are needed detecting
 * @param  {Function} uniform A callback to covert standard code to API's language code
 * @return {String}           Language code
 */
export const detectLanguage = (text, uniform) => {
  const languages = {
    'zh': /[^\u4e00-\u9fa5\s\。\，\“\”\；\：\！\？\、\/\‘\’]/,
    'jp': /[^\u0800-\u4e00\s\。\，\“\”\；\：\！\？\、\/\‘\’]/,
    'en': /[^a-zA-Z\s\,\.\/\;\:\'\"\-\!\@\#\$\%\&\*]/,
  }

  for (let lang in languages) {
    if (languages.hasOwnProperty(lang)) {
      if (!languages[lang].test(text)) {
        if (!!uniform) {
          return uniform(lang) || lang
        } else {
          return lang
        }
      }
    }
  }

  return ''
}
