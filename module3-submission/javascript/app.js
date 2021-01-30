(function () {

  'use strict'

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('baseUrl', 'https://davids-restaurant.herokuapp.com');

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService']
  function NarrowItDownController($scope, MenuSearchService) {
    const search = this;

    search.noMatchFound = false;

    search.find = function () {
      if (!$scope.query) {
        search.found = [];
        search.noMatchFound = true;
      } else {
        // 1. Make network request to get all menu items
        let menuItemPromise = MenuSearchService.getAllMenuItems();

        // 2. Wait for Promise to complete
        menuItemPromise.then(function (response) {
          // 3. Set filtered menu items containing search query in item description to search.found
          search.found = response.data
            .menu_items
            .filter(item => item.description.indexOf($scope.query) !== -1);

          search.noMatchFound = search.found.length === 0;
        }).catch(function (error) {
          console.log(error);
        });
      }
    }

    search.removeItem = function (idx) {
      search.found.splice(idx, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'baseUrl']
  function MenuSearchService($http, baseUrl) {
    const menu = this;

    menu.getAllMenuItems = function () {
      return $http({
        method: "GET",
        url: `${baseUrl}/menu_items.json`
      });
    }
  }

  function FoundItemsDirective() {
    const ddo = {
      templateUrl: './views/foundItems.html',
      scope: {
        filteredItems: '<',
        remove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() { }
}());