/**
 * Created by ovygovskiy on 18.08.2016.
 */
'use strict';

angular.module('sgApp').controller('FormsElementsController', function ($scope, $templateCache) {
  $scope.elements = [
    {
      name: 'Search ',
      templateUrl: 'views/code_examples/forms_search.html'
    },
    {
      name: 'Search combined ',
      templateUrl: 'views/code_examples/forms_search_split.html'
    },
    {
      name: 'Search v2',
      templateUrl: 'views/code_examples/forms_search_full.html'
    },
    {
      name: 'Search combined v2',
      templateUrl: 'views/code_examples/forms_search_full_split.html'
    },
    {
      name: 'Radio',
      templateUrl: 'views/code_examples/forms_radio.html'
    },
    {
      name: 'Checkbox',
      templateUrl: 'views/code_examples/forms_checkbox_switch.html'
    },
    {
      name: 'Checkbox v2',
      templateUrl: 'views/code_examples/forms_checkbox.html'
    },
    {
      name: 'buttons',
      templateUrl: 'views/code_examples/forms_buttons-sample.html'
    },
    {
      name: 'icon buttons',
      templateUrl: 'views/code_examples/forms_national.html'
    },
    {
      name: 'icon buttons v2',
      templateUrl: 'views/code_examples/forms_national_multi.html'
    },
    {
      name: 'button group',
      templateUrl: 'views/code_examples/forms_button_group.html'
    },
    {
      name: 'button group',
      templateUrl: 'views/code_examples/forms_button_group_multi.html'
    },
    {
      name: 'select and datepicker',
      templateUrl: 'views/code_examples/forms_select_dates.html'
    },
    {
      name: 'fields sizes',
      templateUrl: 'views/code_examples/forms_field_types.html'
    },
    {
      name: 'Validation',
      templateUrl: 'views/code_examples/forms_validation_type1.html'
    },
    {
      name: 'validation 3/4',
      templateUrl: 'views/code_examples/forms_validation_type2.html'
    },
    {
      name: 'validation 1/2',
      templateUrl: 'views/code_examples/forms_validation_type3.html'
    },
    {
      name: 'accordion',
      templateUrl: 'views/code_examples/forms_accordion_simple.html'
    },
    {
      name: 'accordion',
      templateUrl: 'views/code_examples/forms_accordion.html'
    },
    {
      name: 'request list',
      templateUrl: 'views/code_examples/forms_bid-list.html'
    }

  ];

  $scope.template = function (templateUrl) {
    return $templateCache.get(templateUrl);
  };
});
