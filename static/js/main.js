window.Kilter = {};

Kilter.sendGA = function(category, action, label) {
  if (typeof ga !== "undefined") {
    ga('send', { hitType: 'event', eventCategory: category, eventAction: action, eventLabel: label});
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
      var clickElem = wrapper + " .click";

      $(clickElem).click(function(event) {
        var target = $(this).data('target');
        var action = $(this).data('label');
        Kilter.sendGA('click', action, target);
      });
    }
  });
};

$(document).ready(function() {

  initLeaflets();

  $('.smooth-scroll').click(function(event) {
    event.preventDefault();
    var section = $(this).attr('href');
    var sectionPos = $(""+section).offset().top - $('.site-navbar').height();
    $('html,body').animate({scrollTop:sectionPos}, '900');
  });

  $('.button').click(function(event) {
    var button = $(this).html();
    var section = $(this).attr('href');
    Kilter.sendGA('click', button, section);
  });

  $('.click').click(function(event) {
    var target = $(this).data('target');
    var action = $(this).data('label');
    Kilter.sendGA('click', action, target);
  });

});



