/**
 * Fetch latest photographs from the Flickr API
 *
 * The data about latest photos comes from the Flickr REST API, and
 * are returned wrapped in a JSONP function 'jsonFlickrFeed'. This
 * script formats and stores the results in the latestPhotos array
 * and, once the DOM is ready, builds the gallery HTML.
 *
 */

// Container for formatted response data from the Flickr API
var latestPhotos = [];

var displayCount = 14;

// Parse and format the response from the Flickr API
function jsonFlickrFeed (response) {
  if (response && response.items) {
    latestPhotos = response.items;
  }
}

// Once the DOM is ready, build the gallery HTML.
$(document).ready(function () {

  var imageBoxes = [];

  $('#photos').masonry({
    columnWidth: function( containerWidth ) {
      return containerWidth / 3;
    },
    itemSelector: '.photo',
    gutter:20
  });

  // Process the latest photos obtained from the Flickr API
  for (var i = 0; i < displayCount; i++) {
    imageBoxes.push(
      '<div class="photo">'
      + '<a href="' + latestPhotos[i].link + '" target="_new">'
      + '<img src="' + latestPhotos[i].media.m + '" title="' + latestPhotos[i].title + '"/>'
      + '</a>' +
      '</div>'
    );
  }

  $('#photos')
    .append(imageBoxes)
    .masonry('appended', $(imageBoxes))
    .masonry('reload');

});
