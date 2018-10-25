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
    .when("/profil/:idUtilisateur", {
        templateUrl : "./views/profil.html",
        controller: "profilCtrl"
    })
    .when("/profil/recherche/:idUtilisateur", {
        templateUrl : "./views/profilVisiteur.html",
        controller: "profilVisiteurCtrl"
    })
    .when("/apropos", {
        templateUrl : "./views/apropos.html"
    })
    .when("/contact", {
        templateUrl : "./views/contact.html"
    })
    .when("/deconnexion", {
        controller: "deconnexionCtrl",
        templateUrl : "./views/accueil.html"
    })
    .otherwise({
        redirectTo: '/accueil'
    });
});