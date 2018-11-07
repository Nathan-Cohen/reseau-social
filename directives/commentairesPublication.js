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
            <div ng-if='id' ng-controller="commentaireBarCtrl">                       
                    
                    <div class="containerCommentaires">
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
            </div>
        `

    }
    return directiveDefsPublicationCommentaireBar

})
