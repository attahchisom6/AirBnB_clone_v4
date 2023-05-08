const amenities = {};
const states = {};
const cities = {};

$('input[type="checkbox"]').change(function() {
  const id = $(this).data('id');
  const name = $(this).data('name');

  if ($(this).is(':checked')) {
    if ($(this).hasClass('amenity')) {
      amenities[id] = name;
    } else if ($(this).hasClass('state')) {
      states[id] = name;
    } else if ($(this).hasClass('city')) {
      cities[id] = name;
    }
  } else {
    if ($(this).hasClass('amenity')) {
      delete amenities[id];
    } else if ($(this).hasClass('state')) {
      delete states[id];
    } else if ($(this).hasClass('city')) {
      delete cities[id];
    }
  }

  const amenitiesList = Object.values(amenities).join(', ');
  const statesList = Object.values(states).join(', ');
  const citiesList = Object.values(cities).join(', ');

  $('div.locations h4').html(`States: ${statesList}<br>Cities: ${citiesList}`);
});

$('button').click(function() {
  const data = JSON.stringify({
    amenities: Object.keys(amenities),
    states: Object.keys(states),
    cities: Object.keys(cities)
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: data,
    dataType: 'json',
    contentType: 'application/json',
    success: function(response) {
      $('section.places').empty().append(response.map(place => {
        return `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">
              ${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
      }));
    }
  });
});

