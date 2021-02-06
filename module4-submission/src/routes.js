(function () {

  'use strict'

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
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
  }

})();