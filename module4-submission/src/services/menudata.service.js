(function () {

  'use strict';

  angular
    .module('data')
    .constant('baseUrl', 'https://davids-restaurant.herokuapp.com')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'baseUrl']
  function MenuDataService($http, baseUrl) {
    const menu = this;

    menu.getAllCategories = function () {
      return $http({
        method: 'GET',
        url: `${baseUrl}/categories.json`
      }).then(function (response) {
        return response.data
      }).catch(function (error) {
        console.log(error)
      });
    }
  }

})();