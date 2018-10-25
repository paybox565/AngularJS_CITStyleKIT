/**
 * Created by ovygovskiy on 18.08.2016.
 */
'use strict';

angular.module('sgApp').controller('FormsElementsController', function ($scope, $templateCache) {
  $scope.elements = [
    {
      name: 'Поиск (свернутый)',
      templateUrl: 'views/code_examples/forms_search.html'
    },
    {
      name: 'Поиск совмещённый (свернутый)',
      templateUrl: 'views/code_examples/forms_search_split.html'
    },
    {
      name: 'Поиск (развернутый)',
      templateUrl: 'views/code_examples/forms_search_full.html'
    },
    {
      name: 'Поиск совмещённый (развернутый)',
      templateUrl: 'views/code_examples/forms_search_full_split.html'
    },
    {
      name: 'Радио баттоны',
      templateUrl: 'views/code_examples/forms_radio.html'
    },
    {
      name: 'Чекбоксы (переключатели)',
      templateUrl: 'views/code_examples/forms_checkbox_switch.html'
    },
    {
      name: 'Чекбоксы',
      templateUrl: 'views/code_examples/forms_checkbox.html'
    },
    {
      name: 'Кнопки',
      templateUrl: 'views/code_examples/forms_buttons-sample.html'
    },
    {
      name: 'Кнопки с иконкой',
      templateUrl: 'views/code_examples/forms_national.html'
    },
    {
      name: 'Кнопки с иконкой (мультивыбор)',
      templateUrl: 'views/code_examples/forms_national_multi.html'
    },
    {
      name: 'Группы кнопок',
      templateUrl: 'views/code_examples/forms_button_group.html'
    },
    {
      name: 'Группы кнопок (мультивыбор)',
      templateUrl: 'views/code_examples/forms_button_group_multi.html'
    },
    {
      name: 'Поля с select и datepicker',
      templateUrl: 'views/code_examples/forms_select_dates.html'
    },
    {
      name: 'Размеры полей',
      templateUrl: 'views/code_examples/forms_field_types.html'
    },
    {
      name: 'Валидация',
      templateUrl: 'views/code_examples/forms_validation_type1.html'
    },
    {
      name: 'Валидация расположение 3/4',
      templateUrl: 'views/code_examples/forms_validation_type2.html'
    },
    {
      name: 'Валидация расположение 1/2',
      templateUrl: 'views/code_examples/forms_validation_type3.html'
    },
    {
      name: 'Аккордеон',
      templateUrl: 'views/code_examples/forms_accordion_simple.html'
    },
    {
      name: 'Аккордеон',
      templateUrl: 'views/code_examples/forms_accordion.html'
    },
    {
      name: 'Список заявок',
      templateUrl: 'views/code_examples/forms_bid-list.html'
    }

  ];

  $scope.template = function (templateUrl) {
    return $templateCache.get(templateUrl);
  };
});
