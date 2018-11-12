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
                          // inverse et envoie dans le tableau
                          if(httpResponse.data.listePublication.length > 0){
                              $scope.itemListePublication = httpResponse.data.listePublication.reverse();
                          }
                          // si il y a des commentaires on inverse et on envoie dans le tableau
                          if(httpResponse.data.listePublication[0]){
                              $scope.itemListeCommentaire = httpResponse.data.listePublication[0].idCommentateur.reverse();
                          }

                          $scope.date = new Date()

                        //   console.log('httpResponse.data.listePublication.idCommentateur', httpResponse.data.listePublication[0].idCommentateur)
            
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
                    // arrete de refraichire les publications le temp du commentaire
                    clearTimeout($scope.timeout_rechercherlistepublie)
                }

                // supprime le commentaire
                $scope.supprimerLeCommentaire = function(commentaire){

                    $scope.commentaireSuppression = {
                        idPublication: $(commentaire.target).attr("id"),
                        idUniqueCommentaire: $(commentaire.currentTarget).attr("id"),
                        nom: sessionStorage.nom,
                        prenom: sessionStorage.prenom,
                        idEnCour: sessionStorage.id
                    }
                    // url
                    var urlEnLigne = "/supprimecommentaire"
                    // envoie des donnees en POST pour supprimer la publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: $scope.commentaireSuppression
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
                        <p class="text-right">{{item.date}} <span class="glyphicon glyphicon-time"></span></small></p>
                        <p class="text-left"><a href="#!/profil/recherche/{{item.idPublication}}">{{item.prenom}}{{item.prenomAuteur}} {{item.nomAuteur}}</a> :</p>
                        <p>{{item.publication}}</p>
                    </div>
                    
                </div>
            </div>
            <div ng-repeat-end ng-controller="commentairesPublicationCtrl">
                <!-- PUBLIER UN COMMENTAIRE -->
                <div>
                    <textarea id="{{item._id}}" ng-focus="focusInput()" class="form-control-commentaire animated col-sm-9" placeholder="Votre commentaire .." name="messagecommentaire" ng-model="messagecommentaire" ></textarea>
                    <button class="btn btn-info col-sm-3 boutonCommentaire" ng-click="publierCommentaire(item._id)" type="button">Partager</button>
                </div>
                <!-- AFFICHER LES COMMENTAIRES -->
                <div class="containerCommentaires">
                    <ul class="commentaires">
                        <li class="left clearfix" ng-repeat="itemCommentaire in item.idCommentateur">
                            <span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />
                            </span>
                            <div class="commentaires-body clearfix">
                                <div class="header">
                                    <button ng-if="item.idPublication == idSession" id="{{itemCommentaire.idUniqueCommentaire}}" class="pull-right supprimePublication" ng-click="supprimerLeCommentaire($event)" type="button"><i id="{{item._id}}" class="fas fa-times-circle"></i></button>

                                    <strong class="primary-font">{{itemCommentaire.prenom}} {{itemCommentaire.nom}}</strong> <small class="pull-right text-muted">

                                    {{itemCommentaire.date}} <span class="glyphicon glyphicon-time"></span></small>
                                </div>
                                <p>
                                    {{itemCommentaire.commentaire}} 
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
                


        `

    }
    return directiveListePublicationDef

})

