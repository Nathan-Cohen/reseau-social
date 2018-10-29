m.directive('listeami', function(){
    var directiveDefsListeami = {
        controller: function($scope, $http, $interval){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
              $scope.rechercheListe = function(){
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
                    console.log('test liste')                 
                    // si un message d'erreur est envoyer par le serveur
                    if(httpResponse.data.message){
                        console.log('Echec de la recuperation du nombre de demande ami')
                    }
                    else{
                        // ajoute le nombre de demande d'ami dans l'onglet
                        $scope.previewItemListeAmi = httpResponse.data.listeAmi.length
                        // envoie dans le tableau
                        $scope.itemListeAmi = httpResponse.data.listeAmi;
    
                        
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
                        console.log('supp', $scope.supprimeAmi.idAmi)
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
            <div class="row">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Mail</th>
                            <th class="text-center">Action</th>
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
                        <td class="text-center">
                            <a id="{{item._id}}" class="btn btn-danger btn-xs" ng-click="supprimer($event)">Supprimer</a>
                        </td>
                    </tr>
                </table>
            </div>
        `

    }
    return directiveDefsListeami

})
