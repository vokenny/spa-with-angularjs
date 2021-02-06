(function () {

  'use strict';

  angular
    .module('MenuApp')
    .controller('CategoryItemsController', CategoryItemsController);

  CategoryItemsController.$inject = ['items'];
  function CategoryItemsController(items) {
    const catItems = this;

    catItems.category = items.category.name;
    catItems.items = items.menu_items;
  }

})();