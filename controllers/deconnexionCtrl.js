m.controller('deconnexionCtrl', function($scope, $http, $location, connectionFactorie){
    // cache le bouton deconnexion
    $('#deconnexion').css('display', 'none')        
    // supprime les donnes de connexion
    sessionStorage.clear();
    // supprime le lien Connexion/Inscription
    $('#menuConnexion').css('display', 'block')
    // ajoute le lien Profil
    $('#monProfil').remove()

})