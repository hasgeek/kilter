window.Kilter = {};

Kilter.sendGA = function (category, action, label) {
  if (typeof ga !== "undefined") {
    ga('send', { hitType: 'event', eventCategory: category, eventAction: action, eventLabel: label});
  }
};

Kilter.updateFontSize = function (elem) {
  var fontStep = 1;
  var parentWidth = $(elem).width();
  var parentHeight = parseInt($(elem).css('max-height'), 10);
  var childElem = $(elem).find('span');
  while ((childElem.width() > parentWidth) || (childElem.height() > parentHeight)) {
    childElem.css('font-size', parseInt(childElem.css('font-size'), 10) - fontStep + 'px');
  }
};

Kilter.getElemWidth = function(elem) {
  var card_width = $(elem).css('width');
  var card_margin = $(elem).css('margin-left');
  var card_total_width = parseInt(card_width, 10) + 2.5 * parseInt(card_margin, 10);
  return card_total_width;
};

Kilter.enableScroll = function(items_length, elem) {
  $(".mCustomScrollbar").css('width', items_length * Kilter.getElemWidth(elem) + 'px');
  $('.mCustomScrollbar').mCustomScrollbar({ axis:"x", theme: "dark-3", scrollInertia: 10, alwaysShowScrollbar: 0});
};

Kilter.parseJson = function (data, wrapper, div, type) {
  var proposal_ractive = new Ractive({
    el: wrapper,
    template: div,
    data: {
      content: data
    },
    oncomplete: function () {
      var clickElem = wrapper + " .click";

      $(clickElem).click(function(event) {
        var target = $(this).data('target');
        var action = $(this).data('label');
        Kilter.sendGA('click', action, target);
      });
    }
  });
};

Kilter.parseProposalJson = function(json) {
  var confirmedProposals = json.proposals.filter(function(proposal) {
    return proposal.status == 2;
  });
  var proposal_ractive = new Ractive({
    el: '#funnel-proposals',
    template: '#proposals-wrapper',
    data: {
      proposals: confirmedProposals,
    },
    oncomplete: function() {
      $.each($('.proposal-card .title'), function(index, title) {
        Kilter.updateFontSize(title);
      });

      //Set width of content div to enable horizontal scrolling
      Kilter.enableScroll(confirmedProposals.length, ".proposal-card");

      $(window).resize(function() {
        Kilter.enableScroll(confirmedProposals.length, ".proposal-card");
      });

      $('#funnel-proposals .click, #funnel-proposals .btn').click(function(event) {
        var action = $(this).data('label');
        var target = $(this).data('target');
        Kilter.sendGA('click', action, target);
      });
    }
  });
};

$(document).ready(function() {

  if ($("#nav-home").length) {
    var siteNavTop = $("#nav-home").offset().top;
  }

  $(window).scroll(function() {
    if($("#nav-home").length) {
      if($(this).scrollTop() > siteNavTop) {
        $('#nav-home').addClass('navbar-fixed-top');
      }
      else {
        $('#nav-home').removeClass('navbar-fixed-top');
      }
    }
  });

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
