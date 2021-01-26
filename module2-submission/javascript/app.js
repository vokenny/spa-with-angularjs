(function () {

  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    const buyList = this;

    buyList.showItems = ShoppingListCheckOffService.getToBuyItems();

    buyList.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    const boughtList = this;

    boughtList.showItems = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    const service = this;

    var toBuyItems = [
      {
        "name": "Biscuits",
        "quantity": "20"
      },
      {
        "name": "Chocolates",
        "quantity": "10"
      },
      {
        "name": "Oranges",
        "quantity": "6"
      },
      {
        "name": "Mangos",
        "quantity": "2"
      },
      {
        "name": "Wine bottles",
        "quantity": "2"
      },
      {
        "name": "Water bottles",
        "quantity": "8"
      }
    ];

    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    }

    service.getBoughtItems = function () {
      return boughtItems;
    }

    service.buyItem = function (idx) {
      let item = service.getToBuyItems()[idx];

      service.getToBuyItems().splice(idx, 1);
      boughtItems.push(item);
    }
  }

})();