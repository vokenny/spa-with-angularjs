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
        let menuItemPromise = MenuSearchService.getMatchedMenuItems($scope.query);

        menuItemPromise.then(function (filteredItems) {
          // 3. Expose filtered menu items on controller scope
          search.found = filteredItems;
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

    menu.getMatchedMenuItems = function (query) {
      // 1. Make network request to get all menu items
      return menu.getAllMenuItems()
        .then(function (response) {
          // 2. Filter and return all menu items that contain the query in the item description
          return response.data
            .menu_items
            .filter(item => item.description.indexOf(query) !== -1);
        })
    }

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
        remove: '&',
        noMatch: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() { }

}());