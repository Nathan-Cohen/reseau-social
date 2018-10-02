var m = angular.module("monApp", ["ngRoute"]);

m.config(function($routeProvider) {
    $routeProvider
    .when("/accueil", {
        templateUrl : "accueil.html",
        controller: "accueilCtrl"
    })
    .when("/enregistrement", {
        templateUrl : "enregistrement.html",
        controller: "enregistrementCtrl"
    })
    .when("/connexion", {
        templateUrl : "connexion.html",
        controller: "connexionCtrl"
    })
    .otherwise({
        redirectTo: '/accueil'
    });
});