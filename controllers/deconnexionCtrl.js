m.controller('deconnexionCtrl', function($scope, $http, SocketService){
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


    // recupere le nombre de publication actuel
    $scope.nbPublicationAccueil = function(){
        // url
        var urlEnLigne = "/nbpublicationaccueil"
        // envoie des donnees en POST pour supprimer la publication
        $http({
            url: urlEnLigne,
            method: 'POST'
        }).then(function (httpResponse) {              
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message == 'Erreur'){
                console.log('Echec de la recuperation du nombre de publication')
            }
            else{
                $scope.nbpublicationaccueil = httpResponse.data.nbpublicationaccueil
                setTimeout(function(){
                    $scope.nbPublicationAccueil();
                }, 5000)
            }
        })

    }
    $scope.nbPublicationAccueil()

})