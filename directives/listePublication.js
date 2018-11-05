m.directive('listepublication', function(){
    var directiveActuDef = {
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
            <div class="well" ng-repeat="item in itemListePublication">
                <div class="media">
                    <a class="pull-left" href="#">
                    [photo de l'article]
                    </a>
                    <div class="media-body">
                    <!-- <h4 class="media-heading">Titre de l'article</h4> -->
                        <p class="text-right"><a href="#!/profil/recherche/{{item.idPublication}}">{{item.prenom}}{{item.prenomAuteur}} {{item.nomAuteur}}</a></p>
                        <p>{{item.publication}}</p>
                        <ul class="list-inline list-unstyled">
                            <li><span><i class="glyphicon glyphicon-calendar"></i> date de l'article </span></li>
                        <li>|</li>
                        <span><i class="glyphicon glyphicon-comment"></i> nombre de commentaires</span>
                        <li>|</li>
                        <li>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                        </li>
                        <li>|</li>
                        <li>
                            <span><i class="fab fa-facebook-square"></i></span>
                            <span><i class="fab fa-twitter-square"></i></span>
                            <span><i class="fab fa-google-plus-square"></i></span>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        `

    }
    return directiveActuDef

})

