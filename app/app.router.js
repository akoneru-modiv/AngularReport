angular.module('app').config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
      /*.state('home', {
        url: '/home',
        templateUrl: 'app/home/home.tpl.html',
        controller: 'HomeController'
      })*/
      .state('home', {
        url:'/home',
        views: {
          '': {templateUrl: 'app/home/home.tpl.html'
        },
          'inputbar@home':{
            templateUrl: 'app/home/home.inputbar.tpl.html'
          }
        }
      })
      .state('home.month', {
        url: '/month',
        templateUrl: 'app/chart/homeMonth.tpl.html'
      })
      .state('home.days', {
        url: '/days:month',
        template: '<pre> This is Showing days graph of {{month}}</pre>'
      })
      .state('about', {
        url: '/about',
        template: '<pre> This is About Page</pre>',
        controller: function($scope){

        }
      })
      .state('contact', {
        url: '/contact',
        template: '<div> This is Contact US Page</div>',
        controller: function($scope){

        }
      })
});
