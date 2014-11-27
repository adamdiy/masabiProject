(function() {
    "use strict";

    describe("Search catalogue controller", function() {

        //mock the catalogue service
        var scope, catalogue = {
            fullCatalogue: [{test: "hello"}, {test: "hola"}, {test: "testin"}],
            filteredCatalogue: [{test: "hello"}, {test: "hola"}, {test: "testin"}],
            getFullCatalogue: function() {
                return catalogue.fullCatalogue;
            },
            search: function() {
                return catalogue.filteredCatalogue;
            },
            filterProducts: function() {
                catalogue.filteredCatalogue = catalogue.fullCatalogue[1];
            }
        };
        
        //load module containing the app first
        beforeEach(module("app"));

        //create mock scope and load controller passing it a mocked $scope and catalogue
        //(We only want to test the controllers functionality)
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('SearchCatalogueCtrl', { $scope: scope, catalogue: catalogue });
        }));

        //test that scope.matches starts with the full catalogue!
        it("should initialize scope.matches to the full catalogue", function() {
            expect(scope.matches).toEqual(catalogue.fullCatalogue);
        });

        //test that scope.matches is changed when searchCatalogue() has been called
        it("should set matches to the return value of catalogue.search when searchCatalogue() is called", function() {
            scope.searchCatalogue();
            expect(scope.matches).toEqual(catalogue.filteredCatalogue);
        });

        //test that scope matches is changed when filter() has been called
        it("should set matches equal to filteredCatalogue after filtering it", function() {
            scope.filter();
            expect(scope.matches).toEqual(catalogue.filteredCatalogue);
        });

    });

}());