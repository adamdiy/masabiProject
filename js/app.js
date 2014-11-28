angular.module('app', ['ngDialog']);

//app is main Angular instance, ngDialog controls pop-up full screen and is loaded on index.html

angular.module('app')

    .directive("fixedHeader", function () {
    return {
        restrict: "E",
        templateUrl: "./views/fixed-header.html"
    };
})

//view for a row display of a journey on first page
.directive("basicJourney", function () {
    return {
        restrict: "E",
        templateUrl: "./views/basic-journey.html"
    };
});