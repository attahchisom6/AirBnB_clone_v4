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

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json'
      succes: function (response) {
        $('section.places').append(response.map(place => {
          return `<article>
                    <div class="title_box">
                      <h2>${ place.name }</h2>
                      <div class="price_by_night">
                        ${ place.price_by_night }
                      </div>
                    </div>
                    <div class="information">
                      <div class="max_guest">
                        ${ place.max_guest } Guest{% if place.max_guest != 1 %}s{% endif %}
                      </div>
                    <div class="number_rooms">
                      ${ place.number_rooms } Bedroom{% if place.number_rooms != 1 %}s{% endif %}
                    </div>
                    <div class="number_bathrooms">
                      ${ place.number_bathrooms } Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}
                    </div>
                  </div>
                  <div class="description">
                    ${ place.description | safe }
                  </div>
                </article>`
        }));
      }
    });

    const AmenityDict = {};
    $('INPUT[type=["checkbox"]').change(function () {
      const dataName = $(this).attr('data-name');
      const dataId = $(this).attr('data-id');
      if ($(this).is(':checked')) {
        AmenityDict[dataId] = dataName;
      } else {
        delete AmenityDict[dataId];
      }
      const results = Object.values(AmenityDict).join(', ');
      $('div.amenities h4').text(results);
    });
  });
} catch (error) {
  console.error(error);
}
