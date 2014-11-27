(function() {
    //"use strict";

    describe("data service", function() {
        var journeyDataSvc, httpBackend;

        beforeEach(module("app"));

         beforeEach(module(function ($provide) {
            $provide.value('$http', {
                get: function() {
                    console.log("alive!");
                    return "hello";
                }
            });
        }));

        beforeEach(inject(function(_journeyDataSvc_, $httpBackend) {
            journeyDataSvc = _journeyDataSvc_;
            httpBackend = $httpBackend;
        }));



        beforeEach(function() {
            httpBackend.whenGET("./data/journeys.json").respond({
                data: [{"order":0,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"23:50:00","arrivalTime":"01:00:00"}]
            });
        })

        it("Returns expected data", function() {
            httpBackend.whenGET("/forest").respond(function(){
                return [{"order":0,"originStation":"Brighton","destinationStation":"London Victoria","operator":"Southern Trains","startTime":"23:50:00","arrivalTime":"01:00:00"}]
            });
            
            console.log(journeyDataSvc.returnAllJourneys());
            //var x = journeyDataSvc.returnAllJourneys(); //error here somewhere as jDS not defined or doesnt have testing
            //console.log(x);
            //expect(x).toBe("data");
            expect(journeyDataSvc.returnAllJourneys()).toBe("hello");
        });

    });

}());
