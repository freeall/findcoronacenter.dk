$ = document.querySelector.bind(document)
let map
const $typeAntigen = $('#type-antigen')
const $typePcr = $('#type-pcr')
const $bookingOptional = $('#booking-optional')
const $bookingNeeded = $('#booking-needed')
const $showOnlyOpen = $('#show-only-open')
const $components = [$typeAntigen, $typePcr, $bookingOptional, $bookingNeeded, $showOnlyOpen]

$components.forEach($component => $component.addEventListener('click', update))
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeInfoWindow()
})

function initMap () {
  map = new google.maps.Map(document.getElementById('map'))
  const bounds = new google.maps.LatLngBounds()
  // Bounds taken from here https://gist.github.com/graydon/11198540
  bounds.extend({ lng: 8.08997684086, lat: 54.8000145534 })
  bounds.extend({ lng: 12.6900061378, lat: 57.730016588 })
  map.fitBounds(bounds)

  // Add marker
  centers.forEach(center => {
    const hasNotOpenedYet = dateFns.isAfter(new Date(center.timeStart), new Date())
    const openStatus = getOpenStatus(center)
    const iconType = center.type === 'Antigen' ? 'nose' : 'mouth'
    const iconColor = { opensSoon: 'yellow', open: 'green', closesSoon: 'yellow', closed: 'red' }[openStatus]
    const icon = `${iconType}-${iconColor}.png`
    center.marker = new google.maps.Marker({
      title: center.testcenterName,
      icon,
      position: {
        lat: center.latitude,
        lng: center.longitude
      }
    })
    center.openStatus = openStatus
    center.marker.addListener('click', () => {
      centers.forEach(center => center.info.close())
      center.info.open(map, center.marker)
    })
    center.info = new google.maps.InfoWindow({
      content: `
        <div class="info">
          <div class="info-title info-title--${openStatus}">${center.testcenterName}</div>
          ${openStatus === 'closesSoon'
            ? `
              <div class="info-header info-header--closesSoon">${text(texts.closesSoon)}</div>
            `
            : openStatus === 'opensSoon'
              ? `
                <div class="info-header info-header--opensSoon">${text(texts.opensSoon)}</div>
              `
              : ''
          }
          ${!hasNotOpenedYet
            ? ''
            : `
              <div>
                <div class="info-header info-header--note">
                  ${text(texts.hasNotOpenedYet)}
                </div>
                <div> class="info-header">
                  ${text(texts.opensOn)} ${dateFns.format(new Date(center.timeStart), 'MMMM do')}
                </div>
              </div>
            `
          }
          <div class="info-header">${text(texts.testType)}</div>
          <div class="info-content">
            <table>
              <tr>
                <td>${text(texts[center.type.toLowerCase()])}</td><td>${center.type === 'Antigen' ? '<img src="nose.png">' : '<img src="mouth.png">'}</td>
              </tr>
            </table>
          </div>
          <div class="info-header">${text(texts.address)}</div>
          <div class="info-content">
            ${center.testcenterName}<br />
            ${center.street} ${center.streetNumber}<br />
            ${center.zipcode} ${center.city}<br />
            ${center.region}
          </div>
          <div class="info-header">${text(texts.openingHours)}</div>
          <div class="info-content">
            <table>
              ${center.openingHours.map(openingHour => `
                <tr>
                  <td>${text(texts[openingHour.day.toLowerCase()])}</td><td>${openingHour.timeStart.replace(/(.*\:.*)\:.*/, (_, hhmm) => hhmm)} - ${openingHour.timeEnd.replace(/(.*\:.*)\:.*/, (_, hhmm) => hhmm)}</div>
                </tr>
              `).join('\n')}
            </table>
          </div>
          <div class="info-header">Info</div>
          <div class="info-content">
            <table>
              <tr>
                <td>${text(texts.company)}</td><td>${center.company}</td>
              </tr>
              <tr>
                <td>${text(texts.placement)}</td><td>${text(center.placement === 'Stationary' ? texts.placementStationary : texts.placementMobile)}</td>
              </tr>
              <tr>
                <td>${text(texts.requiresCpr)}</td><td>${text(center.requiresCprNumber ? texts.yes : texts.no)}</td>
              </tr>
              <tr>
                <td>${text(texts.minimumAge)}</td><td>${center.minimumAge}</td>
              </tr>
              ${!center.description.trim().length
                ? ''
                : `
                  <tr>
                    <td>${text(texts.description)}</td><td>${center.description}</td>
                  </tr>
                `
              }
              <tr>
                ${!center.bookingLink
                  ? `<td colspan="2">${text(texts.noBookingNeeded)}</td>`
                  : `<td>Book here</td><td><a href="${center.bookingLink}" target="_blank">${center.bookingLink}</a></td>`
                }
              </tr>
              ${!center.directionsLink
                ? ''
                : `
                  <tr>
                    <td colspan="2"><a href="${center.directionsLink}" target="_blank">${text(texts.getDirections)}</a></td>
                  </tr>
                `
              }
            </table>
          </div>
        </div>
      `
    })
  })

  // loadSettingsFromLocalStorage()
  updateStats()
  update()
}

