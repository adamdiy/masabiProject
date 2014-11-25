  
angular.module('app', []);
	
	
angular.module('app')
	.controller('loadJsonData', ["$scope", function loadJsonData($scope) {
  masterJson = [];
  var location = "./data/";
  var files = ["journeys.json"];

    files.forEach(function(file){
        addToDb(file);
    });

    function addToDb (file) {
        $.getJSON(location + file)
          .then(function(data){
            $scope.masterSchedule = data;
            alert($scope.masterSchedule);
          }
        );
    }

    }])
    
  .directive("basicJourney", function(){
			return {
				restrict: "E",
				templateUrl: "./views/basic-journey.html"
			}
		});

	

function main() {
}

$(document).ready(main);

