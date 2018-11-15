m.controller('deconnexionCtrl', function($scope, SocketService){
    SocketService.emit('disconnect')
    
    // cache le bouton deconnexion
    $('#deconnexion').css('display', 'none')   

    // supprime les donnes de connexion
    sessionStorage.clear();

    // supprime le lien Connexion/Inscription
    $('#menuConnexion').css('display', 'block')

    // ajoute le lien Profil
    $('#monProfil').remove()

    // recupere le nombre de membre connecter
    SocketService.emit('recupereNbConnecter')
    SocketService.on('nbUtilisateurConnecter', function(data){
        $scope.nbUtilisateurConnecter = data.co
        
    });

})