function update () {
  const isTypeAntigen = $typeAntigen.checked
  const isTypePcr = $typePcr.checked
  const isBookingOptional = $bookingOptional.checked
  const isBookingNeeded = $bookingNeeded.checked
  const shouldOnlyShowOpen = $showOnlyOpen.checked

  // Update the map in this order so that the open centers are put on top
  const closedCenters = centers.filter(c => c.openStatus === 'closed')
  const closesSoonCenters = centers.filter(c => c.openStatus === 'closesSoon')
  const opensSoonCenters = centers.filter(c => c.openStatus === 'opensSoon')
  const openCenters = centers.filter(c => c.openStatus === 'open')
  const centersInDrawOrder = [closedCenters, closesSoonCenters, opensSoonCenters, openCenters]
  centersInDrawOrder.forEach(centers => centers.forEach(center => {
    const isClosed = center.openStatus === 'closed'
    const isTypeShown = (isTypeAntigen && center.type === 'Antigen') || (isTypePcr && center.type === 'PCR')
    const isBookingShown = (isBookingOptional && !center.bookingLink) || (isBookingNeeded && center.bookingLink)
    const shouldShow = isTypeShown && isBookingShown
    if (shouldOnlyShowOpen && isClosed) return center.marker.setMap(null)
    if (!shouldShow) return center.marker.setMap(null)
    center.marker.setMap(map)
  }))
  // storeSettingsInLocalStorage()
}

function updateStats () {
  const stats = {
    lastUpdated,
    antigenCenters: centers.filter(({ type }) => type === 'Antigen').length,
    pcrCenters: centers.filter(({ type }) => type === 'PCR').length,
    openingSoonCenters: centers.filter(center => center.openStatus === 'opensSoon').length,
    openCenters: centers.filter(center => center.openStatus === 'open').length,
    closesSoonCenters: centers.filter(center => center.openStatus === 'closesSoon').length,
    closedCenters: centers.filter(center => center.openStatus === 'closed').length,
    notOpenYetCenters: centers.filter(({ timeStart }) => dateFns.isAfter(new Date(timeStart), new Date())).length
  }
  console.log(stats)
}

function closeInfoWindow () {
  centers.forEach(center => center.info.close())
}

function getOpenStatus (center) {
  const now = new Date()
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateFns.getDay(now)]
  const hour = dateFns.getHours(now)
  const hasNotOpenedYet = dateFns.isAfter(new Date(center.timeStart), now)
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

  if (hasNotOpenedYet) return 'closed'
  if (!isOpen && !isOpenInOneHour) return 'closed'
  if (isOpen && isOpenInOneHour) return 'open'
  if (!isOpen && isOpenInOneHour) return 'opensSoon'
  return 'closesSoon'
}

function text (textId) {
  const lang = navigator.language.indexOf('da') > -1 ? 'da' : 'en'
  return textId[lang]
}

const texts = {
  closesSoon: {
    en: 'Closes soon',
    da: 'Lukker snart'
  },
  opensSoon: {
    en: 'Opens soon',
    da: 'Åbner snart'
  },
  hasNotOpenedYet: {
    en: 'Has not opened yet!',
    da: 'Ikke åben endnu'
  },
  opensOn: {
    en: 'Opens on',
    da: 'Åbner d.'
  },
  testType: {
    en: 'Test type',
    da: 'Testtype'
  },
  antigen: {
    en: 'Antigen',
    da: 'Hurtig-test'
  },
  pcr: {
    en: 'PCR',
    da: 'PCR-test'
  },
  address: {
    en: 'Address',
    da: 'Adresse'
  },
  openingHours: {
    en: 'Opening hours',
    da: 'Åbningstider'
  },
  monday: {
    en: 'Monday',
    da: 'Mandag'
  },
  tuesday: {
    en: 'Tuesday',
    da: 'Tirsdag'
  },
  wednesday: {
    en: 'Wednesday',
    da: 'Onsdag'
  },
  thursday: {
    en: 'Thursday',
    da: 'Torsdag'
  },
  friday: {
    en: 'Friday',
    da: 'Fredag'
  },
  saturday: {
    en: 'Saturday',
    da: 'Lørdag'
  },
  sunday: {
    en: 'Sunday',
    da: 'Søndag'
  },
  company: {
    en: 'Company',
    da: 'Udbyder'
  },
  placement: {
    en: 'Placement',
    da: 'Placering'
  },
  placementStationary: {
    en: 'Stationary',
    da: 'Fast'
  },
  placementMobile: {
    en: 'Mobile',
    da: 'Mobil'
  },
  requiresCpr: {
    en: 'Requires CPR',
    da: 'Kræver CPR'
  },
  yes: {
    en: 'Yes',
    da: 'Ja'
  },
  no: {
    en: 'No',
    da: 'Nej'
  },
  minimumAge: {
    en: 'Minimum age',
    da: 'Minimumsalder'
  },
  description: {
    en: 'Description',
    da: 'Beskrivelse'
  },
  noBookingNeeded: {
    en: 'No booking needed',
    da: 'Booking ikke nødvendig'
  },
  getDirections: {
    en: 'Get directions',
    da: 'Find vej'
  }
}
