(function () {
  "use strict";

  angular.module('public')
    .service('SignupService', SignupService);

  function SignupService() {
    const signup = this;

    var users = [];

    signup.register = function (user) {
      let newUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        faveitem: user.faveitem
      };

      try {
        users.unshift(newUser);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    signup.users = users;
  }

})();
