angular.module('app', ['ui.router', 'common', 'chart.js'])
  .constant('appSettings', {
    db: 'http://localhost:5984/expenses'
  });;
