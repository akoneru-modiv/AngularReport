angular.module('common').factory('dataService', function($http, $window, appSettings) {
  var data = {};
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  console.log(appSettings);
  var copyData = function(dataObj){
    var cd = [];
    angular.forEach(MONTHS, function(elem){
      cd[elem] = monthsData[elem];
    });
    return cd;
  }

  var config = {
               headers : {
                   'Content-Type': 'application/json;'
               }
           }

  return {
    setData: function(dataObj) {
      if (window.localStorage && dataObj) {
        //Local Storage to add Data
        localStorage.setItem("accounts", angular.toJson(dataObj));
      }
      data = dataObj;
      angular.forEach(data, function(elem){
        $http.post(appSettings.db, elem, config)
              .success(function (data, status, headers, config) {
                  console.log(data);
              })
              .error(function (data, status, header, config) {
                  console.log(data);
              });
      })


    },
    getData: function() {
      //Get data from Local Storage
      data = angular.fromJson(localStorage.getItem("accounts"));

      return data ? data : [];
    },
    total: function(){
      var total = 0;
      angular.forEach(data, function(elem){
        if(elem.amount){
          total += parseFloat(elem.amount);
        }
      });
      return total;
    },
    months: function(){
      return MONTHS;
    },
    monthlyData: function(){
      var cd = [];
      angular.forEach(MONTHS, function(elem){
        cd[elem] = {
          name: elem,
          amount: 0.0
        }
      });
      angular.forEach(data, function(elem){
        cd[elem.month].amount = parseFloat(elem.amount) + parseFloat(cd[elem.month].amount);
        cd[elem.month].name = elem.month;
        cd[elem.month].date = elem.date;
      });
      return cd;
    },
    getItems: function(){
      return $http.get(appSettings.db+'/_all_docs?include_docs=true', config)
        .then(function (response) {
         return response.data.rows;
       });

    }
  };
});
