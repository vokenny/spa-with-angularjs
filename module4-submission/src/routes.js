(function () {

  'use strict'

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    //  If URL cannot match, default to 
    $urlRouterProvider.otherwise('/');

    $stateProvider
      // Home state
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.html'
      })

      // List of Categories state
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categories.html',
        controller: 'CategoriesListController as categoriesList',
        resolve: {
          menuCategories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Category Items state
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/templates/items.html',
        controller: 'CategoryItemsController as categoryItems',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }

})();