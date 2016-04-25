angular.module('starter.controllers', [])

.controller('restaurantsCtrl', function($scope, Merchant, Seating) {
  Merchant.query().$promise.then(function(response){
    $scope.merchants = response;
  });
    $scope.selectMerchant = function(merchant) {
      Seating.save({merchant_id: merchant.id})
    };
})

.controller('BillCtrl', function($scope, $stateParams, Bill, PayUp) {
  $scope.bill = Bill.get($stateParams);
  $scope.bills = Bill.query();
  $scope.payup = function(billID){
    PayUp.update({user_id: 1, bill_id: billID, amount: 5,id:1})
    location.reload();
  };
})

.controller('oneRestCtrl', function($scope, Merchant) {
  Merchant.get({id: 3}).$promise.then(function(response){
    $scope.selectedMerchant = response;
  });
})

// .controller('checkInCtrl', function($scope, Seating) {
//   $scope.click = function() {
//     var selected_seating = new Seating({merchant: })


//   }
// })

  // With the new view caching in Ionic, Controllers are only called
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('loginCtrl', function($scope, $stateParams, UserSession, $location, $ionicPopup, $rootScope) {
  $scope.data = {};

  $scope.login = function(){
    var user_session = new UserSession({customer: $scope.data});
    user_session.$save(
      function(data){
        console.log(data);
        window.localStorage['userID'] = data.id;
        window.localStorage['first_name'] = data.first_name;
        window.localStorage['last_name'] = data.last_name;
        window.localStorage['userName'] = data.username;
        window.localStorage['userEmail'] = data.email;
        $location.path('/app/restaurants');
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occured',
          template: error
        });
      }
    );
  };
})
.controller('newUserCtrl', function($scope, User) {
    // Complete register controller
    // var new_user = new User({customer: $scope.data });
  })

.controller('PopupCtrl',function($scope, $ionicPopup, AddTransaction) {
  $scope.showPopup = function(billID) {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="data.email">',
     title: "Enter your friend's email",
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Add user</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.email) {
             e.preventDefault();
           } else {
             AddTransaction.save({username: $scope.data.email,bill_id: billID})
             location.reload();
           }
         }
       },
     ]
   });
  };

});
