angular.module('app', ['ui.router', 'common', 'chart.js'])
  .constant('appSettings', {
    db: 'http://localhost:5984/expenses'
  }).config(function($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  });;
