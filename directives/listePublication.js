m.directive('listepublication', function(){
    var directiveListePublicationDef = {
        controller: function($scope, $http, $routeParams, SocketService){
            if(sessionStorage.id){
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
                      console.log('test liste publication')                 
                      // si un message d'erreur est envoyer par le serveur
                      if(httpResponse.data.message){
                          console.log('Echec de la recuperation du nombre de publication')
                      }
                      else{
                          // ajoute le nombre de publication dans l'onglet
                          $scope.previewItemListePublication = httpResponse.data.listePublication.length
                          // envoie dans le tableau
                          $scope.itemListePublication = httpResponse.data.listePublication;
      
                        //   setTimeout(function(){
                        //       $scope.rechercheListePublication();
                        //   }, 10000)
                      }
                  })
  
              }
              $scope.rechercheListePublication()

            }
            
        },
        template: `
            <!-- PUBLICATION -->
            <div class="well" ng-repeat="item in itemListePublication">
                <div class="publications-body">
                    <a class="pull-left" href="#">
                    [photo de l'article]
                    </a>
                    <div class="media-body">
                    <!-- <h4 class="media-heading">Titre de l'article</h4> -->
                        <p class="text-right"><span class="glyphicon glyphicon-time"></span>Times</small></p>
                        <p class="text-left"><a href="#!/profil/recherche/{{item.idPublication}}">{{item.prenom}}{{item.prenomAuteur}} {{item.nomAuteur}}</a> :</p>
                        <p>{{item.publication}}</p>
                    </div>
                </div>
                <h5 class="media-heading">Commentaires :</h5>
                <!-- COMMENTAIRE -->
                    <ul class="commentaires">
                        <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />
                            </span>
                            <div class="commentaires-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Prenom Nom</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>Times</small>
                                </div>
                                <p>
                                    message 
                                </p>
                            </div>
                        </li>
                    </ul>
            </div>


        `

    }
    return directiveListePublicationDef

})

