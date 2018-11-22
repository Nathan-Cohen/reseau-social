m.directive('recommandationami', function(){
    var directiveDefsRecommandationAmi = {
        controller: function($scope, $http){
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
                        // console.log('liste ami', httpResponse.data.listeAmi)
                        
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

            // au clique sur le bouton recommandation on affiche les membres que l'on peut recommander
            $scope.recommandation = function(item){
                if($scope.itemListeAmiCopie){
                    if($scope.itemListeAmiCopie.length > 0){
                        $scope.itemListeAmiCopie = []
                    }

                }
                // recupere l'id du membre 
                $scope.itemIdSelectionner = $(item.target).attr("id")

                // recupere la liste d'ami du membre
                paramRoute = {
                    id: $scope.itemIdSelectionner
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
                        $scope.previewItemListeAmiTest = 0
                        // envoie dans le tableau
                        $scope.itemListeAmi = [];
    
                    }
                    else{
                        // console.log('liste ami', httpResponse.data.listeAmi)
                            $scope.itemListeAmiCopie = []
                            // envoie dans le tableau
                            $scope.itemListeAmiTest = httpResponse.data.listeAmi;

                            $scope.itemListeAmi.forEach(element => {
                                $scope.itemListeAmiCopie.push(element)
                            });

                            for(var i=0; i<$scope.itemListeAmiTest.length; i++){
                                function findFirstLargeNumber(element) {
                                    return element._id == $scope.itemListeAmiTest[i]._id;
                                }
                                index = $scope.itemListeAmiCopie.findIndex(findFirstLargeNumber);
                                if(index >= 0){
                                    $scope.itemListeAmiCopie.splice(index, 1);
                                }
                                
                            }
                            
                    }
                })

            }

            // recommande au membre precedement selectionner
            $scope.recommander = function(item){
                // recupere l'id du membre 
                $scope.itemARecommander = $(item.target).attr("id")

                // recupere la liste d'ami du membre
                paramRoute = {
                    idEnCour: sessionStorage.id,
                    idRecommanderSelectionner: $scope.itemIdSelectionner,
                    idRecommander: $scope.itemARecommander
                }
                console.log('paramRoute', paramRoute)
                var routeJsonData = angular.toJson(paramRoute, true);
                // url
                var urlEnLigne = "/recommandationami"
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
                    else{
                        console.log('recommandation reussi', httpResponse.data)
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
                            <th scope="col" class="text-center" ng-if="!booleanBouton">Action</th>
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
                        <td class="text-center" ng-if="!booleanBouton">
                            <a id="{{item._id}}" class="btn btn-info btn-xs" ng-click="recommandation($event)" data-toggle="modal" data-target="#recommandationModal">Recommander un ami</a>
                        </td>
                    </tr>
                </table>
            </div>




            <!-- Modal -->
            <div class="modal fade" id="recommandationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLabel">À qui recommander cet ami ?</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Prenom</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Mail</th>
                                            <th scope="col" class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tr id="item{{item._id}}" ng-repeat="item in itemListeAmiCopie" ng-if="item._id != itemIdSelectionner">
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.prenom}}</a>
                                        </td>
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.nom}}</a>
                                        </td>
                                        <td>{{item.mail}}</td>
                                        <td class="text-center">
                                            <a id="{{item._id}}" class="btn btn-info btn-xs" ng-click="recommander($event)" data-toggle="modal" data-target="#recommandationModal">Recommander</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `

    }
    return directiveDefsRecommandationAmi

})
