/**
* @preserve Smooth Scroll Page Up/Down Buttons 1.2 | @senff | GPL2 Licensed
*/

(function ($) {

  $.fn.pageScrollUpDownButtons = function(options) {

    var settings = $.extend({
      // Default
      positioning: 0,
      topbutton: false,
      distance: 100,
      speed: 1200
      }, options );

    scrollDistance = parseInt(settings.distance)/100;
    scrollSpeed = parseInt(settings.speed);

    if (settings.topbutton) {
      withClass="with-top";
    } else {
      withClass="no-top";
    }

    $('body').append('<div class="page-scroll-buttons position-style-'+settings.positioning+' '+withClass+'"><button class="one-page-up not-functional">UP</button><button class="one-page-down not-functional">DOWN</button"><button class="all-the-way-to-top not-functional">TOP</button></div>'); 
      checkMyButtons = setInterval(function(){showButtons()},10);
      
    $('.page-scroll-buttons').on('click','.one-page-up',function(){
      scrollOnePageUp(scrollDistance,scrollSpeed);
    });

    $('.page-scroll-buttons').on('click','.one-page-down',function(){
      scrollOnePageDown(scrollDistance,scrollSpeed);
    });

    $('.page-scroll-buttons').on('click','.all-the-way-to-top',function(){
      letsScroll(0,scrollSpeed);
    });        

  }

  function showButtons(){
    // Let's check if the buttons need to be shown at all

    pageHeight = $(window).height();
    docHeight = $(document).height();
    scrolledSoFar = $(window).scrollTop();

    if (scrolledSoFar>(docHeight-pageHeight-1)) {
      $('.page-scroll-buttons .one-page-down').addClass('not-functional').css('opacity','0.3');
    } else {
      $('.page-scroll-buttons .one-page-down').removeClass('not-functional').css('opacity','1');
    }

    if (scrolledSoFar>0) {
      $('.page-scroll-buttons .one-page-up, .page-scroll-buttons .all-the-way-to-top').removeClass('not-functional').css('opacity','1');
    } else {
      $('.page-scroll-buttons .one-page-up, .page-scroll-buttons .all-the-way-to-top').addClass('not-functional').css('opacity','0.3');
    } 

  }

  function scrollOnePageUp(scrollDistance,scrollSpeed){
    pageHeight = $(window).height();
    scrolledSoFar = $(window).scrollTop();

    if (scrolledSoFar+21<(pageHeight*scrollDistance)) {
      // We haven't scrolled a whole page yet, so let's just go to 0
      letsScroll(0,scrollSpeed);
    } else {
      // Scroll one page up
      letsScroll(parseInt(scrolledSoFar-(pageHeight*scrollDistance)+20),scrollSpeed);  // scroll a little less up: 20px BELOW
    }
    
  }

  function scrollOnePageDown(scrollDistance,scrollSpeed){
    pageHeight = $(window).height();
    docHeight = $(document).height();
    scrolledSoFar = $(window).scrollTop();

    if ((scrolledSoFar-19)>(docHeight-pageHeight-(pageHeight*scrollDistance))) {
      // There's less than a scroll left, so let's just go to the bottom 
      letsScroll(docHeight-pageHeight,scrollSpeed);
      $('.page-scroll-buttons .one-page-down').addClass('not-functional');
    } else {
      // Scroll one page down
      letsScroll(parseInt(scrolledSoFar+(pageHeight*scrollDistance)-20),scrollSpeed); // scroll a little less down: 20px ABOVE
      //letsScroll(docHeight-pageHeight);
    } 
  }

  function letsScroll(toPosition,scrollSpeed){
    $('html,body').stop().animate({
      scrollTop:toPosition
    },scrollSpeed);

  }

}(jQuery));