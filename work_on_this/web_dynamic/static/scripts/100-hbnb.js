const request = require('request');
const url = 'http://0.0.0.0:5001/api/v1/status';

$(document).ready(function () {
  try {
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

    const AmenityDict = {};
    const stateDict = {};
    const cityDict = {};

    $('input[type="checkbox"]').change(function () {
      const dataId = $(this).attr('data-id');
      const dataName = $(this).attr('data-name');

      if ($(this).is(':checked')) {
        if ($(this).hasClass('amenities')) {
          AmenityDict[dataId] = dataName;
        } else if ($(this).hasClass('states')) {
          stateDict[dataId] = dataName;
        } else if ($(this).hasClass('cities')) {
          cityDict[dataId] = dataName;
        }
      } else {
        if ($(this).hasClass('amenities')) {
          delete AmenityDict[dataId];
        } else if ($(this).hasClass('states')) {
          delete stateDict[dataId];
        } else if ($(this).hasClass('cities')) {
          delete cityDict[dataId];
        }
      }

      const amenityList = Object.values(AmenityDict).join(', ');
      const stateList = Object.values(stateDict).join('. ');
      const cityList = Object.values(cityDict).join(', ');

      $('div.amenities h4').text(amenityList);
      $('div.locations h4').html(`States: ${stateList}<br>Cities: ${cityList}`);
    });

    $('button').click(function () {
      const amenityKeys = Object.keys(AmenityDict);
      const cityKeys = Object.keys(cityDict);
      const stateKeys = Object.keys(stateDict);

      const data = JSON.stringify({
        amenities: amenityKeys,
        states: stateKeys,
        cities: cityKeys
      });

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
  } catch (error) {
    console.error(error);
  }
});
