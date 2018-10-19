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
    .when("/profil:idUtilisateur", {
        templateUrl : "./views/profil.html",
        controller: "connexionCtrl"
    })
    .when("/apropos", {
        templateUrl : "./views/apropos.html"
    })
    .when("/contact", {
        templateUrl : "./views/contact.html"
    })
    .otherwise({
        redirectTo: '/accueil'
    });
});