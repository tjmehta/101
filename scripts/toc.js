(function($) {
$.fn.toc = function(options) {
  var $ul = $('.nav .dropdown .dropdown-menu').clone();
  $ul.find('li').each(function () {
    var $li = $(this);
    $li.attr('class', 'toc-h1');
    $li.html($li.html().replace('101/',''));
  });
  $ul.attr('class', 'nav nav-pills nav-stacked');
  $('#toc').append($ul);
};
})(jQuery);
