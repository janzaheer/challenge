function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

function geoSuccess({ coords: { latitude, longitude } }) {
  document.getElementById('latitude').value = latitude
  document.getElementById('longitude').value = longitude
}

function geoError() {
  alert('Error fetching location')
}

function sort() {
  const urlParams = new URLSearchParams(window.location.search)
  const sortParam = urlParams.get('sort')

  if (sortParam === 'desc') {
    urlParams.set('sort', 'asc')
  } else if (sortParam === 'asc') {
    urlParams.set('sort', 'desc')
  } else {
    urlParams.set('sort', 'desc')
  }
  console.log(urlParams.toString())
  window.location.href = `/nearby-events?${urlParams.toString()}`
}
