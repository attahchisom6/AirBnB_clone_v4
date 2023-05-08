const request = require('request');
const url = 'http://0.0.0.0:5001/api/v1/status';

try {
  $(document).ready(function () {
    request.get(url, (error, response) => {
      if (error) {
        console.log(error);
      }
      const stat = response.status;
      if (stat === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });

    $('button').click(function () {
      const amenityKeys = Object.keys(AmenityDict);
      const data = JSON.stringify({ amenities: amenityKeys });

      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
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
  });
} catch (error) {
  console.error(error);
}
