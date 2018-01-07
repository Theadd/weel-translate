export default
`{
  "id": "google",
  "name": "Google",
  "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHnSURBVEhLtZU9S8NAGMeTilVBBMUWQXCx0DpZ5+qi7gqufgLBXb+IOghOWhVFXC2uLjo4iIWKgzoIHYQivoGk/i73JCVt3mjwB3+eu+ftklxyMf4bU2wozWYzjSYZjiFVU0cPqVTqB9s9lmWVUBm9s4AHfF/oFM1LenwoyqIT6RWJWggzKuXhkJxHT7o0PtTsSQsPnj0gKYO5MU1zQns01H9iLlEVWaiAFskbxKp4hfEyUnnByK26MFdsM+y4ffwjaBedoz5xB0NSSbfVMFesSzgQUntkGA7Nyrq1hvmBhJJDvzQN3VdRXTqo9z4x9ibTbIoNurc9wBq3fEQzMvVAbEOGgZDzTH3rCbDAvLpyB+ZlCXUgKaFQfyfpRkpsO7GOkBD6xboLvIp1yIvtloZYvQDP/5E7+7A9mumgTSZvyEdLEnaoiW1Bw0MSXZjvSygS0o91lYbaNQm1wD9LwNIp7qsa+aGRsyolNsy/MepY74Sg31GxxdDvqBhAm+hXZ2uY70iKTfthl8Vcsyd+h10FVYmZzNX+LDAcVnEH/C+YIt/Am/b4QFKBhbo5ruuYorQJh+QMOtOl0ZB7hXJSHh+K5tARakgvF3zql3mBVpgGfbDxvlga9KIcz3xcNcelfvq1xD/95BjGH64vwr9Y/F6UAAAAAElFTkSuQmCC",

  "host": "https://translate.google.com",

  "query": {
    "text": {
      "method": "GET",
      "url": "{{host}}/translate_a/single",
      "params": [
        ["q", "{{q}}"],
        ["sl", "{{from}}"],
        ["tl", "{{to}}"],
        ["hl", "{{to}}"],
        ["client", "gtx"],
        ["ie", "UTF-8"],
        ["oe", "UTF-8"],
        ["dt", ["bd", "rm", "t"]],
        ["dj", "1"],
        ["source", "icon"]
      ]
    },
    "audio": {
      "method": "GET",      
      "url": "{{host}}/translate_tts",
      "params": [
        ["q", "{{q}}"],
        ["tl", "{{from}}"],
        ["client", "gtx"],
        ["ie", "UTF-8"]
      ]
    }
  },

  "parser": {
    "phonetic_src": "sentences.$.src_translit",
    "phonetic_dest": "sentences.$.translit",
    "translation": "sentences(trans)",
    "explain": "dict(pos////terms)"
  },

  "fromto" : ["auto", "auto"],

  "include": ["auto", "en", "zh-cn", "ja", "ko", "es", "de"]
}`
