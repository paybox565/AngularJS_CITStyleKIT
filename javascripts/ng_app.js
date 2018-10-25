'use strict';

var angular = require('angular');
require('ui-router-extras/release/modular/ct-ui-router-extras.core.min');
require('ui-router-extras/release/modular/ct-ui-router-extras.dsr.min');

global.jQuery = require('jquery');
var $ = global.jQuery;

var sgApp = angular.module('sgApp', [require('angular-ui-router'), 'ct.ui.router.extras.dsr']);

sgApp.config(function($stateProvider, $urlRouterProvider) {

  var mainPageData = {
    menuItems: [{
      title: 'Последние измененя',
      state: 'home.news'
    }, {
      title: 'Как подключить',
      state: 'home.faq'
    }]
  };

  var formsData = {
    menuItems: [{
      title: 'Элементы',
      state: 'forms.elements'
    }, {
      title: 'Примеры',
      state: 'forms.examples'
    }]
  };

  var typographyData = {
    menuItems: [{
      title: 'Элементы',
      state: 'typography.elements'
    }]
  };

  var pageExamplesData = {
    menuItems: [{
      title: 'ОП 44',
      state: 'page_examples.op44'
    }, {
      title: 'ОП 46',
      state: 'page_examples.op46'
    }]
  };

  var pageStandard = {
    menuItems: [
      {
        title: 'Общие процессы',
        state: 'page_standard.common_process'
      },
      {
        title: 'Тематические страницы',
        state: 'page_standard.common_theme'
      }
    ]
  };

  var defaultViewContainer = '<ui-view />';

  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('home', {
      url: '/',
      template: defaultViewContainer,
      deepStateRedirect: {
        default: 'home.news',
        fn: function ($dsr$) {
          return {
            state: 'home.news'
          }
        }
      }
    })
    .state('home.news', {
      url: '/news',
      templateUrl: 'views/sg_home.html',
      data: mainPageData
    })
    .state('home.faq', {
      url: '/faq',
      templateUrl: 'views/sg_home_faq.html',
      data: mainPageData
    })

    .state('forms', {
      url: '/forms',
      template: defaultViewContainer,
      deepStateRedirect: {
        default: 'forms.elements',
        fn: function ($dsr$) {
          return {
            state: 'forms.elements'
          }
        }
      }
    })
    .state('forms.examples', {
      url: '/examples',
      templateUrl: 'views/sg_forms_examples.html',
      data: formsData
    })
    .state('forms.elements', {
      url: '/elements',
      templateUrl: 'views/sg_forms_elements.html',
      data: formsData,
      controller: 'FormsElementsController'
    })

    .state('tables', {
      url: '/tables',
      templateUrl: 'views/sg_tables.html',
      controller: 'TablesController'
    })

    .state('cards', {
      url: '/cards',
      templateUrl: 'views/sg_cards.html',
      controller: 'CardsController'
    })

    .state('page_examples', {
      url: '/forms',
      template: defaultViewContainer,
      deepStateRedirect: {
        default: 'page_examples.op44',
        fn: function ($dsr$) {
          return {
            state: 'page_examples.op44'
          }
        }
      }
    })
    .state('page_examples.op44', {
      url: '/op44',
      templateUrl: 'views/sg_page_examples_op44.html',
      data: pageExamplesData
    })
    .state('page_examples.op46', {
      url: '/op46',
      templateUrl: 'views/sg_page_examples_op46.html',
      data: pageExamplesData
    })

    .state('typography', {
      url: '/typography',
      template: defaultViewContainer,
      deepStateRedirect: {
        default: 'typography.elements',
        fn: function ($dsr$) {
          return {
            state: 'typography.elements'
          }
        }
      }
    })
    .state('typography.elements', {
      url: '/elements',
      templateUrl: 'views/sg_typography_elements.html',
      data: typographyData
    })

    .state('top_menus', {
      url: '/top_menus',
      templateUrl: 'views/sg_top_menus.html'
    })

    .state('page_standard', {
      url: '/page_standard',
      template: defaultViewContainer,
      deepStateRedirect: {
        default: 'page_standard.common_process',
        fn: function ($dsr$) {
          return {
            state: 'page_standard.common_process'
          }
        }
      }
    })
    .state('page_standard.common_process', {
      url: '/common_process',
      templateUrl: 'views/page_standard/common_process.html',
      data: pageStandard
    })
    .state('page_standard.common_theme', {
      url: '/common_theme',
      templateUrl: 'views/page_standard/common_theme.html',
      data: pageStandard
    });


});

sgApp.controller('top_menu_items_Ctrl',function ($rootScope, $scope) {

  $scope.items = [

    {
      title: 'Формы',
      template: 'forms'
    },
    {
      title: 'Таблицы',
      template: 'tables'
    },
    {
      title: 'Карточки',
      template: 'cards'
    },
    {
      title: 'Варианты верхнего меню',
      template: 'top_menus'
    },
    {
      title: 'Типовые страницы',
      template: 'page_standard'
    }
  ];

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.stateData = toState.data;
  });
});

require('./controllers');
