const lang = navigator.language.indexOf('da') > -1 ? 'da' : 'en'
const style = lang === 'en'
  ? '.lang-da { display: none; }'
  : '.lang-en { display: none; }'
const css = document.createElement('style')
css.type = 'text/css'

if (css.styleSheet) {
  css.styleSheet.cssText = style
} else {
  css.appendChild(document.createTextNode(style))
}

document.head.appendChild(css)
