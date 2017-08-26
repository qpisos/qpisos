

function printMapAndMarker(title, lng, lat) {
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: lat, lng: lng }
  });

  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: title
  });

  $(document).ready(function (printMapAndMarker) {
    var url = 'https://api.nestoria.es/api?encoding=json&pretty=1&action=search_listings&country=es&listing_type=buy&place_name=madrid&centre_point=' + lat + ',' + lng
    console.log(url);
    $.ajax({
      url: url,
      method: 'GET',
      success: printCompetition,
      error: function (error) {
        console.log('error');
      }
    });

    let marker = [];
    printCompetition.forEach(function (competition) {
      let title = listing.title
      let position = {
        lat: competition.location.coordinates[1],
        lng: competition.location.coordinates[0]
      };
      var pin = new google.maps.Marker({ position, map, title });
      marker.push(pin)
    });
  });
};
$(".button-collapse").sideNav();
$('select').material_select();
$(".dropdown-button").dropdown();
$('.carousel').carousel();
$('.carousel.carousel-slider').carousel({fullWidth: true});
