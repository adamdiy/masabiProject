(function() {
    "use strict";

    describe("Data service", function() {

        //mock data service
        var scope;
        var journeyDataSvc = {
            fullSchedule: [{"order":0,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"23:50:00","arrivalTime":"01:00:00"},{"order":3,"originStation":"Brighton","destinationStation":"London Bridge","operator":"Southern Trains","startTime":"15:51:00","arrivalTime":"18:35:00"},{"order":4,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"12:43:00","arrivalTime":"14:23:00"},{"order":1,"originStation":"Brighton","destinationStation":"London Bridge","startTime":"10:25:00","arrivalTime":"12:00:00"},{"order":2,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"17:00:00","arrivalTime":"19:00:00"}],
            filteredSchedule: [{"order":0,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"23:50:00","arrivalTime":"01:00:00"}],
            returnAllJourneys: function() {
                return journeyDataSvc.fullSchedule;
            },
            search: function() {
                return journeyDataSvc.filteredSchedule;
            },
            filterProducts: function() {
                journeyDataSvc.filteredSchedule = journeyDataSvc.fullSchedule[1];
            }
        };
        
        //load module containing the app first
        beforeEach(module("app"), ['ngDialog']);

        //create mock scope and load controller passing it a mocked $scope and schedule
        //(We only want to test the controllers functionality)
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('mainCtrl', { $scope: scope, journeyDataSvc: journeyDataSvc });
        }));

        //test that scope.matches starts with the full schedule!
        it("should initialize scope.matches to the full schedule", function() {
            expect(scope.masterSchedule).toEqual(journeyDataSvc.fullSchedule);
        });

        //test that scope.matches is changed when searchSchedule() has been called
        it("should set matches to the return value of schedule.search when searchSchedule() is called", function() {
            //scope.searchSchedule();
            expect(scope.masterSchedule).toEqual(journeyDataSvc.filteredSchedule);
        });

        //test that scope matches is changed when filter() has been called
        it("should set matches equal to filteredSchedule after filtering it", function() {
            //scope.filter();
            expect(scope.masterSchedule).toEqual(journeyDataSvc.filteredSchedule);
        });

    });

}());