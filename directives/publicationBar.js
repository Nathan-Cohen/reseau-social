m.directive('publicationbar', function(){
    var directiveDefsPublicationBar = {
        controller: function($scope, $routeParams, $http){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
            $scope.id = sessionStorage.id; 
            // si l'utlisateur en cours et le profil ne sont pas le meme utilisateur
            if(sessionStorage.id != $routeParams.idUtilisateur){
              $scope.autoriserAPublier = false
              // verifier si le profil et l'utilisateur son ami pour pouvoir publier
              // recupere le parametre dans la route (id)
              paramRoute = {
                id: sessionStorage.id,
                idEnCour: $routeParams.idUtilisateur,
              }
              var routeJsonData = angular.toJson(paramRoute, true);
              // url
              var urlEnLigne = "/publicationbar"
              // envoie des donnees en POST pour recuperer le nombre de publication
              $http({
                  url: urlEnLigne,
                  method: 'POST',
                  data: routeJsonData
              }).then(function (httpResponse) { 
                  console.log('test accord publication', httpResponse.data)                 
                  // si les utilisateurs sont amis
                  if(httpResponse.data.message == 'autoriser'){
                    $scope.autoriserAPublier = true
                  }
              })

            }
            else{
              $scope.autoriserAPublier = true

            }

          }

        },
        template: `
            <div class="row" ng-if='id && autoriserAPublier' ng-controller="publicationBarCtrl">
              <div class="well well-lg">
                <div class="media1">
                <a class="pull-left" href="">
                  <i class="far fa-images" style="font-size: 70px;"></i>
                  <!-- <img class="media-object img-circle" width="80px" src="" alt="Image"> -->
                </a>
                <div class="media-body">
                                                      
                  <div class="form-group" style="padding:12px;">
                    <textarea class="form-control animated" placeholder="Publier un statut" name="messagePublication" ng-model="messagepublication" ></textarea>
                    <button class="btn btn-info pull-right" style="margin-top:10px" ng-click="publier()" type="button">Partager</button>
                  </div>
                            
                </div>
              </div>
            </div>
        `

    }
    return directiveDefsPublicationBar

})
