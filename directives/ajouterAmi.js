m.directive('ajouterami', function(){
    var directiveDefsAjouterAmi = {
        controller: function($scope, $http, $routeParams){
          // console.log('sessionStorage', sessionStorage)
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.mail){
            $scope.mailUtilisateur = sessionStorage.mail;        
          }

          $scope.ajouterAmi = function(){
            // recupere le parametre dans la route (id)
            paramRoute = {
                id: $routeParams.idUtilisateur,
                idEnCour: sessionStorage.id
            }
            var routeJsonData = angular.toJson(paramRoute, true);

            var urlEnLigne = "/ajouteami"
            // envoie des donnees en POST
            $http({
                url: urlEnLigne,
                method: 'POST',
                data: routeJsonData
                // data: utilisateurJsonData
            }).then(function (httpResponse) {
                console.log('Recuperation profil reussi', httpResponse.data.profilUtilisateur)
                // si un message d'erreur est envoyer par le serveur
                if(httpResponse.data.message){
                    console.log('Echec de la recuperation du profil')
                }
                else{
                    alert('Ajouter comme ami')
                }

            })

          }

        },
        template: `
            <div class="panel-heading">
                <i class="fa fa-user fa-1x"></i>
                <button id="boutonAjouterAmi" ng-click="ajouterAmi()" class="btn btn-info-outline" type="button">Ajouter en ami</button> 
            </div>
        `

    }
    return directiveDefsAjouterAmi

})
