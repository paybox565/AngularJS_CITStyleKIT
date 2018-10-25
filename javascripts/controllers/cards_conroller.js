
'use strict';

var $ = require('jquery');

angular.module('sgApp').controller('CardsController', function ($scope) {


  function infoGraph(){

    $('.js-drop_list_trigger').click(function(){
      $(this).toggleClass('active');
      $('.js-drop_list').toggle(300);
    });

    $(document).click(function(event) {
      if ($(event.target).closest('.js-drop-list-wrap').length) return;
      $('.js-drop_list').hide(300);
      $('.js-drop_list_trigger').removeClass('active');
      event.stopPropagation();
    });

  }

  infoGraph();

  function perfect_scroll(){
    $('.js-perfect-scroll').perfectScrollbar();
  }

  setTimeout(perfect_scroll, 500); 


});

