  
angular.module('app', ['ngDialog']);
	
	
angular.module('app')
	.controller('mainCtrl', ["$scope","journeyDataSvc", "ngDialog", function loadJsonData($scope,journeyDataSvc, ngDialog) {
    
      journeyDataSvc.returnAllJourneys().then(function(resolveData) {
      $scope.masterSchedule = resolveData.data;
      
      })
      
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
    
  .directive("basicJourney", function(){
			return {
				restrict: "E",
				templateUrl: "./views/basic-journey.html"
			}
		})
		
		
  .directive('passObject', ['ngDialog', function(ngDialog) {
    return {
        restrict: 'A',
        scope: { passedObject: '=' },
        template: "<div>This is the value passed in = {{passedObject.value}}!</div>"
    }
  }])
		
		
	.service("journeyDataSvc", ["$http", function journeyDataSvc($http){
		
		var masterJson = [];
    var location = "./data/";
    var file = ["journeys.json"];

    // files.forEach(function(file){
    //     addToDb(file);
    // });

    // function addToDb () {
    //     $http.get(location + file).then(function(response) {
    //     $scope.masterSchedule = response.data;
    //     alert($scope.masterSchedule);
    //       }
    //     );
    // }
    
    // this.returnAllJourneys = function returnAllJourneys () {
    //     $http.get(location + file).then(function(response) {
    //       masterJson = response.data;
    //       return masterJson.resolve;
    //         }
    //       );
    //       return masterJson.resolve;
    //   }
    
    return {
			returnAllJourneys: function () {
				return $http.get(location + file).success(function(data, status, headers, config){
					return data;
				});
			},
    }
      
		
		}]);

	
// var detailCtrl = function ($scope, fullScreenDetail, ndDialog, trips, trip) {

// $scope.trips = trips;
//   $scope.trip = trip;
//   $scope.selected = {
//     trip: $scope.trips[0]
//   };
//   console.log($scope);

// }


function main() {
}

$(document).ready(main);

