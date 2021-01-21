(function () {

  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.menu = '';
    $scope.review = '';
    $scope.textboxStyle = {};
    $scope.reviewStyle = {};

    var hasInput = false;

    $scope.evalFood = function () {
      let foodArr = normalizeInput($scope.menu);

      switch (true) {
        case (foodArr.length > 3):
          hasInput = true;
          $scope.review = 'Too much!';
          break;
        case (foodArr.length > 0 && foodArr.length <= 3):
          hasInput = true;
          $scope.review = 'Enjoy!';
          break;
        default:
          hasInput = false;
          $scope.review = 'Please enter data first';
      }
    }

    function normalizeInput(input) {
      return input
        .trim()
        .split(',')
        .filter(Boolean)
        .filter(function (el) { return el.trim() != '' });
    }

    $scope.updateTextboxStyle = function () {
      hasInput ? $scope.textboxStyle = { "border-color": "#00FF00" } : $scope.textboxStyle = { "border-color": "#FF0000" }
    }

    $scope.updateReviewStyle = function () {
      hasInput ? $scope.reviewStyle = { "color": "#00FF00" } : $scope.reviewStyle = { "color": "#FF0000" }
    }
  }
})();