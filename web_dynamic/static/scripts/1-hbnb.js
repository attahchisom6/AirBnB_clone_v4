try {
  $(document).ready(function () {
    const AmenityDict = {};
    $('INPUT[type="checkbox"]').change(function () {
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
