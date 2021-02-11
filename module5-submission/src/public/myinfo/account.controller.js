(function () {

  'use strict';

  angular.module('public')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['users']
  function AccountController(users) {
    const account = this;

    account.users = users;
  }
})();