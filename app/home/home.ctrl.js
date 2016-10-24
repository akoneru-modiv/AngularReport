angular.module('app').controller('HomeController', function(dataService, $scope, $state) {
  var ctrl = this;
  ctrl.account = {};
  //chart data
  ctrl.series = ['Series A'];
  ctrl.chartDataType = 'month';
  ctrl.sortType = "name";
  ctrl.sortReverse = false;
  var account = ctrl.accountList = [];
  ctrl.getTotal = 0.0;
  ctrl.selectedYear = 0;
  ctrl.selectedMonth = 0;
  dataService.getItems().then(function(response) {
    ctrl.accountList = response;
  });

  var updateChart = function(xLables, chartData) {
    ctrl.data = [];
    ctrl.labels = [];
    angular.forEach(xLables, function(elem) {
      if(chartData[elem]){
        ctrl.labels.push(chartData[elem].name);
        ctrl.data.push(chartData[elem].amount);
      }
    });
  }

  ctrl.onClick = function(points, evt) {
    var label = points[0]._model.label;
    if(dataService.months().indexOf(label) > 0){
      ctrl.selectedMonth = dataService.months().indexOf(label);
    }else if(dataService.years().indexOf(label) > 0){
      ctrl.selectedYear = Number(label);
    }
    $scope.$apply()
  };

  $scope.$watch('ctrl.accountList.length', function() {
    ctrl.getTotal = dataService.total(ctrl.accountList);
    updateChart(dataService.years(), dataService.yearlyData());
  });

  $scope.$watch('ctrl.selectedYear', function(){
    updateChart(dataService.months(), dataService.monthlyData(ctrl.selectedYear));
  });

  $scope.$watch('ctrl.selectedMonth', function(){
    updateChart(dataService.days(ctrl.selectedYear, ctrl.selectedMonth), dataService.dailyData(ctrl.selectedYear, ctrl.selectedMonth));
  });


  ctrl.collectData = function() {
    if (ctrl.account.name && ctrl.account.amount) {
      ctrl.account.date = new Date();
      ctrl.account.month = dataService.months()[ctrl.account.date.getMonth()];
      ctrl.account.year = ctrl.account.date.getFullYear();
      dataService.setData(ctrl.account)
        .then(function(response) {
          ctrl.account._id = response.id;
          ctrl.account._rev = response.rev;
          ctrl.accountList.push(ctrl.account);
          ctrl.account = {};
        });
    }
  }

  ctrl.remove = function(acct) {
    dataService.removeItem(acct)
      .then(function(response) {
        console.log(response);
        ctrl.accountList.splice(ctrl.accountList.indexOf(acct), 1);
      })
  }

});
