$('button').click(function () {
  const amenities = Object.keys(AmenityDict);
  const data = JSON.stringify({ amenities: amenities });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: data,
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      // Display the search results
      $('section.places').empty().append(response.map(place => {
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
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
});
