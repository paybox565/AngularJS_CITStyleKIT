'use strict';

var $ = require('jquery');

require('jquery-ui/datepicker');
require('select2');

$(document).ready(function () {

  // Плагины

  function plugin() {

    $(".datepicker").datepicker();

    $(".select").select2({
      width: 'off'
    });

  }

  setTimeout(plugin, 500);

  $('.top-menu__wrap').click(function(){

    setTimeout(plugin, 500);

  });

  $('.js-btn-resize').click(function(){

    alert('hello');

    //$(this).closest('.js-container-resize').toggleClass('container--scroll');

  });

  // tables.fixed column

  var $reg_row = $('.js-table-row-fixed');

  $reg_row.each(function(){

    var $maxHeight = 0;

    $('.table__cell', this).each(function(){

      if ( $(this).height() > $maxHeight )
      {
        $maxHeight = $(this).height();
      }

    });

    $('.table__cell', this).height($maxHeight);

  });


  // Modal

  var $modal_cross = $('.js-modal-close'),
    $modal_window = $('.js-modal'),
    $modal_dump = $('.js-modal-dump');

  $modal_cross.click(function(){
    $modal_window.fadeOut();
    $modal_dump.fadeOut();
  });

  $modal_dump.click(function(){
    $modal_window.fadeOut();
    $modal_dump.fadeOut();
  });

  // droped menu

  $('.js-main-menu-trigger').click(function(){
    $('.js-main-menu__wrap').fadeIn();

    $('.js-main-menu-close').click(function(){
      $('.js-main-menu__wrap').fadeOut();
    });

  });

  // dropped search

  function popupSearch() {

    var $searchButton = $('.js-header__top-search-button'),
        $search = $('.js-header__top-search'),
        $searchItem = $('.js-header__top-item--search'),
        $searchHiddenElement = $('.js-header__top-search-hide'),
        $searchLogin = $('.js-header__top-item--login'),
        $searchLoginWidth = $searchLogin.width(),
        $searchItemMargin = 1,
        $searchBg = $('.js-header__top-search-bg');

    $searchButton.click(function(){

      $searchLoginWidth = $searchLogin.width();
      $searchItemMargin = $searchLoginWidth + 57;

      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $searchItem.removeClass('active');
        $search.removeClass('active');
        $searchHiddenElement.removeClass('active');
        $searchBg.fadeOut();
        $searchItem.css('margin-right','0px' );
      }
      else {
        $(this).addClass('active');
        $searchItem.addClass('active');
        $search.addClass('active');
        $searchHiddenElement.addClass('active');
        $searchBg.fadeIn();
        $searchItem.css('margin-right',$searchItemMargin + 'px' );
      }

    });

  }

  popupSearch();



  // Tabs

  var $portal_agency_tab = $('.js-portal-agency__tab'),
    $portal_agency_tab_content = $('.js-portal-agency__tab-content'),
    $portal_agency_tabs_ru = $('.js-portal-agency__tabs-ru'),
    $portal_agency_tabs_ar = $('.js-portal-agency__tabs-ar'),
    $portal_agency_tabs_by = $('.js-portal-agency__tabs-by'),
    $portal_agency_tabs_kz = $('.js-portal-agency__tabs-kz'),
    $portal_agency_tabs_kyr = $('.js-portal-agency__tabs-kyr'),
    $portal_agency_tabs_eu = $('.js-portal-agency__tabs-eu');

  $portal_agency_tab.click(function(){

    $portal_agency_tab.removeClass('active');
    $portal_agency_tab_content.removeClass('active');
    $(this).addClass('active');

    if($(this).hasClass('js-portal-agency__tab-ru')){
      $portal_agency_tabs_ru.addClass('active');
    }
    else if($(this).hasClass('js-portal-agency__tab-ar')){
      $portal_agency_tabs_ar.addClass('active');
    }
    else if($(this).hasClass('js-portal-agency__tab-by')){
      $portal_agency_tabs_by.addClass('active');
    }
    else if($(this).hasClass('js-portal-agency__tab-kz')){
      $portal_agency_tabs_kz.addClass('active');
    }
    else if($(this).hasClass('js-portal-agency__tab-kyr')){
      $portal_agency_tabs_kyr.addClass('active');
    }
    else if($(this).hasClass('js-portal-agency__tab-eu')){
      $portal_agency_tabs_eu.addClass('active');
    }

  });

  // Subscribe

  function footerSubscribe(){

    $('.js-subscribe-button').click(function(){

      $('.js-subscribe-modal').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-trigger-auth').click(function(){

      $('.js-modal-auth').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-review-button').click(function(){

      $('.js-modal-choice').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-choice-button').click(function(){

      $('.js-modal-choice').fadeOut();
      $('.js-review-modal').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-choice-button2').click(function(){

      $('.js-modal-choice').fadeOut();
      $('.js-review-modal2').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-success-button').click(function(){

      $('.js-review-modal').fadeOut();
      $('.js-review-modal2').fadeOut();
      $('.js-success-modal').fadeIn();
      $modal_dump.fadeIn();

    });

    $('.js-success-button2').click(function(){

      $('.js-review-modal2').fadeOut();
      $('.js-success-modal2').fadeIn();
      $modal_dump.fadeIn();

    });

  }

  footerSubscribe();

  // Examples

  $('.js-code-example__trigger').click(function () {

    $(this).next('.js-code-example__content').slideToggle(300);

  });

  // Help

  // var $help_trigger = $('.js-help-trigger'),
  //     $help_list = $('.js-help-list');

  $('.js-help-trigger').click(function(){
    $(this).toggleClass('active');
    $('.js-help-list').toggleClass('active');
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.js-help-wrap').length) return;
    $('.js-help-list').removeClass('active');
    $('.js-help-trigger').removeClass('active');
    event.stopPropagation();
  });

  // Dropdown list

  // var $drop_list_trigger = $('.js-drop_list_trigger'),
  //   $drop_list = $('.js-drop_list');

  $('.js-drop_list_trigger').click(function(){
    $(this).parent().find('.js-drop_list').toggle(300);
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.js-drop-list-wrap').length) return;
    $('.js-drop_list').hide(300);
    $('.js-drop_list_trigger').removeClass('active');
    event.stopPropagation();
  });

  // Authorization

  $('.js-header__login-current').click(function(){
    $('.js-header__logout').fadeToggle();
  });

  // dropdown list

  $('.js-header__popup-menu-trigger').click(function(){
    $('.js-header__popup-menu').toggleClass('active');
  });

  // tables

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

  function resize_btn() {

    $('.js-resize-btn').click(function () {

      $(this).toggleClass('active');
      $('.js-resize-container').toggleClass('container--scroll');

    });

  }

  table_toggle();
  resize_btn();

  $('.js-perfect-scroll').perfectScrollbar();

 // Theme page

  function registraionCheck() {

    var widgetItem = $('.js-portal__widget-item'),
        widgetButton = $('.js-portal__widget-item-detail'),
        widgetTitle_01 = $('.js-portal__widget-item-title-01'),
        widgetTitle_02 = $('.js-portal__widget-item-title-02'),
        widgetImage_01 = $('.js-portal__widget-item-image-01'),
        widgetImage_02 = $('.js-portal__widget-item-image-02');

    widgetButton.click(function(){

      if($(this).hasClass('active')){
        $(this).removeClass('active').html('Проверить ...');
        widgetTitle_02.hide();
        widgetTitle_01.show();
        widgetImage_02.hide();
        widgetImage_01.show();
        widgetItem.removeClass('active');
      }
      else{
        $(this).html('Скрыть').addClass('active');
        widgetTitle_01.hide();
        widgetTitle_02.show();
        widgetImage_01.hide();
        widgetImage_02.show();
        widgetItem.addClass('active');
      }

    });

  }

  registraionCheck();

});
