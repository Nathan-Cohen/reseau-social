m.directive('listerecommandationami', function(){
    var directiveDefsListeRecommandationAmi = {
        controller: function($scope, $http){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){

            // au clique sur le bouton recommandation on affiche les membres que l'on peut recommander
            $scope.ListeRecommandationAmi = function(){
                if(sessionStorage.id){
                    // recupere la liste d'ami du membre
                    paramRoute = {
                        idEnCour: sessionStorage.id
                    }
                    var routeJsonData = angular.toJson(paramRoute, true);
    
                    // console.log('liste des recommandations d\'amis')
    
                    // url
                    var urlEnLigne = "/listerecommandationami"
                    // envoie des donnees en POST pour recuperer le nombre de demande d'ami
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: routeJsonData
                    }).then(function (httpResponse) {
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == 'Erreur'){
                            console.log('Echec de la recuperation du nombre de recommandation d\'ami')
                        }
                        else if(httpResponse.data.message == 'pas de recommandation'){
                            $scope.viewListeDesRecommandationsAmis = 0
                            setTimeout(function(){
                                $scope.ListeRecommandationAmi();
                            }, 5000)
                        }
                        else{
                            if(httpResponse.data.listeDesRecommandationsAmis){
                                console.log('recuperation de la liste des recommandations reussi')
                                // recupere le tableau des recommandations
                                $scope.listeDesRecommandationsAmis = httpResponse.data.listeDesRecommandationsAmis
                                // affiche le nombre de recommandation dans l'onglet
                                $scope.viewListeDesRecommandationsAmis = httpResponse.data.listeDesRecommandationsAmis.length
                                setTimeout(function(){
                                    $scope.ListeRecommandationAmi();
                                }, 5000)
                            }
                            else{
                                $scope.viewListeDesRecommandationsAmis = 0
                                setTimeout(function(){
                                    $scope.ListeRecommandationAmi();
                                }, 5000)
                            }
                                
                        }
                    })

                }

            }
            $scope.ListeRecommandationAmi()


            // au clique sur le bouton recommandation on affiche les membres que l'on peut recommander
            $scope.recommandationAjouterAmi = function(item){
                // recupere l'id du membre 
                $scope.itemIdSelectionner = $(item.target).attr("id")

                ajouterAmiObj = {
                    id: $scope.itemIdSelectionner,
                    idEnCour: sessionStorage.id
                }
                
                var ajouterAmiJson = angular.toJson(ajouterAmiObj, true);
                // url
                var urlEnLigne = "/ajouteami"
                // envoie des donnees en POST
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: ajouterAmiJson
                }).then(function (httpResponse) {
                    // si un message d'erreur est envoyer par le serveur
                    if(httpResponse.data.message){
                        console.log('Echec de l\'ajout d\'ami')
                    }
                    else{
                        console.log('demande d\'ajoute a la liste d\'amis reussi !')
                    }

                })

                ////// supprime la recommandation /////
                supprimerAmiObj = {
                    id: $scope.itemIdSelectionner,
                    idEnCour: sessionStorage.id
                }
                // url
                var urlEnLigneRecommandation = "/supprimerecommandation"
                // envoie des donnees en POST
                $http({
                    url: urlEnLigneRecommandation,
                    method: 'POST',
                    data: supprimerAmiObj
                }).then(function (httpResponse) {
                    // si un message d'erreur est envoyer par le serveur
                    if(httpResponse.data.message){
                        console.log('Echec de l\'ajout d\'ami')
                    }
                    else{
                        console.log('suppression de la recommandation reussi !')
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
                            <th scope="col">Recommandation de la par de :</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Mail</th>
                            <th scope="col" class="text-center" ng-if="!booleanBouton">Action</th>
                        </tr>
                    </thead>
                    <tr ng-repeat="item in listeDesRecommandationsAmis">
                        <td>
                            <a href="#!/profil/recherche/{{item.idQuiARecommander}}">{{item.prenomQuiARecommander}} {{item.nomQuiARecommander}}</a>
                        </td>
                        <td>
                            <a href="#!/profil/recherche/{{item.idRecommander}}">{{item.prenomRecommander}}</a>
                        </td>
                        <td>
                            <a href="#!/profil/recherche/{{item.idRecommander}}">{{item.nomRecommander}}</a>
                        </td>
                        <td>{{item.mailRecommander}}</td>
                        <td class="text-center" ng-if="!booleanBouton">
                            <a id="{{item.idRecommander}}" class="btn btn-info btn-xs" ng-click="recommandationAjouterAmi($event)">Ajouter comme ami</a>
                        </td>
                    </tr>
                </table>
            </div>
        `

    }
    return directiveDefsListeRecommandationAmi

})
