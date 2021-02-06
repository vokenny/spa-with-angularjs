(function () {

  'use strict';

  angular
    .module('Data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'baseUrl'];
  function MenuDataService($http, baseUrl) {
    const menu = this;

    menu.getAllCategories = function () {
      return $http({
        method: 'GET',
        url: `${baseUrl}/categories.json`
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
    };

    menu.getItemsForCategory = function (catShortName) {
      return $http({
        method: 'GET',
        url: `${baseUrl}/menu_items.json?category=${catShortName}`
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
    };
  }

})();