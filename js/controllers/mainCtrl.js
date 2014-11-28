//main controller: receives data in and assigns it to a $scope holder
//config for pop-up second screen is also here, template linked here as well


angular.module('app')
	.controller('mainCtrl', ["$scope","journeyDataSvc", "ngDialog", function mainCtrl($scope,journeyDataSvc, ngDialog) {
      $scope.masterSchedule = journeyDataSvc.returnAllJourneys().then(function(resolveData) {
      $scope.masterSchedule = resolveData.data;
      })
      //remove everything after .then to here for unit tests to work (somewhat)
      
      // .then(function(resolveData) {
      // $scope.masterSchedule = resolveData.data;
      // })
      
      $scope.open = function (trip) {
         ngDialog.open({
          templateUrl: './views/detail-journey.html',
          className: 'ngdialog-theme-plain',
          overlay: false,
          data: trip,
          scope: $scope
          });
        }
      
      
    }])