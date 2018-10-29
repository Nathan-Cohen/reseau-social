m.directive('ajouterami', function(){
    var directiveDefsAjouterAmi = {
        controller: function($scope, $http, $routeParams){
          // si l'utilisateur est deja connecter
          if(sessionStorage.id){ 
            $scope.booleanBouton = true;              
            // recupere le parametre dans la route (id) et l'id de la session utilisateur en cour
            paramRoute = {
                id: $routeParams.idUtilisateur,
                idEnCour: sessionStorage.id
            }
            var routeJsonData = angular.toJson(paramRoute, true);
            // url
            var urlEnLigne = "/listeami";
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
                    // chercher si l'utilisateur et ce profil sont deja ami il enleve le button 'demande ami'
                    for(var i=0; i<httpResponse.data.listeAmi.length; i++){
                        if(httpResponse.data.listeAmi[0].ami[i] == $scope.idProfil){
                            console.log('httpResponse.data.listeAmi[0].ami', httpResponse.data.listeAmi[0])
                            // $scope.booleanBouton = false;
                        }
                    }
                    
                }

            })
          }

          $scope.ajouterAmi = function(){
            // recupere le parametre dans la route (id) et l'id de la session utilisateur en cour
            paramRoute = {
                id: $routeParams.idUtilisateur,
                idEnCour: sessionStorage.id
            }
            var routeJsonData = angular.toJson(paramRoute, true);
            // url
            var urlEnLigne = "/ajouteami"
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
                    // affiche la notification de succes d'ajout d'ami
                    $('#notifSuccessAmi').css('display', 'block')
                }

            })

          }

        },
        template: `
            <div class="panel-heading" ng-if="booleanBouton">
                <i class="fa fa-user fa-1x"></i>
                <button id="boutonAjouterAmi" ng-click="ajouterAmi()" class="btn btn-info-outline" type="button">Ajouter en ami</button> 
            </div>
        `

    }
    return directiveDefsAjouterAmi

})
