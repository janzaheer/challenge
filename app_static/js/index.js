;(function() {
  const map = L.map('map-render').setView([start, end], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
    map
  )

  latLng.forEach(({ latitude, longitude, id, title }) => {
    L.marker([latitude, longitude], { icon: generateClassIcon(id) })
      .addTo(map)
      .bindPopup(title)
      .on('mouseover', () => hoverDiv(id))
      .on('mouseout', () => unHoverDiv(id))
  })

  map.on('dragend', function(e) {
    console.log('drag end')
    const { lat, lng } = map.getCenter()
    window.location.href = `/?latitude=${lat}&longitude=${lng}`
  })
})()

function hoverDiv(whichDiv) {
  const elem = document.querySelector(`[data-select='${whichDiv}']`)
  elem.classList.add('hover-color')
  elem.scrollIntoView(false)
}

function unHoverDiv(whichDiv) {
  const elem = document.querySelector(`[data-select='${whichDiv}']`)
  elem.classList.remove('hover-color')
}

function cardIn(whichMarker) {
  const mc = document.querySelector(`.marker-color-${whichMarker}`)
  mc.style.opacity = 0.7
  mc.style.width = '45px'
  mc.style.height = '45px'
}

function cardOut(whichMarker) {
  const mc = document.querySelector(`.marker-color-${whichMarker}`)
  mc.style.opacity = 1
  mc.style.width = '40px'
  mc.style.height = '40px'
}

function generateClassIcon(number) {
  return L.icon({
    iconUrl:
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [40, 40],
    className: `marker-color-${number}`
  })
}

function clickHome() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

function geoSuccess({ coords: { latitude, longitude } }) {
  window.location.href = `/search?latitude=${latitude}&longitude=${longitude}`
}

function geoError() {
  alert('Error fetching location')
}
