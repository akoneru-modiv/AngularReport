angular.module('app').controller('ChartController', function(dataService, $scope) {
  var ctrl = this;
  var monthsData = ctrl.monthsData = [];

  ctrl.getTotal = function() {
    return dataService.total();
  }

  ctrl.labels = [];
  ctrl.series = ['Series A'];
  ctrl.data = [];

  var updateChart = function() {
    ctrl.monthsData = dataService.monthlyData();
    angular.forEach(dataService.months(), function(elem) {
      ctrl.labels.push(ctrl.monthsData[elem].name);
      ctrl.data.push(ctrl.monthsData[elem].amount);
    });
  }
  updateChart();
});
