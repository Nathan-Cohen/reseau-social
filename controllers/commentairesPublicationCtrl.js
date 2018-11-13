m.controller('commentairesPublicationCtrl', function($scope, $http, $routeParams, connectionFactorie){
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
                    $scope.rechercheListePublication();
                    
                }
                // si un message d'erreur est envoyer par le serveur
                else{
                    console.log('Echec de la recuperation du profil')
                }
    
            })
        }
    
    }

})