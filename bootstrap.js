setLanguage()

function setLanguage () {
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
}

function addStatusToCenters () {
  centers.forEach(center => {
    center.openStatus = getOpenStatus(center)
    center.hasNeverOpenedYet = dateFns.isAfter(new Date(center.timeStart), new Date())
  })
}

function getOpenStatus (center) {
  const now = new Date()
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateFns.getDay(now)]
  const hour = dateFns.getHours(now)
  const hasNeverOpenedYet = dateFns.isAfter(new Date(center.timeStart), now)
  const isOpen = center.openingHours.reduce((isOpen, openingHour) => {
    if (isOpen) return true
    if (openingHour.disabled) return false
    if (day !== openingHour.day) return false
    const from = dateFns.parse(`2000-01-01 ${openingHour.timeStart}`)
    const to = dateFns.parse(`2000-01-01 ${openingHour.timeEnd}`)
    const check = dateFns.parse(`2000-01-01 ${dateFns.format(now, 'HH:mm:ss')}`)
    return dateFns.isBefore(from, check) && dateFns.isAfter(to, check)
  }, false)
  const isOpenInOneHour = center.openingHours.reduce((isOpenInOneHour, openingHour) => {
    if (isOpenInOneHour) return true
    if (openingHour.disabled) return false
    if (day !== openingHour.day) return false
    const from = dateFns.parse(`2000-01-01 ${openingHour.timeStart}`)
    const to = dateFns.parse(`2000-01-01 ${openingHour.timeEnd}`)
    const checkNow = dateFns.parse(`2000-01-01 ${dateFns.format(now, 'HH:mm:ss')}`)
    const checkInOneHour = dateFns.addHours(checkNow, 1)
    return dateFns.isBefore(from, checkInOneHour) && dateFns.isAfter(to, checkInOneHour)
  }, false)

  if (hasNeverOpenedYet) return 'closed'
  if (!isOpen && !isOpenInOneHour) return 'closed'
  if (isOpen && isOpenInOneHour) return 'open'
  if (!isOpen && isOpenInOneHour) return 'opensSoon'
  return 'closesSoon'
}
