(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger', '$http'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, $http) {
    var vm = this;
    vm.$http = $http;
    vm.getData = [];
    vm.customerno = '';
    vm.ErrorMsg = '';
    vm.news = {
      title: 'TRA Dashboard',
      //description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    vm.getCustomerMembers = getCustomerMembers;

    activate();

    function activate() {
      var promises = [getMessageCount(), getPeople(), getCustomerMembers()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getCustomerMembers() {
      var data = vm.customerno;
      if (vm.customerno !== '') {
        return $http.post('http://13.84.157.140:9000/api/memberprofiles', {
          customerno: data
        }).then(response => {
          vm.getData = response.data[0];
          console.log(vm.getData);
          return vm.getData;
        });
      }
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }
  }
})();
