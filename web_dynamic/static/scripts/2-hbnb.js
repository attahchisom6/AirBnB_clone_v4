const request = require('request');
const url = 'http://0.0.0.0:5001/api/v1/status';

try {
  $(document).ready(function () {
    request.get(url, (error, response) => {
      if (error) {
        console.log(error);
      }
      const stat = response.statusCode;
      if (stat === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
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
