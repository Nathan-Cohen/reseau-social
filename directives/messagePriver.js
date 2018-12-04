m.directive('messagepriver', function(){
    var directiveDefs = {
        controller: function($scope, $http){
            $scope.inputSujetMessagePriver = '';
            $scope.tabDesMembresSelectionner = [];

            if(sessionStorage.id){

                $scope.afficheConversationPriver = function(){
                    // recupere les parametres
                    var objetParametreAfficheConversationPriver = {
                        idEnCour: sessionStorage.id
                    }
                    var jsonParametreAfficheConversationPriver = angular.toJson(objetParametreAfficheConversationPriver, true);
                    // url
                    var urlEnLigne = "/afficheConversationPriver";
                    // envoie des donnees en POST
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: jsonParametreAfficheConversationPriver
                    }).then(function (httpResponse) {
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == 'Erreur'){
                            console.log('Echec de la creation de la conversation')
                        }
                        else{     
                            
                            console.log('httpResponse.datahttpResponse.datahttpResponse.data', httpResponse.data)
                            // /////////NOTIFICATION///////
                            // document.getElementById('notifications').innerHTML = "<div id='notifSuccess' class='notif alert alert-success' role='alert'>La conversation a bien été créer !</div>"
                            // // affiche la notification de succes d'ajout d'ami
                            // // fait disparaitre la div 
                            // $("#notifSuccess").fadeOut( 8000, function() {
                            //     $('#notifSuccess').css('display', 'none');
                            // });
                        }
            
                    })

                }

                $scope.afficheConversationPriver()

                // au clique du bouton choisir inviter l'objet du membre en cours se creer
                $scope.btnSujetMessagePriver = function(){
                    // construit l'objet du membre qui créer la conversation
                    membreEnCour = {
                        id: sessionStorage.id,
                        nom: sessionStorage.nom,
                        prenom: sessionStorage.prenom,
                        mail: sessionStorage.mail
                    }
                    $scope.tabDesMembresSelectionner.push(membreEnCour)
                    
                }
                // function pour ajouter un membre a la conversation priver
                $scope.ajouterConversationPriver = function(item, nom, prenom, mail){
                    // recupere l'id du membre 
                    $scope.itemIdSelectionner = $(item.target).attr("id")
                    for(var i=0; i<$scope.tabDesMembresSelectionner.length; i++){
                        if($scope.itemIdSelectionner == $scope.tabDesMembresSelectionner[i].id){
                            // supprime le membre selectionner si il existe deja dans le tableau
                            console.log('existe deja')
                            $scope.tabDesMembresSelectionner.splice(i, 1);
                        }

                    }
                    // construit l'objet du membre selectionner
                    membreSelectionner = {
                        id: $scope.itemIdSelectionner,
                        nom: nom,
                        prenom: prenom,
                        mail: mail
                    }
                    $scope.tabDesMembresSelectionner.push(membreSelectionner)
                    
                }
                
                
                $scope.creerConversationPriver = function(){
                    console.log('tableau de la conversation priver', $scope.tabDesMembresSelectionner)
                    console.log('$scope.inputSujetMessagePriver', $scope.inputSujetMessagePriver)
                    // recupere les parametres
                    var objetParametreConversationPriver = {
                        tabDesMembres: $scope.tabDesMembresSelectionner,
                        sujet: $scope.inputSujetMessagePriver
                    }
                    var jsonParametreConversationPriver = angular.toJson(objetParametreConversationPriver, true);
                    // url
                    var urlEnLigne = "/creationConversationPriver";
                    // envoie des donnees en POST
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: jsonParametreConversationPriver
                    }).then(function (httpResponse) {
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == 'Erreur'){
                            console.log('Echec de la creation de la conversation')
                        }
                        else{                            
                            /////////NOTIFICATION///////
                            document.getElementById('notifications').innerHTML = "<div id='notifSuccess' class='notif alert alert-success' role='alert'>La conversation a bien été créer !</div>"
                            // affiche la notification de succes d'ajout d'ami
                            // fait disparaitre la div 
                            $("#notifSuccess").fadeOut( 8000, function() {
                                $('#notifSuccess').css('display', 'none');
                            });
                        }
            
                    })

                }




            }

        },
        template: `
                <div class="chat_container">
                    <div class="col-sm-8 chat_sidebar">
                        <div class="row">
                            <div id="creationConversationPriver">
                                <div class="input-group col-md-12">
                                    <input type="text" ng-model="inputSujetMessagePriver" class="form-control" placeholder="Sujet de discussion" />
                                    <button class="btn btn-info" type="button" ng-click="btnSujetMessagePriver()" data-toggle="modal" data-target="#messagepriverModal">
                                        <span class="far fa-thumbs-up"></span> Choisir les invités
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>         
                    



            <!-- Modal -->
            <div class="modal fade" id="messagepriverModal" tabindex="-1" role="dialog" aria-labelledby="conversaionPriverModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLabel">Qui invité dans la conversation ?</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <div>
                                Membres selectionner :
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Prenom</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Mail</th>
                                            </tr>
                                        </thead>
                                        <tr id="item{{itemSelectionner._id}}" ng-repeat="itemSelectionner in tabDesMembresSelectionner">
                                            <td>
                                                <a href="#!/profil/recherche/{{itemSelectionner._id}}">{{itemSelectionner.prenom}}</a>
                                            </td>
                                            <td>
                                                <a href="#!/profil/recherche/{{itemSelectionner._id}}">{{itemSelectionner.nom}}</a>
                                            </td>
                                            <td>{{itemSelectionner.mail}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Prenom</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Mail</th>
                                            <th scope="col" class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tr id="item{{item._id}}" ng-repeat="item in itemListeAmi">
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.prenom}}</a>
                                        </td>
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.nom}}</a>
                                        </td>
                                        <td>{{item.mail}}</td>
                                        <td class="text-center">
                                            <a id="{{item._id}}" class="btn btn-info btn-xs" ng-click="ajouterConversationPriver($event, item.nom, item.prenom, item.mail)">Ajouter</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" ng-click="creerConversationPriver()" data-dismiss="modal">Créer</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `

    }
    return directiveDefs

})







































