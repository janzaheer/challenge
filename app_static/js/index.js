;(function() {
  const map = L.map('map-render').setView([start, end], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
    map
  )
  let  markers = [];
  latLng.forEach(({ latitude, longitude, id, title }) => {
    const mark = L.marker([latitude, longitude], { icon: generateClassIcon(id) })
      .addTo(map)
      .bindPopup(title)
      .on('mouseover', () => hoverDiv(id))
      .on('mouseout', () => unHoverDiv(id))
    markers.push(mark)
  })

  map.on('dragend', function(e) {
    const { lat, lng } = map.getCenter()

    fetch(`api/map-drag?latitude=${lat}&longitude=${lng}`).then(response => response.json()).then(result => {
        const eventsDiv = document.getElementById('events');
        const output = JSON.parse(result.events).map(({fields,pk})=>{
            return `
                <div class="row color" data-select=${pk} onmouseover="cardIn(${pk})" onmouseout="cardOut(${pk})">
                    <div class="col-md-3 activity">
                        <a class="explorbutton" href="https://www.mtbproject.com/trail/5025822/marshall-canyon" target="_blank"> 
                            <div class="img-fluid  rounded my-2 ml-3 activity_img" style = "background: url('https://cdn-files.apstatic.com/mtb/5260391_medium_1554330297.jpg'); background-position: center; background-size: cover;"></div>
                        </a>
                    </div>
                    <div class="col-md-8 my-2 activity_desc">
                        <a class="explorbutton" href="https://www.mtbproject.com/trail/5025822/marshall-canyon" target="_blank"> 
                        <h3 class="mb-0 pb-0">${fields.title}</h3></a>
                        <p>
                        Flow like a dream beneath the oaks in SoCal&#39;s very own Sherwood Forest
                            <ul>
                                <li>  <i class="fas fa-star"></i>  <i class="fas fa-star"></i>  <i class="fas fa-star"></i>  <i class="fas fa-star"></i>  (85 votes)</li>
                                <li>blue</li>
                                <li>10.4 miles</li>
                                <li>1355 ft ascent</li>
                            </ul>
                        </p>
                    </div>
			  </div>
            `
        }).join('')
        eventsDiv.innerHTML = output

        markers.forEach(marker => map.removeLayer(marker))
        
        markers = [];
        JSON.parse(result.events).forEach(({fields,pk})=>{
            const mark = L.marker([fields.latitude, fields.longitude], { icon: generateClassIcon(pk) })
            .addTo(map)
            .bindPopup(fields.title)
            .on('mouseover', () => hoverDiv(pk))
            .on('mouseout', () => unHoverDiv(pk))
            markers.push(mark)
        })
    })
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
