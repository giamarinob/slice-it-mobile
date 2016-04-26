angular.module('starter.controllers', [])

.controller('restaurantsCtrl', function($scope, Merchant, Seating) {
  Merchant.query().$promise.then(function(response){
    console.log(response);
    $scope.merchants = response;
  });
    $scope.id = parseInt(window.localStorage['userID'])
    $scope.hello = function(merchant){return merchant.checked_in.includes($scope.id)}
    $scope.selectMerchant = function(merchant) {
      Seating.save({merchant_id: merchant.id, customer_id: window.localStorage['userID']});
      location.reload()
    };
})

.controller('BillCtrl', function($scope, $stateParams, Bill, PayUp, AssignItem) {
  $scope.data = {tip: 18}
  $scope.bill = Bill.get($stateParams);
  $scope.bills = Bill.query({user_id: window.localStorage['userID']});
  $scope.payup = function(billID){
    PayUp.update({user_id: window.localStorage['userID'], bill_id: billID, amount: 5,id:1})
    location.reload();
    $scope.assign = function(orderID, transactionID){alert(orderID,transactionID)}
  };
  $scope.deleteTrans = function(billId, transId){
    PayUp.delete({bill_id: billId, id:transId})
    location.reload();
  }
})

.controller('ListCtrl', function($scope){
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
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
        // window.localStorage['userName'] = data.username;
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

.controller('newUserCtrl', function($scope, User, $location, $ionicPopup, $http) {
  $scope.stripeCallback = function(status, response){
    if (response.error) {
      console.log("I errored");
      // still need bad card error handling
    } else {
      // Create new user resource instance and pass through a post request token and create user details
      console.log(response);

      this.data.stripe_customer_id = {email: this.data.email, token: response.id}

      var new_user = new User({customer: this.data});
      console.log(this.data)
      new_user.$save( function(data){
                      console.log(data);
                      window.localStorage['userID'] = data.id;
                      window.localStorage['first_name'] = data.first_name;
                      window.localStorage['last_name'] = data.last_name;
                      // window.localStorage['userName'] = data.username;
                      window.localStorage['userEmail'] = data.email;
                      $location.path('/app/restaurants');

                    },function(err){
                      // fix this ***
                      console.log("My error is" + err);
                      var error = err["data"]["error"] || err.data.join('. ');
                      var confirmPopup = $ionicPopup.alert({
                      title: 'An error occured',
                      template: error
                      });
                    }
                  );
    } // end of if else
  };

}) // End of NewUser Controller

.controller('PopupCtrl',function($scope, $ionicPopup, AddTransaction, AssignItem) {
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
             AddTransaction.save({email: $scope.data.email,bill_id: billID})
             location.reload();
           }
         }
       },
     ]
   });
  };

  $scope.transactionsPopup = function(orderID,item_description,transaction_Array) {
   $scope.data = {transactions: transaction_Array}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<ion-radio ng-repeat="transaction in data.transactions" ng-model="data.choice" ng-value="transaction[2]">{{transaction[0]}}</ion-radio>',
     title: "Assign "+item_description,
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Assign</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.choice) {
             e.preventDefault();
           } else {
            console.log($scope.data.choice)
             AssignItem.update({transaction_id: $scope.data.choice, id: orderID})
             location.reload();
           }
         }
       },
     ]
   });
  };

});
