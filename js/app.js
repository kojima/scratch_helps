$(function() {

  setup();

  $('.item').each(function () {
    var count = 0;
    $('.sub-item', $(this)).each(function() {
      if ($(this).css('display') == 'none') return;

      if (count % 2 == 0) {
        $(this).addClass('even')
      } else {
        $(this).addClass('odd');
      }
      count++;
    });
  });

  var zIndex = $('.item').length;
  $('#header').css('z-index', zIndex * 10);
  for (var index = 0; index < $('.item').length; index++) {
    var $item = $('.item').eq(index);
    $item.addClass('close');
    var $title = $('.title', $item);
    $title.css('z-index', zIndex * 2);
    var $ul = $('ul', $item);
    $ul.css('z-index', zIndex);
    $ul.css('margin-top', -1 * $ul.height());
    zIndex--;
  }

  $('.item .title').on('click', function() {
    var $item = $(this).parent('.item');
    var $ul = $('ul', $item);
    if ($item.hasClass('close')) {
      $item.removeClass('close').addClass('open');
      $(function() {
        $ul.animate({ marginTop: 0 }, 500);
        $("body").animate({ scrollTop: $item.height() * $item.index() }, 500);
      });
      // close other items
      $('.item').not($item).each(function() {
        $(this).removeClass('open').addClass('close');
        var $ul = $('ul', $(this));
        $ul.animate({ marginTop: -1 * $ul.height() }, 500);
      });
    } else {
      $item.removeClass('open').addClass('close');
      $ul.animate({ marginTop: -1 * $ul.height() });
    }
  });

  $(window).on('resize', handleResize);

  $('.content img').on('load', handleResize);
});

function handleResize() {
  for (var index = 0; index < $('.item').length; index++) {
    var $item = $('.item').eq(index);
    if ($item.hasClass('close')) {
      var $ul = $('ul', $item);
      $ul.css('margin-top', -1 * $ul.height());
    }
  }
}

function getQueryString() {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
}

function setup() {
  var queryString = getQueryString();
  if (queryString['kinect'] === 'true') {
    $('.scratch-only').hide();
    $('.scratch-x-kinect').show();
  } else {
    $('.scratch-only').show();
    $('.scratch-x-kinect').hide();
  }
}
