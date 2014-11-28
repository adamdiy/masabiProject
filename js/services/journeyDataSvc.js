//this module pulls in data and serves it to mainCtrl
//manipulation of data is also in here: eg. calculating duration, trimming seconds
//validation could be done here as well: eg. missing train company providers

angular.module('app')
	.service("journeyDataSvc", ["$http", function journeyDataSvc($http){
		
		var masterJson = [];
    var location = "./data/";
    var file = ["journeys.json"];

    // want to build feature to handle multiple files - not ready yet
    
    // files.forEach(function(file){
    //     addToDb(file);
    // });

    // function addToDb () {
    //     $http.get(location + file).then(function(response) {
    //     $scope.masterSchedule = response.data;
    //       }
    //     );
    // }
    
    //adds duration field to each record
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
    
    //exposes service method to pass data into mainCtrl
    return {
			returnAllJourneys: function () {
				return $http.get(location + file).success(function(data, status, headers, config){
  					masterJson = data;
  					masterJson.forEach(function(record){
  					  addDuration(record)});
					return masterJson;
				});
			},
			//future feature: use filter() on masterJson to return filtered Json
			returnFilteredJourneys: function () {
			    //return filteredJson;
			}
    }
      
		
		}]);