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

function filter(has_sort=false) {
    const eventDate = document.getElementById('eventDate').value
    const surface = document.getElementById('surface').value
    const routeDuration = document.getElementById('routeDuration').value
    const elevationGain = document.getElementById('elevationGain').value
    const averageGradient = document.getElementById('averageGraident').value
    const supportAmenties = document.getElementById('supportAmenties').value
    const lat = document.getElementById('latitude').value
    const lng = document.getElementById('longitude').value

    const sortParam = document.querySelector('[data-sort]')
    let curr = sortParam.getAttribute('data-sort')
    if (has_sort) {
        if (curr === 'desc') {
            curr = 'asc'
        } else {
            curr = 'desc'
        }
        sortParam.setAttribute('data-sort',curr)
    }

    fetch(`api/nearby-events?eventDate=${eventDate}&routeDuration=${routeDuration}&surface=${surface}&elevationGain=${elevationGain}&averageGradient=${averageGradient}&supportAmenties=${supportAmenties}&latitud=${lat}&longitude=${lng}&sort=${curr}`)
        .then(res => res.json())
        .then(result => {
            const nearbyEvents = document.getElementById('nearby-events')
            const output = JSON.parse(result.events).map(({fields,pk},index)=>{
                return `
                <tr>
                    <td scope="row">${index+1}</td>
                    <td>${fields.title}</td>
                    <td>${fields.event_date}</td>
                    <td>${fields.surface}</td>
                    <td>${fields.route_duration}</td>
                    <td>${fields.elevation_gain}</td>
                    <td>${fields.average_gradient}</td>
                    <td>${fields.support_amenities}</td>
                    <td>${fields.registration_fee}</td>
                    <td>25.7441 mi.</td>
                </tr>
                `
            }).join('')
            nearbyEvents.innerHTML = output;
            document.getElementById('close-button').click();
        })
}
