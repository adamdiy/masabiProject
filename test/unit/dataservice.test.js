(function() {
    //"use strict";

    describe("data service", function() {
        var catalogue, httpBackend;

        beforeEach(module("app"));

         beforeEach(module(function ($provide) {
            $provide.value('$http', {
                get: function() {
                    console.log("alive!");
                    return "hello";
                }
            });
        }));

        beforeEach(inject(function(_catalogue_, $httpBackend) {
            catalogue = _catalogue_;
            httpBackend = $httpBackend;
        }));



        beforeEach(function() {
            httpBackend.whenGET("../datalists/kids1.csv").respond({
                data: "Title/Programme, Language, MY, NAME \n 1, 2, 3, 4"
            });
        })

        it("saeu", function() {
            httpBackend.whenGET("/forest").respond(function(){
                console.log("victory");

                return { data: "Title/Programme, Language, MY, NAME \n 1, 2, 3, 4" };
            });
            
            var x = catalogue.testing();
            console.log(x);
            expect(x).toBe("data");
            expect(catalogue.getFullCatalogue()).toBe("Hello");
        });

    });

}());
