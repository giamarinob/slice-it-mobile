angular.module('starter.services', [])

.factory('Merchant', function($resource){
  return $resource("http://localhost:3000/merchants/:id.json")
})

.service('BlankService', [function(){

}]);
