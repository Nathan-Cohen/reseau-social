m.directive('publicationbar', function(){
    var directiveDefsPublicationBar = {
        controller: function($scope){
          // console.log('sessionStorage', sessionStorage)
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.mail){
            $scope.mailUtilisateur = sessionStorage.mail;        
          }

        },
        template: `
            <div class="row">
              <div class="well well-lg" ng-if='mailUtilisateur'>
                <div class="media1">
                <a class="pull-left" href="#">
                  <i class="far fa-images" style="font-size: 70px;"></i>
                  <!-- <img class="media-object img-circle" width="80px" src="" alt="Image"> -->
                </a>
                <div class="media-body">
                                                      
                  <div class="form-group" style="padding:12px;">
                    <textarea class="form-control animated" placeholder="Publier un statut"></textarea>
                    <button class="btn btn-info pull-right" style="margin-top:10px" type="button">Share</button>
                  </div>
                            
                </div>
              </div>
            </div>
        `

    }
    return directiveDefsPublicationBar

})
