/* Get some content in here */
var updateFontSize = function(elem) {
  var fontStep = 1;
  var parentWidth = $(elem).width();
  var parentHeight = parseInt($(elem).css('max-height'), 10);
  var childElem = $(elem).find('span');
  while ((childElem.width() > parentWidth) || (childElem.height() > parentHeight)) {
    childElem.css('font-size', parseInt(childElem.css('font-size'), 10) - fontStep + 'px');
  }
};

function parseJson(data, wrapper, div, type) {
  var proposal_ractive = new Ractive({
    el: wrapper,
    template: div,
    data: {
      content: data
    },
    complete: function() {
      $.each($('.card .title'), function(index, title) {
        updateFontSize(title);
      });

      var clickElem = wrapper + " .click";

      $(clickElem).click(function(event) {
        var target = $(this).data('target');
        var action = $(this).data('label');
        sendGA('click', action, target);
      });
    }
  });
};

$(document).ready(function() {

  initLeaflets();

  $('.button').click(function(event) {
    var button = $(this).html();
    var section = $(this).attr('href');
    sendGA('click', button, section);
  });

  $('.click').click(function(event) {
    var target = $(this).data('target');
    var action = $(this).data('label');
    sendGA('click', action, target);
  });

});



