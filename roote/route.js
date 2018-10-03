var m = angular.module("monApp", ["ngRoute"]);

m.config(function($routeProvider) {
    $routeProvider
    .when("/accueil", {
        templateUrl : "./views/accueil.html",
        controller: "accueilCtrl"
    })
    .when("/enregistrement", {
        templateUrl : "./views/enregistrement.html",
        controller: "enregistrementCtrl"
    })
    .when("/connexion", {
        templateUrl : "./views/connexion.html",
        controller: "connexionCtrl"
    })
    .otherwise({
        redirectTo: '/accueil'
    });
});