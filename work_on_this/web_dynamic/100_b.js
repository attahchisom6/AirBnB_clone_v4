const AmenityDict = {};
const LocationDict = { states: {}, cities: {} };

$('input[type="checkbox"]').change(function() {
  const dataId = $(this).attr('data-id');
  const dataType = $(this).attr('data-type');
  const dataName = $(this).attr('data-name');

  if ($(this).is(':checked')) {
    if (dataType === 'amenity') {
      AmenityDict[dataId] = dataName;
    } else if (dataType === 'state' || dataType === 'city') {
      LocationDict[dataType][dataId] = dataName;
    }
  } else {
    if (dataType === 'amenity') {
      delete AmenityDict[dataId];
    } else if (dataType === 'state' || dataType === 'city') {
      delete LocationDict[dataType][dataId];
    }
  }

  const amenities = Object.values(AmenityDict);
  const states = Object.values(LocationDict.states);
  const cities = Object.values(LocationDict.cities);

  $('div.amenities h4').text(amenities.join(', '));
  $('div.locations h4').text([...states, ...cities].join(', '));
});

$('button').click(function() {
  const amenities = Object.keys(AmenityDict);
  const states = Object.keys(LocationDict.states);
  const cities = Object.keys(LocationDict.cities);

  const data = JSON.stringify({ amenities: amenities, states: states, cities: cities });

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
              ${place.max_guest} Guest{% if place.max_guest != 1 %}s{% endif %}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom{% if place.number_rooms != 1 %}s{% endif %}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}
            </div>
          </div>
          <div class="description">
            ${place.description | safe}
          </div>
        </article>`;
      }));
    }
  });
});
