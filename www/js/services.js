angular.module('starter.services', [])

.factory('Merchant', function($resource){
  return $resource("http://localhost:3000/merchants/:id.json")
})

.factory('Seating', function($resource){
  return $resource("http://localhost:3000/merchants/:merchant_id/seatings/:id.json", {id: "@id", merchant_id: "@merchant_id"})
})

.factory('Bill', function($resource){
  return $resource("http://localhost:3000/bills/:id.json")
})

.factory('UserSession', function($resource){
  return $resource("http://localhost:3000/customers/sign_in.json");
})

.factory('User', function($resource){
  return $resource("http://localhost:3000/customers.json");
})

.service('BlankService', [function(){

}]);
