m.controller('accueilCtrl', function($scope, $location, $sce, $http, SocketService){
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

    ///RECUPERE URL DE YOUTUBE
    $scope.trustSrc = function(src) {
        var src = src.match(/(?<==)[^\]]+/)
        if(src){
            urlVideoYoutube = "https://www.youtube.com/embed/" + src[0]
            // console.log('urlVideoYoutube', urlVideoYoutube)
            return $sce.trustAsResourceUrl(urlVideoYoutube);
        }
      }
    
    // recupere le nombre de membre connecter
    SocketService.emit('recupereNbConnecter')
    SocketService.on('nbUtilisateurConnecter', function(data){
        $scope.nbUtilisateurConnecter = data.co
        
    });


})