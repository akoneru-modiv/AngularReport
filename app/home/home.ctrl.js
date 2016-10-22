angular.module('app').controller('HomeController', function(dataService, $scope, $state) {
  var ctrl = this;
  ctrl.account = {};
  //chart data
  var monthsData = ctrl.monthsData = [];
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
    console.log(ctrl.accountList);
  });

  var updateChart = function(xLables, chartData) {
    ctrl.data = [];
    ctrl.labels = [];
    console.log(chartData);
    angular.forEach(xLables, function(elem) {
      if(chartData[elem]){
        ctrl.labels.push(chartData[elem].name);
        ctrl.data.push(chartData[elem].amount);
      }
    });
  }

  ctrl.onClick = function(points, evt) {
    var label = points[0]._model.label;
    if(label && isNaN(label)){
      ctrl.selectedMonth = dataService.months().indexOf(label);
      console.log(ctrl.selectedYear+"/"+ ctrl.selectedMonth);
      updateChart(dataService.days(ctrl.selectedYear, ctrl.selectedMonth), dataService.dailyData(ctrl.selectedYear, ctrl.selectedMonth));
      $state.go('home.day');
    }else{
      ctrl.selectedYear = Number(label);
      updateChart(dataService.months(), dataService.monthlyData(ctrl.selectedYear));
    }
    /*var m = dataService.months().indexOf(label);
    var daysData = [];
    var numDaysInMonth = 0;
    angular.forEach(ctrl.accountList, function(elem){
      console.log(elem.month + " : " + month);
      if(elem.month === month){
        var d = new Date(elem.date);
        var y = d.getFullYear();
        if(numDaysInMonth === 0)
          numDaysInMonth = dataService.daysInMonth(m ,y);
        if(!daysData[d.getDate()]){
          daysData[d.getDate()] = 0.0;
        }
        daysData[d.getDate()] += parseFloat(elem.amount);
      }
    });
    console.log(daysData);*/
  };

  $scope.$watch('ctrl.accountList.length', function() {
    console.log('watch');
    ctrl.getTotal = dataService.total(ctrl.accountList);
    $state.go('home.month');
    updateChart(dataService.years(), dataService.yearlyData());
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
