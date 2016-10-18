angular.module('app').component('total', {
  template: '<span>Total ({{$ctrl.model | currency}})</span>',
  controller: function(){
  },
  bindings: {
    model: "="
  }
});
