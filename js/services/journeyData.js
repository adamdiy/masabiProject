angular.module("app")
	.service('journeyData', [function journeyData() {
  
  var masterJson = [];
  var location = "./data/";
  var files = ["journeys.json"];

    files.forEach(function(file){
        addToDb(file);
    });

    function addToDb (file) {
        $.getJSON(location + file)
          .then(function(data){
          masterJson += data;
          }
        );
    }

    this.getFullSchedule = function getFullSchedule () {
			return masterJson;
		}

    }])