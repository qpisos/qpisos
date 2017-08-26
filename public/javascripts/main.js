$(document).ready(function () {
  const sol = {
    lat: 40.417080,
    lng: -3.703612
  };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: sol
  });

  let marker = [];
  myListings.forEach(function (listing) {
    let title = listing.title
    let position = {
      lat: listing.location.coordinates[1],
      lng: listing.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title });
    marker.push(pin)
  });

});

$(".button-collapse").sideNav();
$('select').material_select();
$('.dropdown-button').dropdown({
           inDuration: 300,
           outDuration: 225,
           constrain_width: true, 
           hover: true, 
           gutter: 0, 
           belowOrigin: false 
           }
      );
   $('.modal').modal();        
  
   $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  
  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });
        

	
$("#softwareform").submit(function(e){
    e.preventDefault();
    $.ajax({
        type : 'POST',
        data: $("#softwareform").serialize(),
        url : 'url',
        success : function(data){
            $("#download_link").html(data);
            $("#download_modal").modal("show");
        }
    });
    return false;
});