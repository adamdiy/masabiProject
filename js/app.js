  
angular.module('app', []);
	
	
angular.module('app')
	.controller('loadJsonData', ["$scope","journeyDataSvc", function loadJsonData($scope,journeyDataSvc) {
    
      journeyDataSvc.returnAllJourneys().then(function(resolveData) {
      $scope.masterSchedule = resolveData.data;
      //alert(JSON.stringify($scope.masterSchedule));
      })
      // alert($scope.masterSchedule);

    }])
    
  .directive("basicJourney", function(){
			return {
				restrict: "E",
				templateUrl: "./views/basic-journey.html"
			}
		})
		
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
				// 	$scope.todos = data;
					//console.log($scope.todos);
					alert(data);
					return data;
				});
				//alert(typeof data);
				//return data;
			},
    }
      
		
		}]);

	

function main() {
}

$(document).ready(main);

