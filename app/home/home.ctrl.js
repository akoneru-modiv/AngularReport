angular.module('app').controller('HomeController', function(dataService, $scope, $state) {
  var ctrl = this;
  ctrl.accountList =[];
  ctrl.account = {};
  //chart data
  var monthsData = ctrl.monthsData = [];
  ctrl.series = ['Series A'];
  ctrl.chartDataType = 'month';
  ctrl.test = [];
  dataService.getItems().then(function(d){
    ctrl.test = d;
  });

  var updateChart = function() {
    ctrl.monthsData = dataService.monthlyData();
    ctrl.data = [];
    ctrl.labels = [];
    angular.forEach(dataService.months(), function(elem) {
      ctrl.labels.push(ctrl.monthsData[elem].name);
      ctrl.data.push(ctrl.monthsData[elem].amount);
    });
  }

  ctrl.onClick = function (points, evt) {
   console.log(points, evt);
   var month = points[0]._model.label;
   $state.go('home.days', {month: month});
 console.log(month);
 };

  $scope.$watch('ctrl.accountList.length', function(){
    ctrl.getTotal = dataService.total();
    $state.go('home.month');
    updateChart();
  });

  ctrl.sortType = "name";
  ctrl.sortReverse = false;
  var account = ctrl.accountList = dataService.getData();
  ctrl.getTotal = dataService.total();


  ctrl.collectData = function() {
    if (ctrl.account.name && ctrl.account.amount) {
      ctrl.account.date = new Date();
      ctrl.account.month = dataService.months()[ctrl.account.date.getMonth()];
      ctrl.accountList.push(ctrl.account);
      dataService.setData(ctrl.accountList);
      ctrl.account = {};
    }
  }

  ctrl.remove = function(acct) {
      ctrl.accountList.splice(ctrl.accountList.indexOf(acct) , 1);
  }

});
