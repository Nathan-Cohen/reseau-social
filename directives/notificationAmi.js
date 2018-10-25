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
                    // ajoute le nombre de demande d'ami dans l'onglet
                    $scope.previewItemDemandeAmi = httpResponse.data.notificationAmi.length
                    // envoie dans le tableau
                    $scope.itemDemandeAmi = httpResponse.data.notificationAmi;
                    // si l'utilisateur clique sur accepter l'invitation
                    $scope.accepter = function(itemAccepter){
                        console.log('accepter', $(itemAccepter.target).attr("id"));
                    }
                    // si l'utilisateur clique sur refuser l'invitation
                    $scope.refuser = function(itemRefuser){
                        console.log('refuser', $(itemRefuser.target).attr("id"));


                    }
        
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
                        <td class="text-center">
                            <a id="{{item._id}}" class='btn btn-info btn-xs' ng-click="accepter($event)"> Accepter</a>
                            <a class="btn btn-danger btn-xs" ng-click="refuser($event)">Refuser</a>
                        </td>
                    </tr>
                </table>
                </div>
            </div>
        `

    }
    return directiveDefsnotificationAmi

})
