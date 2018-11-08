m.controller('commentairesPublicationCtrl', function($scope, $http, $routeParams, connectionFactorie){
    // si l'utilisateur est connecter
    if(sessionStorage.id){
        $('#deconnexion').css('display', 'block')

        $scope.publierCommentaire = function(idDeLaPublication){
            console.log('message', $scope.messagecommentaire)
            console.log('message id en cours', $routeParams.idUtilisateur)
            console.log('message id', sessionStorage.id)
            console.log('message id publication', idDeLaPublication)

            
            // construit l'objet
            paramRoute = {
                id: sessionStorage.id,
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
                console.log('commentaire envoie', httpResponse.data)
                // sinon les donnees sont envoyer par le serveur
                if(httpResponse.data.message == 'Commentaire ajouter'){
                    console.log('Commentaire ajouter')
                    
                }
                // si un message d'erreur est envoyer par le serveur
                else{
                    console.log('Echec de la recuperation du profil')
                }
    
            })
        }
    
    }

})