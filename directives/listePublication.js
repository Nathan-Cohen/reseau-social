m.directive('listepublication', function(){
    var directiveListePublicationDef = {
        controller: function($scope, $http, $routeParams, SocketService){
            if(sessionStorage.id){
                $scope.idSession = sessionStorage.id
                $scope.rechercheListePublication = function(){
                  // recupere le parametre dans la route (id)
                  paramRoute = {
                        id: sessionStorage.id,
                        idEnCour: $routeParams.idUtilisateur,
                  }
                  var routeJsonData = angular.toJson(paramRoute, true);
                  // url
                  var urlEnLigne = "/listepublication"
                  // envoie des donnees en POST pour recuperer le nombre de publication
                  $http({
                      url: urlEnLigne,
                      method: 'POST',
                      data: routeJsonData
                  }).then(function (httpResponse) { 
                    //   console.log('test liste publication')                 
                      // si un message d'erreur est envoyer par le serveur
                      if(httpResponse.data.message){
                          console.log('Echec de la recuperation du nombre de publication')
                      }
                      else{
                          // ajoute le nombre de publication dans l'onglet
                          $scope.previewItemListePublication = httpResponse.data.listePublication.length
                          // envoie dans le tableau
                          $scope.itemListePublication = httpResponse.data.listePublication;

                            $scope.timeout_rechercherlistepublie = setTimeout(function(){
                                $scope.rechercheListePublication();
                            }, 5000)
                      }
                  })
  
                }
                $scope.rechercheListePublication()

                // supprimer la publication
                $scope.supprimerLaPublication = function(itemPublicationSupprimer){
                    $scope.supprimePublication = {idPublication: $(itemPublicationSupprimer.target).attr("id")};
                    // url
                    var urlEnLigne = "/supprimepublication"
                    // envoie des donnees en POST pour supprimer la publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: $scope.supprimePublication
                    }).then(function (httpResponse) {              
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == 'Erreur'){
                            console.log('Echec de la recuperation du nombre de publication')
                        }
                        else{
                            console.log('suppression reussi')
                        }
                    })
                }

                // COMMENTAIRE
                // si l'utilisateur commence a ecrire un commentaire on stop le settimout
              $scope.focusInput = function(){
                    console.log('gfnkjdngdjng')
                    clearTimeout($scope.timeout_rechercherlistepublie)
                }

                $scope.publierCommentaire = function(){
                    console.log('message', $scope.messagecommentaire)
            
                }

            }
            
        },
        template: `
            <!-- PUBLICATION -->
            <div class="well" ng-repeat-start="item in itemListePublication">
                <div class="publications-body">
                    <a class="pull-left" href="#">
                    [photo de l'article]
                    </a>
                    <div class="media-body">
                        <button ng-if="item.idPublication == idSession" id="{{item.idPublication}}" class="pull-right supprimePublication" ng-click="supprimerLaPublication($event)" type="button"><i id="{{item._id}}" class="fas fa-times-circle"></i></button>
                        <p class="text-right"><span class="glyphicon glyphicon-time"></span>Times</small></p>
                        <p class="text-left"><a href="#!/profil/recherche/{{item.idPublication}}">{{item.prenom}}{{item.prenomAuteur}} {{item.nomAuteur}}</a> :</p>
                        <p>{{item.publication}}</p>
                    </div>
                    
                </div>
            </div>
            <div ng-repeat-end>
                <!-- COMMENTAIRE -->
                <textarea ng-focus="focusInput()" class="form-control-commentaire animated col-sm-9" placeholder="Publier un statut" name="messagecommentaire" ng-model="messagecommentaire" ></textarea>
                <button class="btn btn-info col-sm-3" ng-click="publierCommentaire()" type="button">Partager</button>
                <publicationcommentairebar></publicationcommentairebar>
            </div>
                


        `

    }
    return directiveListePublicationDef

})

