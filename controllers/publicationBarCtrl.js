m.controller('publicationBarCtrl', function($scope, $routeParams, $http, SocketService){
    // au clique sur le bouton publier on envoie la publication
    $scope.publier = function(){
        // recupere le parametre dans la route (id) et l'id de la session utilisateur en cour
        paramRoute = {
          idEnCour: $routeParams.idUtilisateur,
          id: sessionStorage.id,
          messagepublication: $scope.messagepublication,
          prenom: sessionStorage.prenom,
          nom: sessionStorage.nom
        }
        var routeJsonData = angular.toJson(paramRoute, true);
        // url
        var urlEnLigne = "/publicationProfil";
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: routeJsonData
        }).then(function (httpResponse) {
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message == 'Erreur'){
                console.log('Echec de l\'ajout d\'ami')
            }
            else{
                // supprime la valeur du champ de publication
                $scope.messagepublication = ""
                
                /////////NOTIFICATION///////
                document.getElementById('notifications').innerHTML = "<div id='notifSuccess' class='notif alert alert-success' role='alert'>La publication a bien été publier !</div>"
                // affiche la notification de succes d'ajout d'ami
                // fait disparaitre la div 
                $("#notifSuccess").fadeOut( 8000, function() {
                    $('#notifSuccess').css('display', 'none');
                });
            }

        })

      }

})