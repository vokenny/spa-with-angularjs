(function () {

  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.menu = '';
    $scope.review = '';

    $scope.evalFood = function () {
      let foodArr = normalizeInput($scope.menu);

      switch (true) {
        case (foodArr.length > 3):
          $scope.review = 'Too much!';
          break;
        case (foodArr.length > 0 && foodArr.length <= 3):
          $scope.review = 'Enjoy!';
          break;
        default:
          $scope.review = 'Please enter data first';
      }
    }
  }

  function normalizeInput(input) {
    return input.trim().split(',').filter(Boolean);
  }

})();