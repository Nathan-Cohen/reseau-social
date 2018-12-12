m.controller('commentairesPublicationCtrl', function($scope, $http, $routeParams){
    // si l'utilisateur est connecter
    if(sessionStorage.id){
        $('#deconnexion').css('display', 'block')

        $scope.publierCommentaire = function(idDeLaPublication){
            
            // construit l'objet
            paramRoute = {
                id: sessionStorage.id,
                prenom: sessionStorage.prenom,
                nom: sessionStorage.nom,
                idEnCour: $routeParams.idUtilisateur,
                commentaire: $scope.messagecommentaire,
                idDeLaPublication: idDeLaPublication

            }
            // transforme en JSON
            var routeJsonData = angular.toJson(paramRoute, true);
            // url
            var urlEnLigne = "/ajoutcommentaire"
            // envoie des donnees en POST
            $http({
                url: urlEnLigne,
                method: 'POST',
                data: routeJsonData
                // data: utilisateurJsonData
            }).then(function (httpResponse) {
                // sinon les donnees sont envoyer par le serveur
                if(httpResponse.data.message == 'Commentaire ajouter'){
                    console.log('Commentaire ajouter')
                    // vide le champ
                    $scope.messagecommentaire = ""
                    $scope.rechercheListePublication();
                    
                    /////////NOTIFICATION///////
                    document.getElementById('notifications').innerHTML = "<div id='notifSuccess' class='notif alert alert-success' role='alert'>Le commentaire a bien été publier !</div>"
                    // affiche la notification de succes d'ajout d'ami
                    // fait disparaitre la div 
                    $("#notifSuccess").fadeOut( 8000, function() {
                        $('#notifSuccess').css('display', 'none');
                    });
                    $scope.rechercheListePublication('action')
                    
                }
                // si un message d'erreur est envoyer par le serveur
                else{
                    console.log('Echec de la recuperation du profil')
                }
    
            })
        }
    
    }

})