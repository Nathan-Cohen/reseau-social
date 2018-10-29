m.directive('notificationami', function(){
    var directiveDefsnotificationAmi = {
        controller: function($scope, $http, $routeParams, $interval){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.mail){    
              $scope.rechercheDemandeAmi = function(){
                    // recupere le parametre dans la route (id)
                    paramRoute = {
                        id: sessionStorage.id
                    }
                    var routeJsonData = angular.toJson(paramRoute, true);
        
                    var urlEnLigne = "/choixajouteami"
                    // envoie des donnees en POST pour recuperer le nombre de demande d'ami
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: routeJsonData
                        // data: utilisateurJsonData
                    }).then(function (httpResponse) { 
                        console.log('test notif')                 
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message){
                            console.log('Echec de la recuperation du nombre de demande ami')
                        }
                        else{      
                            console.log('recuperation reussi')                 
                            // ajoute le nombre de demande d'ami dans l'onglet
                            $scope.previewItemDemandeAmi = httpResponse.data.notificationAmi.length
                            // envoie dans le tableau
                            $scope.itemDemandeAmi = httpResponse.data.notificationAmi;
                            
                            
                        }
                        
                    })
                
            }

            $scope.rechercheDemandeAmi()
            // si l'utilisateur clique sur accepter l'invitation
            $scope.accepter = function(itemAccepter){
                $scope.reponseAmi = {reponse: "accepter", id: sessionStorage.id, idDemande: $(itemAccepter.target).attr("id")};
                console.log('accepter', $scope.reponseAmi);
                
                $scope.envoiReponse()
            }
            // si l'utilisateur clique sur refuser l'invitation
            $scope.refuser = function(itemRefuser){
                $scope.reponseAmi = {reponse: "refuser", id: sessionStorage.id, idDemande: $(itemRefuser.target).attr("id")};;
                console.log('refuser', $scope.reponseAmi);

                $scope.envoiReponse()
            }
            $scope.envoiReponse = function(){
                // url
                var urlEnLigne = "/reponseajouteami"
                // envoie des donnees en POST                        
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: $scope.reponseAmi
                }).then(function (httpResponse) {
                    // si un message d'erreur est envoyer par le serveur
                    if(httpResponse.data.message == 'Erreur de connexion au ajouterAmi'){
                        console.log('echec de l\'ajout')
                    }
                    else{                  
                        $('#item'+$scope.reponseAmi.idDemande).remove()
                        $scope.previewItemDemandeAmi--;
                    }
                })
            }

            
          }


        },
        template: `
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
                <tr id="item{{item._id}}" ng-repeat="item in itemDemandeAmi">
                    <td>{{item.prenom}}</td>
                    <td>{{item.nom}}</td>
                    <td>{{item.mail}}</td>
                    <td class="text-center">
                        <a id="{{item._id}}" class='btn btn-info btn-xs' ng-click="accepter($event)"> Accepter</a>
                        <a id="{{item._id}}" class="btn btn-danger btn-xs" ng-click="refuser($event)">Refuser</a>
                    </td>
                </tr>
            </table>
            </div>
        `

    }
    return directiveDefsnotificationAmi

})
