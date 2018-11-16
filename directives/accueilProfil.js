m.directive('accueilprofil', function(){
    var directiveDefsAccueilProfil = {
        controller: function($scope){
            if(sessionStorage.mail){
                $scope.mailUtilisateur = sessionStorage.mail; 
                $scope.idUtilisateur = sessionStorage.id;
                $scope.prenomUtilisateur = sessionStorage.prenom;

                $('#deconnexion').css('display', 'block')
                $('.resizeDivTitre').addClass('col-sm-9')  
              }
        },
        template: `
            <div class="row" ng-if="mailUtilisateur">
                <div class="well well-lg" ng-if='mailUtilisateur'>
                    <div>
                        <a href="#!/profil/{{idUtilisateur}}"><i class="far fa-user-circle"></i> {{prenomUtilisateur}}</a>
                        <!-- <img class="media-object img-circle" width="80px" src="" alt="Image"> -->
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" width="70px" class="avatar img-circle img-thumbnail" alt="avatar">
                    </div>
                </div>
            </div>
        `
    }
    return directiveDefsAccueilProfil    
})