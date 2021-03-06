m.directive('listeami', function(){
    var directiveDefsListeami = {
        controller: function($scope, $http, $routeParams){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
              $scope.rechercheListe = function(){    
                // recupere l'id du profil en cours
                $scope.idProfilEnCour = $routeParams.idUtilisateur 
                // recupere l'id en cours
                $scope.idEnCour = sessionStorage.id        
                // recupere le parametre dans la route (id)
                paramRoute = {
                    id: sessionStorage.id
                }
                var routeJsonData = angular.toJson(paramRoute, true);
                // url
                var urlEnLigne = "/listeami"
                // envoie des donnees en POST pour recuperer le nombre de demande d'ami
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: routeJsonData
                }).then(function (httpResponse) {
                     
                    // si un message d'erreur est envoyer par le serveur
                    if(httpResponse.data.message == 'Erreur'){
                        console.log('Echec de la recuperation du nombre de demande ami')
                    }
                    else if(httpResponse.data.message == '0'){
                        console.log('pas dami')
                        // ajoute le nombre de demande d'ami dans l'onglet
                        $scope.previewItemListeAmi = 0
                        // envoie dans le tableau
                        $scope.itemListeAmi = [];
    
                        setTimeout(function(){
                            $scope.rechercheListe();
                        }, 5000)
                    }
                    else{
                        console.log('recuperation de la liste d\'ami reussi')
                        // ajoute le nombre de demande d'ami dans l'onglet
                        $scope.previewItemListeAmi = httpResponse.data.listeAmi.length
                        // envoie dans le tableau
                        $scope.itemListeAmi = httpResponse.data.listeAmi;
                        
                        setTimeout(function(){
                            $scope.rechercheListe();
                        }, 5000)
                    }
                })

            }
            $scope.rechercheListe()


            $scope.supprimer = function(itemSupprimer){
                $scope.supprimeAmi = {reponse: "supprimer", id: sessionStorage.id, idAmi: $(itemSupprimer.target).attr("id")};
                console.log('supprimer', $scope.supprimeAmi);

                $scope.envoiSupprimer()

            }

            $scope.envoiSupprimer = function(){
                
                var urlEnLigne = "/supprimeami"
                // envoie des donnees en POST                        
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: $scope.supprimeAmi
                }).then(function (httpResponse) {
                    // si un message suppression est envoyer par le serveur sinon c'est un message d'erreur
                    if(httpResponse.data.message == 'suppression'){
                        console.log('suppression reussi', httpResponse.data)
                        $('#item'+$scope.supprimeAmi.idAmi).remove()
                        $scope.previewItemListeAmi--;
                    }
                    else{
                        console.log('Erreur de suppression')                                    
                    }
                    
                })
            }
            
          }

        },
        template: `
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Prenom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Mail</th>
                            <th scope="col" class="text-center" ng-if="idEnCour == idProfilEnCour">Action</th>
                        </tr>
                    </thead>
                    <tr id="item{{item._id}}" ng-repeat="item in itemListeAmi">
                        <td>
                            <a href="#!/profil/recherche/{{item._id}}">{{item.prenom}}</a>
                        </td>
                        <td>
                            <a href="#!/profil/recherche/{{item._id}}">{{item.nom}}</a>
                        </td>
                        <td>{{item.mail}}</td>
                        <td class="text-center" ng-if="idEnCour == idProfilEnCour">
                            <a id="{{item._id}}" class="btn btn-danger btn-xs" ng-click="supprimer($event)">Supprimer</a>
                        </td>
                    </tr>
                </table>
            </div>
        `

    }
    return directiveDefsListeami

})
