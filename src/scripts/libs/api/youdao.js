import { i18n } from '../functions'

export default {
  name: '有道翻译',
  slug: 'youdao',
  dataType: 'json',

  parse: (json, args) => {
    const { basic = {}, translation = [] } = json
    const phonetic = {
      0: basic['phonetic'] || '',
      uk: basic['uk-phonetic'] || '',
      us: basic['us-phonetic'] || '',
    }
    const explains = basic.explains || []

    return ({ phonetic, explains, translation })
  },

  text: ({ q, keyfrom, key }) => ({
    url: 'http://fanyi.youdao.com/openapi.do',
    params: new Set([
      ['keyfrom', keyfrom || 'weel-translate'],
      ['key', key || '554026358'],
      ['type', 'data'],
      ['doctype', 'json'],
      ['version', 1.1],
      ['q', q],
    ]),
  }),

  voice: ({ q, from }) => ({
    url: 'http://dict.youdao.com/dictvoice',
    params: new Set([
      ['le', from],
      ['audio', q],
    ]),
  }),

  presets() {
    const { languages } = this

    return ({
      lang_from: {
        text: languages[0].trans,
        value: languages[0].code,
      },
      lang_to: {
        text: languages[0].trans,
        value: languages[0].code,
      },
    })
  },

  uniform(code) {
    return ({
      'zh': 'zh',
      'zh-CN': 'zh',
      'en': 'en',
      'jp': 'jap',
    })[code]
  },

  languages: [{
    code: '',
    name: 'Auto',
    slug: 'auto',
    trans: i18n.get('AUTOMATIC'),
  }],
}
