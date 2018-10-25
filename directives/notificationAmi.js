m.directive('notificationami', function(){
    var directiveDefsnotificationAmi = {
        controller: function($scope, $http, $routeParams){
          // console.log('sessionStorage', sessionStorage)
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.mail){     
            // recupere le parametre dans la route (id)
            paramRoute = {
                id: sessionStorage.id
            }
            var routeJsonData = angular.toJson(paramRoute, true);

            var urlEnLigne = "/choixajouteami"
            // envoie des donnees en POST
            $http({
                url: urlEnLigne,
                method: 'POST',
                data: routeJsonData
                // data: utilisateurJsonData
            }).then(function (httpResponse) {
                // si un message d'erreur est envoyer par le serveur
                if(httpResponse.data.message){
                    console.log('Echec de la recuperation du profil')
                }
                else{
                    console.log('liste des demandes dami', httpResponse.data.notificationAmi.length)
                    $scope.itemDemandeAmi = httpResponse.data.notificationAmi;
                    $scope.previewItemDemandeAmi = httpResponse.data.notificationAmi.length
                }

            })
  
            
          }


        },
        template: `
            <div class="container">
                <div class="row col-md-10 custyle">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Mail</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tr ng-repeat="item in itemDemandeAmi">
                        <td>{{item.prenom}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.mail}}</td>
                        <td class="text-center"><a class='btn btn-info btn-xs'> Accepter</a> <a class="btn btn-danger btn-xs">Refuser</a></td>
                    </tr>
                </table>
                </div>
            </div>
        `

    }
    return directiveDefsnotificationAmi

})
