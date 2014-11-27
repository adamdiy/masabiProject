  
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
    
    function addDuration (record) {
          
          var timeDepart = record.startTime.split(":");
          var timeArrive = record.arrivalTime.split(":");
          
          for(var i=0; i<timeDepart.length; i++) { timeDepart[i] = +timeDepart[i]; }
          for(i=0; i<timeArrive.length; i++) { timeArrive[i] = +timeArrive[i]; }
          
          if (!record.startTime || !record.arrivalTime) {
              record.duration = "N/A";
              return;
          }
          
          var setHours = function(hours) {
            parseInt(hours, 10);
          };
          
          setHours(timeDepart[0]);
          setHours(timeArrive[0]);
          
          if(timeArrive[0]<timeDepart[0]) timeArrive[0] += 24;

          var duration = ((timeArrive[0]*60)+timeArrive[1])-((timeDepart[0]*60)+timeDepart[1]);
          duration = parseInt(duration/60)+"h"+(duration%60)+"m";
        
          record.duration = duration;
      
        }
    
    
    
    return {
			returnAllJourneys: function () {
				return $http.get(location + file).success(function(data, status, headers, config){
  					masterJson = data;
  					masterJson.forEach(function(record){
  					  addDuration(record)});
					return masterJson;
				});
			},
			returnFilteredJourneys: function () {
			    //return filteredJson;
			}
    }
      
		
		}]);



function main() {
}

$(document).ready(main);

