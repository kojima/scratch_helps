$(function() {

  $('.item').each(function () {
    $('.sub-item', $(this)).each(function() {
      if ($(this).index() % 2 == 0) {
        $(this).addClass('even')
      } else {
        $(this).addClass('odd');
      }
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
