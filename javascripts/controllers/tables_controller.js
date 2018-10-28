
'use strict';

global.jQuery = require('jquery');
var $ = global.jQuery;
global.$ = global.jQuery;

//var dt = require( 'datatables.net' )();
//var dt_fixedcolumns = require( 'datatables.net-fixedcolumns' )();
//var dt_fixedheader = require( 'datatables.net-fixedheader' )();
//var sumoSelect = require('../../plugins/sumoselect/jquery.sumoselect');

require('perfect-scrollbar/jquery')($);


angular.module('sgApp').controller('TablesController', function ($scope, $templateCache, $templateRequest) {
  $scope.tables_examples = [
    {
      name: 'With thin column',
      templateUrl: 'views/code_examples/table_simple.html',
      codeJS: ''
    },
    {
      name: 'Dropdown list',
      templateUrl: 'views/code_examples/table_toggled.html',
      codeJS: ''
    },
    {
      name: 'Few columns (sort)',
      templateUrl: 'views/code_examples/table_sort.html',
      codeJS: ''
    },
    {
      name: 'Striped',
      templateUrl: 'views/code_examples/table_striped.html',
      codeJS: ''
    },
    {
      name: 'With focus',
      templateUrl: 'views/code_examples/table_focus.html',
      codeJS: ''
    },
    {
      name: 'Horizontal scroll',
      templateUrl: 'views/code_examples/table_scroll.html',
      codeJS: ''
    },
    {
      name: 'With filter',
      templateUrl: 'views/code_examples/table_filter.html',
      codeJS: 'views/code_examples/table_filter_js.html',
      plugin: '* SumoSelect (from plugins) and js-code needed'
    }/*,
    {
      name: 'Fixed scrollbar, header',
      plugin: '* needed PerfectScrollbar and js-code',
      templateUrl: 'views/code_examples/table_fixed-scroll-column.html',
      codeJS: 'views/code_examples/table_fix-scroll-js.html'
    }*/

  ];

  $scope.template = function (url) {
    //return !url ? undefined : ($templateCache.get(url) || $templateRequest(url)); // с проверкой на пустое поле

    return $templateCache.get(url) || $templateRequest(url);

  };


  $scope.fixCol = false;
  $scope.activeButtonFixcol = function() {
    $scope.fixCol = !$scope.fixCol;
  };

  $scope.fixScroll = false;
  $scope.activeButtonFixscroll = function() {
    $scope.fixScroll = !$scope.fixScroll;
  };

  $scope.wFilter = false;
  $scope.activeButtonFilter = function() {
    $scope.wFilter = !$scope.wFilter;
  };

  // Tables.Fixed column

  function fn_table_fix_column(){

    $('.js-table-row-fixed').each(function(){

      var $maxHeight = 0;

      $('.table__cell', this).each(function(){

        if ( $(this).height() > $maxHeight )
        {
          $maxHeight = $(this).height();
        }

      });

      $('.table__cell', this).height($maxHeight);

    });

  }

  // Custom date and select

  function fn_select_plugin() {

    $(".datepicker").datepicker();

    $(".select").select2({
      width: 'off'
    });

  }

  function fn_multiple_select() {

    $('.multi-select').SumoSelect({
      locale :  ['Ок', 'Отмена', 'Выбрать все'],
      placeholder: 'Колонки',
      captionFormat: '{0} Выбрано',
      captionFormatAllSelected: 'Выбраны все',
      selectAll: true
    });

  }

  // StickyHeader plugin

  function sticky_table(){

    $('.js-sticky-table').each(function() {
      if($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
        // Clone <thead>
        var $w	   = $(window),
          $t	   = $(this),
          $thead = $t.find('thead').clone(),
          $col   = $t.find('thead, tbody').clone();

        // Add class, remove margins, reset width and wrap table
        $t
          .addClass('sticky-enabled')
          .css({
            margin: 0,
            width: '100%'
          }).wrap('<div class="sticky-wrap" />');

        if($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');

        // Create new sticky table head (basic)
        $t.after('<table class="sticky-thead" />');

        // If <tbody> contains <th>, then we create sticky column and intersect (advanced)
        if($t.find('tbody th').length > 0) {
          $t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
        }

        // Create shorthand for things
        var $stickyHead  = $(this).siblings('.sticky-thead'),
          $stickyCol   = $(this).siblings('.sticky-col'),
          $stickyInsct = $(this).siblings('.sticky-intersect'),
          $stickyWrap  = $(this).parent('.sticky-wrap');

        $stickyHead.append($thead);

        $stickyCol
          .append($col)
          .find('thead th:gt(0)').remove()
          .end()
          .find('tbody td').remove();

        $stickyInsct.html('<thead><tr><th class="table__cell table__cell--headline">'+$t.find('thead th:first-child').html()+'</th></tr></thead>');

        // Set widths
        var setWidths = function () {
            $t
              .find('thead th').each(function (i) {
              $stickyHead.find('th').eq(i).width($(this).width());
            })
              .end()
              .find('tr').each(function (i) {
              $stickyCol.find('tr').eq(i).height($(this).height());
            });

            // Set width of sticky table head
            $stickyHead.width($t.width());

            // Set width of sticky table col
            $stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width())
          },
          repositionStickyHead = function () {
            // Return value of calculated allowance
            var allowance = calcAllowance();

            // Check if wrapper parent is overflowing along the y-axis
            if($t.height() > $stickyWrap.height()) {
              // If it is overflowing (advanced layout)
              // Position sticky header based on wrapper scrollTop()
              if($stickyWrap.scrollTop() > 0) {
                // When top of wrapping parent is out of view
                $stickyHead.add($stickyInsct).css({
                  opacity: 1,
                  top: $stickyWrap.scrollTop()
                });
              } else {
                // When top of wrapping parent is in view
                $stickyHead.add($stickyInsct).css({
                  opacity: 0,
                  top: 0
                });
              }
            } else {
              // If it is not overflowing (basic layout)
              // Position sticky header based on viewport scrollTop
              if($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
                // When top of viewport is in the table itself
                $stickyHead.add($stickyInsct).css({
                  opacity: 1,
                  top: $w.scrollTop() - $t.offset().top
                });
              } else {
                // When top of viewport is above or below table
                $stickyHead.add($stickyInsct).css({
                  opacity: 0,
                  top: 0
                });
              }
            }
          },
          repositionStickyCol = function () {
            if($stickyWrap.scrollLeft() > 0) {
              // When left of wrapping parent is out of view
              $stickyCol.add($stickyInsct).css({
                opacity: 1,
                left: $stickyWrap.scrollLeft()
              });
            } else {
              // When left of wrapping parent is in view
              $stickyCol
                .css({ opacity: 0 })
                .add($stickyInsct).css({ left: 0 });
            }
          },
          calcAllowance = function () {
            var a = 0;
            // Calculate allowance
            $t.find('tbody tr:lt(3)').each(function () {
              a += $(this).height();
            });

            // Set fail safe limit (last three row might be too tall)
            // Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
            if(a > $w.height()*0.25) {
              a = $w.height()*0.25;
            }

            // Add the height of sticky header
            a += $stickyHead.height();
            return a;
          };

        setWidths();

        $t.parent('.sticky-wrap').scroll(function() {
          repositionStickyHead();
          repositionStickyCol();
        });

        $w
          .load(setWidths)
          .resize( function () {
            setWidths();
            repositionStickyHead();
            repositionStickyCol();
          })
          .scroll(function() {
            repositionStickyHead();
          });
      }
    });

    $('.sticky-wrap').perfectScrollbar();

  }

  // Datatables plugin

  function fixedDataTables() {

    $('.js-datatable-fixedcol').dataTable({
      paginate: false,
      searching: false,
      ordering:  false,
      info: false,
      scrollX: true,
      scrollY: '80vh',
      fixedColumns: true
    });

  }   

  // fixed Scroll

  function fn_fixed_scroll_origin() {

    var the_top = $(document).scrollTop();
    var the_window_height = $(window).height();
    var the_element_pos = $('.js-fixed-scroll').find('.sticky-wrap').offset().top;
    var the_element_height = $('.js-fixed-scroll').find('.sticky-wrap').outerHeight();
    var the_element_stop = $('.js-fixed-scroll').find('.js-fixed-scroll-stop').offset().top;
    var the_stop_moment = 0;

    $('.js-btn-resize').click(function () {

      if ($(this).hasClass('js-resized')) {

        $(this).removeClass('js-resized');
        $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');

        $(window).scroll(function() {

          if (the_top > the_element_pos - the_window_height + 70){
            $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');
          }

        });

      }
      else {

        $(this).addClass('js-resized');

        $(window).scroll(function() {

          the_top = $(document).scrollTop();
          the_element_pos = $('.js-fixed-scroll').find('.sticky-wrap').offset().top;
          the_element_height = $('.js-fixed-scroll').find('.sticky-wrap').outerHeight();
          the_element_stop = $('.js-fixed-scroll').find('.js-fixed-scroll-stop').offset().top;
          the_stop_moment = the_element_stop - the_window_height;

          if (the_top > the_stop_moment) {
            $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');
          }
          else if (the_top > the_element_pos - the_window_height + 70){
            $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').addClass('fixed');
          }
          else {
            $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');
          }

        });

      }

      $('.sticky-wrap').perfectScrollbar('update');

    });

  }

  function fn_fixed_scroll() {

    if($('.sticky-wrap').length){

      var the_top = $(document).scrollTop();
      var the_window_height = $(window).height();
      var the_element_pos = $('.js-fixed-scroll').find('.sticky-wrap').offset().top;
      var the_element_height = $('.js-fixed-scroll').find('.sticky-wrap').outerHeight();
      var the_element_stop = $('.js-fixed-scroll').find('.js-fixed-scroll-stop').offset().top;
      var the_stop_moment = 0;

      $('.js-btn-resize').click(function () {

        $('.sticky-wrap').perfectScrollbar('update');

      });

      $(window).scroll(function() {

        the_top = $(document).scrollTop();
        the_element_pos = $('.js-fixed-scroll').find('.sticky-wrap').offset().top;
        the_element_height = $('.js-fixed-scroll').find('.sticky-wrap').outerHeight();
        the_element_stop = $('.js-fixed-scroll').find('.js-fixed-scroll-stop').offset().top;
        the_stop_moment = the_element_stop - the_window_height;

        if (the_top > the_stop_moment) {
          $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');
          $('.sticky-wrap').perfectScrollbar('update');
        }
        else if (the_top > the_element_pos - the_window_height + 70){
          $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').addClass('fixed');
          $('.sticky-wrap').perfectScrollbar('update');
        }
        else {
          $('.js-fixed-scroll').find('.ps-scrollbar-x-rail').removeClass('fixed');
          $('.sticky-wrap').perfectScrollbar('update');
        }

      });

    }

  }

  function table_toggle() {

    $('.js-toggler-1').click(function () {

      $('.js-toggler-wrap-1').toggleClass('active');
      $('.js-toggled-1').toggleClass('active');

    });

    $('.js-toggler-2').click(function () {

      $('.js-toggler-wrap-2').toggleClass('active');
      $('.js-toggled-2').toggleClass('active');

    });

  }

  //

  setTimeout(sticky_table, 1000);
  setTimeout(fn_table_fix_column, 1000);
  setTimeout(fn_select_plugin, 1000);
  setTimeout(fn_multiple_select, 1000);
  //setTimeout(fn_fixed_scroll, 1100);
  setTimeout(table_toggle, 1100);

});

