m.directive('publicationcommentairebar', function(){
    var directiveDefsPublicationCommentaireBar = {
        controller: function($scope){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
            $scope.id = sessionStorage.id; 

            // verifier si le profil et l'utilisateur son ami pour pouvoir publier
            
          }

        },
        template: `
            <div ng-if='id' ng-controller="publicationBarCtrl">                       
                    <textarea class="form-control-commentaire animated col-sm-9" placeholder="Publier un statut" name="messagePublication" ng-model="messagepublication" ></textarea>
                    <button class="btn btn-info col-sm-3" ng-click="publier()" type="button">Partager</button>
            </div>
        `

    }
    return directiveDefsPublicationCommentaireBar

})
