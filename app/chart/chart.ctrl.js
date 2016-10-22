angular.module('app').controller('DayController', function(dataService, $scope, $state) {
  var ctrl = this;
  var monthsData = ctrl.monthsData = [];

  ctrl.getTotal = function() {
    return dataService.total();
  }

  ctrl.labels = [];
  ctrl.series = ['Series A'];
  ctrl.data = [];
  var updateChart = function() {
    
  }
  updateChart();
});
