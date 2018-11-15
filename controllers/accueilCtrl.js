m.controller('accueilCtrl', function($scope, $location, $http, SocketService){
    if(sessionStorage.id){
        $scope.idSession = sessionStorage.id

        $scope.utilisateurEnCour = {
            nom: sessionStorage.nom,
            prenom: sessionStorage.prenom,
            idEnCour: sessionStorage.id
        }
        // url
        var urlEnLigne = "/accueilactualiter"
        // envoie des donnees en POST pour supprimer la publication
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: $scope.utilisateurEnCour
        }).then(function (httpResponse) {              
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message == 'Erreur'){
                console.log('Echec de la recuperation du nombre de publication')
            }
            else{
                console.log('actualiter publication reussi')
                $scope.itemListePublication = httpResponse.data.accueilactualiter.reverse()
            }
        })
        
        
    }
    
    // recupere le nombre de membre connecter
    SocketService.emit('recupereNbConnecter')
    SocketService.on('nbUtilisateurConnecter', function(data){
        $scope.nbUtilisateurConnecter = data.co
        
    });


})