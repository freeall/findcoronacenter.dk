$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)
let map
const $typeAntigen = $('#type-antigen')
const $typePcr = $('#type-pcr')
const $bookingOptional = $('#booking-optional')
const $bookingNeeded = $('#booking-needed')
const $showOnlyOpen = $('#show-only-open')
const $lastUpdatedAt = $('#last-updated-at')
const $components = [$typeAntigen, $typePcr, $bookingOptional, $bookingNeeded, $showOnlyOpen]

$components.forEach($component => $component.addEventListener('click', update))
$lastUpdatedAt.innerHTML = dateFns.format(new Date(lastUpdated), 'DD/M HH:mm')
window.addEventListener('popstate', loadFromUrlId)
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  closeInfoWindow()
  setUrlId(null)
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
    center.hasNotOpenedYet
    center.openStatus = openStatus
    center.marker = new google.maps.Marker({
      title: center.testcenterName,
      icon,
      position: {
        lat: center.latitude,
        lng: center.longitude
      }
    })
    center.marker.addListener('click', () => {
      centers.forEach(center => center.info.close())
      center.info.open(map, center.marker)
      setUrlId(center.id)
    })
    center.info = generateInfoWindow(center)
  })

  updateStats()
  update()
  loadFromUrlId()
}

function loadFromUrlId () {
  const id = location?.search?.match(/id\=(.*)/) && location.search.match(/id\=(.*)/)[1]
  centers.forEach(center => center.info.close())

  const center = centers.find(center => center.id === id)
  center?.info?.open(map, center.marker)
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
}

function updateStats () {
  const stats = {
    lastUpdated,
    antigenCenters: centers.filter(({ type }) => type === 'Antigen').length,
    pcrCenters: centers.filter(({ type }) => type === 'PCR').length,
    openingSoonCenters: centers.filter(({ openStatus }) => openStatus === 'opensSoon').length,
    openCenters: centers.filter(({ openStatus }) => openStatus === 'open').length,
    closesSoonCenters: centers.filter(({ openStatus }) => openStatus === 'closesSoon').length,
    closedCenters: centers.filter(({ openStatus }) => openStatus === 'closed').length,
    notOpenYetCenters: centers.filter(({ timeStart }) => dateFns.isAfter(new Date(timeStart), new Date())).length,
    openAntigenCenters: centers.filter(({ type, openStatus }) => type === 'Antigen' && (openStatus === 'open' || openStatus === 'closesSoon')).length,
    openPcrCenters: centers.filter(({ type, openStatus }) => type === 'PCR' && (openStatus === 'open' || openStatus === 'closesSoon')).length
  }

  const $statsAllCenters = $$('.stats-all-centers')
  const $statsOpenCenters = $$('.stats-open-centers')
  const $statsOpenAntigenCenters = $$('.stats-open-antigen-centers')
  const $statsOpenPcrCenters = $$('.stats-open-pcr-centers')
  const $statsNeverOpenedCenters = $$('.stats-never-opened-centers')
  for (const $center of $statsAllCenters) $center.innerHTML = centers.length
  for (const $center of $statsOpenCenters) $center.innerHTML = stats.openCenters + stats.closesSoonCenters
  for (const $center of $statsOpenAntigenCenters) $center.innerHTML = stats.openAntigenCenters
  for (const $center of $statsOpenPcrCenters) $center.innerHTML = stats.openPcrCenters
  for (const $center of $statsNeverOpenedCenters) $center.innerHTML = stats.notOpenYetCenters
  console.log(stats)
}

function setUrlId (id) {
  const url = new URL(window.location)
  url.searchParams.set('id', id)
  if (!id) url.searchParams.delete('id')
  window.history.pushState({}, '', url)
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

function generateInfoWindow({
  openStatus, hasNotOpenedYet, testcenterName, timeStart, type, street,
  streetNumber, zipcode, city, region, openingHours, company, placement,
  requiresCprNumber, minimumAge, description, bookingLink, directionsLink
}) {
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="info">
        <div class="info-title info-title--${openStatus}">${testcenterName}</div>
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
                ${text(texts.opensOn)} ${dateFns.format(new Date(timeStart), 'MMMM do')}
              </div>
            </div>
          `
        }
        <div class="info-header">${text(texts.testType)}</div>
        <div class="info-content">
          <table>
            <tr>
              <td>${text(texts[type.toLowerCase()])}</td><td>${type === 'Antigen' ? '<img src="nose.png">' : '<img src="mouth.png">'}</td>
            </tr>
          </table>
        </div>
        <div class="info-header">${text(texts.address)}</div>
        <div class="info-content">
          ${testcenterName}<br />
          ${street} ${streetNumber}<br />
          ${zipcode} ${city}<br />
          ${region}
        </div>
        <div class="info-header">${text(texts.openingHours)}</div>
        <div class="info-content">
          <table>
            ${openingHours.map(openingHour => `
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
              <td>${text(texts.company)}</td><td>${company}</td>
            </tr>
            <tr>
              <td>${text(texts.placement)}</td><td>${text(placement === 'Stationary' ? texts.placementStationary : texts.placementMobile)}</td>
            </tr>
            <tr>
              <td>${text(texts.requiresCpr)}</td><td>${text(requiresCprNumber ? texts.yes : texts.no)}</td>
            </tr>
            <tr>
              <td>${text(texts.minimumAge)}</td><td>${minimumAge}</td>
            </tr>
            ${!description.trim().length
              ? ''
              : `
                <tr>
                  <td>${text(texts.description)}</td><td>${description}</td>
                </tr>
              `
            }
            <tr>
              ${!bookingLink
                ? `<td colspan="2">${text(texts.noBookingNeeded)}</td>`
                : `<td>Book here</td><td><a href="${bookingLink}" target="_blank">${bookingLink}</a></td>`
              }
            </tr>
            ${!directionsLink
              ? ''
              : `
                <tr>
                  <td colspan="2"><a href="${directionsLink}" target="_blank">${text(texts.getDirections)}</a></td>
                </tr>
              `
            }
          </table>
        </div>
      </div>
    `
  })
  infoWindow.addListener('closeclick', () => {
    location.hash = ''
  })
  return infoWindow
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
