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

updateStats()
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
    const iconType = center.type === 'Antigen' ? 'antigen' : 'pcr'
    const iconColor = { opensSoon: 'yellow', open: 'green', closesSoon: 'yellow', closed: 'red' }[center.openStatus]
    const icon = `${iconType}-${iconColor}.png`
    const zIndexes = {
      closed: 1,
      opensSoon: 2,
      closesSoon: 3,
      open: 4
    }
    center.marker = new google.maps.Marker({
      title: center.testcenterName,
      zIndex: zIndexes[center.openStatus],
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

  update()
  loadFromUrlId()
}

function loadFromUrlId () {
  const id = location.search && location.search.match(/id\=(.*)/) && location.search.match(/id\=(.*)/)[1]
  centers.forEach(center => center.info.close())

  const center = centers.find(center => center.id === id)
  center && center.info && center.info.open(map, center.marker)
}

function update () {
  const isTypeAntigen = $typeAntigen.checked
  const isTypePcr = $typePcr.checked
  const isBookingOptional = $bookingOptional.checked
  const isBookingNeeded = $bookingNeeded.checked
  const shouldOnlyShowOpen = $showOnlyOpen.checked

  // Update the map in this order so that the open centers are put on top
  centers.forEach(center => {
    const isClosed = center.openStatus === 'closed'
    const isTypeShown = (isTypeAntigen && center.type === 'Antigen') || (isTypePcr && center.type === 'PCR')
    const isBookingShown = (isBookingOptional && !center.bookingLink) || (isBookingNeeded && center.bookingLink)
    const shouldShow = isTypeShown && isBookingShown
    if (shouldOnlyShowOpen && isClosed) return center.marker.setMap(null)
    if (!shouldShow) return center.marker.setMap(null)
    center.marker.setMap(map)
  })
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

function generateInfoWindow({
  openStatus, hasNeverOpenedYet, testcenterName, timeStart, type, street,
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
        ${!hasNeverOpenedYet
          ? ''
          : `
            <div>
              <div class="info-header info-header--note">
                ${text(texts.hasNeverOpenedYet)}
              </div>
              <div class="info-header">
                ${text(texts.opensOn)} ${dateFns.format(new Date(timeStart), 'DD/M HH:mm')}
              </div>
            </div>
          `
        }
        <div class="info-header">${text(texts.testType)}</div>
        <div class="info-content">
          <table>
            <tr>
              <td>${text(texts[type.toLowerCase()])}</td><td>${type === 'Antigen' ? '<img class="type-logo" src="antigen-black.png">' : '<img class="type-logo" src="pcr-black.png">'}</td>
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
  hasNeverOpenedYet: {
    en: 'Has never opened yet!',
    da: 'Ikke åben endnu'
  },
  opensOn: {
    en: 'Opens on',
    da: 'Åbner'
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
