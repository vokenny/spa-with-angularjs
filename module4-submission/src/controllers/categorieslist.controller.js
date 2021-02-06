(function () {

  'use strict';

  angular
    .module('MenuApp')
    .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['menuCategories'];
  function CategoriesListController(menuCategories) {
    const cats = this;

    cats.menuCats = menuCategories;
  }
})();