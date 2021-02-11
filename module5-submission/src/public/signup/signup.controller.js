(function () {

  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['menuItems', 'SignupService']
  function SignUpController(menuItems, SignupService) {
    const signup = this;

    signup.newUserIsSaved = false;

    signup.menuItems = menuItems.menu_items;

    signup.findItem = function (shortName) {
      let matchedItem = signup.menuItems.find((item) => item.short_name === shortName);

      return matchedItem ? true : false;
    }

    signup.submit = function (user) {
      signup.newUserIsSaved = false;
      signup.newUserIsSaved = SignupService.register(user);
    }
  }
})();