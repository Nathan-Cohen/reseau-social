m.controller('publicationBarCtrl', function($scope, $routeParams, $http, SocketService){
    // au clique sur le bouton publier on envoie la publication
    $scope.publier = function(){
        console.log('$scope.messagepublication', $scope.messagepublication)
        // recupere le parametre dans la route (id) et l'id de la session utilisateur en cour
        paramRoute = {
          idEnCour: $routeParams.idUtilisateur,
          id: sessionStorage.id,
          messagepublication: $scope.messagepublication,
          prenom: sessionStorage.prenom,
          nom: sessionStorage.nom
        }
        var routeJsonData = angular.toJson(paramRoute, true);
        console.log('routeJsonData', routeJsonData)
        // url
        var urlEnLigne = "/publicationProfil";
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: routeJsonData
        }).then(function (httpResponse) {
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message){
                console.log('Echec de l\'ajout d\'ami')
            }
            else{
                
                
            }

        })

      }

})