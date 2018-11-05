m.directive('publicationbar', function(){
    var directiveDefsPublicationBar = {
        controller: function($scope){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
            $scope.id = sessionStorage.id; 
            
          }

        },
        template: `
            <div class="row" ng-if='id' ng-controller="publicationBarCtrl">
              <div class="well well-lg">
                <div class="media1">
                <a class="pull-left" href="#">
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
