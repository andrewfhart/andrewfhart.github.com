var topbar_height  = 40;
var topbar_padding = 10;
var topbar_height_padded = topbar_height + topbar_padding;

(function ($) {
  "use strict";

  var htmlNode = $('html'),
      mobile = htmlNode.hasClass('mobile') === true ? true : false,
      baseCssAssetPath    = '{{site.root}}/styesheets/',
      baseJsAssetPath     = '{{site.root}}/javascripts/',
      mobileStylesheetUrl = baseCssAssetPath + 'mobile-1.6.css',
      stellarScriptUrl    = baseJsAssetPath  + 'plugins/jquery.stellar.min.js';

  yepnope([{
    test: mobile,
    nope: [stellarScriptUrl],
    callback: function (url, testResult) {
      if (testResult === false) {
        /*
        $.stellar({
           horizontalScrolling: false
        });
        */
      }
    }
  },
  {
    test: mobile,
    yep: [mobileStylesheetUrl]
  }]);
})(jQuery);

$(window).load(function () {
  "use strict";

  var htmlBodyNode = $('html, body'),
      subnavPinPosition,
      subNavigationNode = $('#sub-navigation'),
      subnavigationTopOffset = (subNavigationNode.length > 0) ? subNavigationNode.offset().top : 0,
      hasSubNav = (subNavigationNode && subNavigationNode.length === 1) ? true : false,
      subNavigationHeight = subNavigationNode.height(),
      subNavAlwaysPinned = (hasSubNav === true && subNavigationNode.hasClass('always-pinned')) ? true : false,
      subnavContentSections = $('.subnav-content-section'),
      mobile = $('html').hasClass('mobile') === true ? true : false;

  function checkActiveSubnavItem(sTop) {
    //Iteration over all, last 1 to fit the check wins
    subnavContentSections.each(function () {
      var sectionId = '#' + $(this).attr('id');

      if (sTop >= parseInt($(sectionId).offset().top, 10) - (topbar_height + 60)) {
        $('#subnav a.current').removeClass('current');
        $(sectionId + '-link').addClass('current');
      }
    });
  }

  function calculateSubnavPinPosition() {
    //The subnav will utlimately pin just below the top nav
    subnavPinPosition = $('#site-navigation').height() + 1;
  }

  function checkSubnavPinnedState(sTop) {
    //Adjust the scrollTop int to account for the size of the fixed top level nav
    var adjustedSTop = sTop + subnavPinPosition;

    //When the subnav touches the top nav pin it
    if ((adjustedSTop >= subnavigationTopOffset) && subNavigationNode.hasClass('pinned') === false) {
      subNavigationNode.addClass('pinned');
    } else if ((adjustedSTop < subnavigationTopOffset) && subNavigationNode.hasClass('pinned') === true) {
      subNavigationNode.removeClass('pinned');
    }
  }


  /** Init **/
  //Set the position at which we pin the subnav (for pages that have a subnav)
  if (hasSubNav === true && subNavAlwaysPinned === false) {
    calculateSubnavPinPosition();
  }

  /** Events **/

  //This group of events is only related to the subnav
  if (hasSubNav === true) {
    //Inner page content scrolling (subnav clicks)
    $('#subnav.innerpage-links a').on('click', function (e) {
      e.preventDefault();

      var scrollTarget = $(this).attr('href'),
          scrollTargetOffset = parseInt($(scrollTarget).offset().top, 10) - (topbar_height_padded + 25);


      //Account for the fact that when the subnav is pinned it removes its height from the document
      // causing the scrolltop to change when visually it should not.
      if ($('#sub-navigation').hasClass('pinned') === false) {
        scrollTargetOffset = scrollTargetOffset - subNavigationHeight;
      }

      //Skrollr supports scrolling, but since we aren't using on mobile we want something
      //that works consistently across both.
      htmlBodyNode.stop().animate({
        scrollTop: scrollTargetOffset
      }, 800);
    });

    //The location of the pinned sub-nav and the highlighted subnav item are dependent on scrollTop...
    $(window).on('scroll', function () {
      var sTop = $(this).scrollTop();
      checkActiveSubnavItem(sTop);

      //Leave the subnav alone, it is always pinned on this page (and mobile as a whole)
      if (subNavAlwaysPinned === false && mobile === false) {
        checkSubnavPinnedState(sTop);
      }
    });
  }

  /* Fixed position elements create various issues in mobile. Bring the navs
     back inline with the document flow in mobile. */
  if (hasSubNav === true && mobile === true) {
    subNavigationNode.addClass("pinned always-pinned");
    subNavAlwaysPinned = true;
    subnavigationTopOffset = subNavigationNode.offset().top;
    calculateSubnavPinPosition();
  }
});
