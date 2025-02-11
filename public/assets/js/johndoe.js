/*!
=========================================================
* JohnDoe Landing page
=========================================================

* Copyright: 2019 Alejandro Vinokur (https://Alejandro Vinokur.com)
* Licensed: (https://Alejandro Vinokur.com/licenses)
* Coded by www.Alejandro Vinokur.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// Portfolio filters
$(window).on("load", function() {
  var t = $(".portfolio-container");
  t.isotope({
      filter: "*",
      animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false
      }
  });

  // Manejo de clics en los filtros
  $(".filters a").click(function() {
      $(".filters .active").removeClass("active");
      $(this).addClass("active");
      var i = $(this).attr("data-filter");
      t.isotope({
          filter: i,
          animationOptions: {
              duration: 750,
              easing: "linear",
              queue: false
          }
      });
      return false; // Prevenir comportamiento predeterminado del enlace
  });
});

$(document).ready(function() {

  document.querySelectorAll('.portfolio a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  $('.portfolio-item .btn-primary').click(function(e) {
    e.preventDefault();
    
    var projectImage = $(this).closest('.portfolio-item').find('.img-fluid').attr('src');
    var projectDescription = $(this).closest('.content-holder').find('.subtitle').html(); 
    var projectTitle = $(this).closest('.content-holder').find('.title').html(); 

    $('#popup-img').attr('src', projectImage);
    $('#popup-title').html(projectTitle); 
    $('#popup-description').html(projectDescription); 

    $('#project-popup').fadeIn();
  });
  
  $('.popup .close').click(function() {
    $('#project-popup').fadeOut();
  });

  $(window).click(function(event) {
    if ($(event.target).is('#project-popup')) {
      $('#project-popup').fadeOut();
    }
  });
});


// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.674, lng: -73.945},
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}
