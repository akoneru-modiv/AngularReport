angular.module('common').factory('dataService', function($http, $window, appSettings) {
  var data = [];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  var config = {
    headers: {
      'Content-Type': 'application/json;'
    }
  }

  var daysInMonthYear = function(year, month){
    var days = [];
    var d = new Date(year, month+1, 0);
    for(var i = 1; i <= d.getDate(); i++ ){
      days[i] = i;
    }
    return days;
  }

  return {
    setData: function(dataObj) {
      return $http.post(appSettings.db, dataObj, config)
        .then(function(response) {
          return response.data;
        });
    },
    total: function(itemList) {
      var total = 0;
      angular.forEach(itemList, function(elem) {
        if (elem.amount) {
          total += parseFloat(elem.amount);
        }
      });
      return total;
    },
    months: function() {
      return MONTHS;
    },
    years: function(){
      return [2014, 2015, 2016, 2017, 2018];
    },
    days: function(year, month){
      return daysInMonthYear(year, month)
    },
    monthlyData: function(year) {
      var cd = [];
      angular.forEach(MONTHS, function(elem) {
        cd[elem] = {
          name: elem,
          amount: 0.0
        }
      });
      angular.forEach(data, function(elem) {
        if(elem.year === year){
          cd[elem.month].amount += parseFloat(elem.amount);
        }
      });
      return cd;
    },
    yearlyData: function(){
      var cd = [];
      angular.forEach(data, function(elem) {
        if(!cd[elem.year]){
          cd[elem.year] = {name: elem.year, amount: 0.0};
        }
        cd[elem.year].amount += parseFloat(elem.amount) ;
      });
      return cd;
    },
    dailyData: function(year, month){
      var cd = [];
      angular.forEach(daysInMonthYear(year, month), function(elem) {
        cd[elem] = {
          name: elem,
          amount: 0.0
        }
      });
      angular.forEach(data, function(elem) {
        if(elem.year === year && elem.month == MONTHS[month]){
          var d = new Date(elem.date);
          cd[d.getDate()].amount += parseFloat(elem.amount);
        }
      });
      return cd;
    },
    getItems: function() {
      return $http.get(appSettings.db + '/_all_docs?include_docs=true', config)
        .then(function(response) {
          data = [];
          angular.forEach(response.data.rows, function(elem) {
            data.push(elem.doc);
          });
          return data;
        });
    },
    removeItem: function(item) {
      var url = appSettings.db + '/' + item._id ;
      var params = {
        params: {
          rev: item._rev
        }
      };
      return $http.delete(url, params)
        .then(function(response) {
          return response.data;
        });
    }
  };
});
