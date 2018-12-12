m.directive('messagepriver', function(){
    var directiveDefs = {
        controller: function($scope, $http){
            $scope.inputSujetMessagePriver = '';
            $scope.msg = {messagePriver: ''}
            
            if(sessionStorage.id){
                
                $scope.afficheConversationPriver = function(actualisation){
                    if(!$scope.ListeMessagePriverTab){
                        $scope.ListeMessagePriverTab = []
                    }

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
                            if(actualisation == "actualisation"){
                                $scope.tableauDesConversation =  httpResponse.data.listeConversationPriver
                                actualisation = undefined
                            }
                            $scope.ListeMessagePriverTab = []
                            // si le tableau des listes de conversation existe
                            if(httpResponse.data.listeConversationPriver){
                                httpResponse.data.listeConversationPriver.forEach(function(elementConversation){
                                    if(elementConversation.messagePriver){
                                        elementConversation.messagePriver.forEach(function(elementMessage){
                                            $scope.ListeMessagePriverTab.push(elementMessage)
                                            // console.log('$scope.ListeMessagePriverTab', $scope.ListeMessagePriverTab)
                                        })
    
                                    }
                                })
                            }
                            // console.log('$scope.ListeMessagePriverTab', $scope.ListeMessagePriverTab)
                            setTimeout(function(){
                                $scope.afficheConversationPriver()
                            }, 5000)
                        }
            
                    })

                }

                $scope.afficheConversationPriver()

                // au clique du bouton choisir inviter l'objet du membre en cours se creer
                $scope.btnSujetMessagePriver = function(){
                    $scope.tabDesMembresSelectionner = [];
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
                    var membreSelectionner = {
                        id: $scope.itemIdSelectionner,
                        nom: nom,
                        prenom: prenom,
                        mail: mail
                    }
                    $scope.tabDesMembresSelectionner.push(membreSelectionner)
                    
                }
                
                
                $scope.creerConversationPriver = function(){
                    // console.log('tableau de la conversation priver', $scope.tabDesMembresSelectionner)
                    // console.log('$scope.inputSujetMessagePriver', $scope.inputSujetMessagePriver)
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


                $scope.envoieMessagePriver = function(itemId){
                    
                    var envoieMessagePriverObj = {
                        idConversationPriver: itemId,
                        idEnCour: sessionStorage.id,
                        messagePriver: $scope.msg.messagePriver,
                        prenomMessagePriver: sessionStorage.prenom,
                        nomMessagePriver: sessionStorage.nom
                    }

                    var routeJsonData = angular.toJson(envoieMessagePriverObj, true);
                    // url
                    var urlEnLigne = "/envoieMessagePriver"
                    // envoie des donnees en POST pour recuperer le nombre de publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: routeJsonData
                    }).then(function (httpResponse) {             
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == "Erreur"){
                            console.log('Echec de la recuperation')
                        }
                        else{
                            // vide le champ
                            $scope.msg.messagePriver = "";
                            $scope.afficheConversationPriver()
                            console.log('envoie du message priver reussi')

                        }
                    })

                }




            }

        },
        template: `
            <div class="chat_container">
                <div class="col-sm-10 chat_sidebar">
                    <div class="row">
                        <div id="creationConversationPriver">
                            <div class="input-group col-md-12" style="width: 100%;">
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



        
        <!-- affichage des conversation priver -->
        <p ng-repeat="itemConversationPriver in tableauDesConversation" style="margin: 10px; float: left;">
            <button class="themeBtnConversationPriver" type="button" data-toggle="collapse" data-target="#{{itemConversationPriver.sujet}}" aria-expanded="false" aria-controls="collapseExample">
                {{itemConversationPriver.sujet}}
            </button>
        </p>
        
        <div id="containerConversationPriver" class="col-sm-12">
            <div ng-repeat="itemConversationPriver in tableauDesConversation" class="collapse" id="{{itemConversationPriver.sujet}}">
                <div class="card card-body">
                    <div class="col-sm-12 message_section" id="bodyMessagePriver">
                            <div class="row">
                                <div class="new_message_head">
                                    <div class="pull-left">{{itemConversationPriver.sujet}}</div>
                                    <div class="pull-right">
                                        <div class="dropdown nomDesParticipantConversationPriver" ng-repeat="itemNomDesMembreConversationPriver in itemConversationPriver.tableauDesMembres">
                                        | {{itemNomDesMembreConversationPriver.prenom}} {{itemNomDesMembreConversationPriver.nom}}
                                        </div>
                                    </div>
                                </div>
                                <!--Liste des messages-->
            
                                <div class="chat_area">
                                    <ul class="list-unstyled">
                                        <li class="left clearfix" ng-repeat-start="itemMessagePriver in ListeMessagePriverTab" ng-if="itemMessagePriver.prenom == prenomEnCours && itemConversationPriver._id == itemMessagePriver.idConversationPriver">
                                            <span class="chat-img1 pull-left">
                                                <img src="../images/avatar_defaut.png" alt="User Avatar" class="img-circle">
                                                <span class="nommessagePriver"><a href="#!/profil/recherche/{{idMessagePriver}}">{{itemMessagePriver.prenom}} {{itemMessagePriver.nom}}</a></span>
                                            </span>
                                            </br>
                                            <div class="chat-body1 clearfix">
                                                <p class="testmessagePriver">{{itemMessagePriver.messagePriver}}</p>
                                                <div class="chat_time pull-right">{{itemMessagePriver.date}}</div>
                                            </div>
                                        </li>
            
                                        <li class="left clearfix admin_chat" ng-repeat-end="itemMessagePriver in ListeMessagePriverTab" ng-if="itemMessagePriver.prenom != prenomEnCours && itemConversationPriver._id == itemMessagePriver.idConversationPriver">
                                            <span class="chat-img1 pull-right">
                                                <span class="nommessagePriver"><a href="#!/profil/recherche/{{idMessagePriver}}">{{itemMessagePriver.prenom}} {{itemMessagePriver.nom}}</a></span>
                                                <img src="../images/avatar_defaut.png" alt="User Avatar" class="img-circle">
                                            </span>
                                            </br>
                                            <div class="chat-body1 clearfix">
                                                <p class="testmessagePriver">{{itemMessagePriver.messagePriver}}</p>
                                                <div class="chat_time pull-left">{{itemMessagePriver.date}}</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <!--Ecrire un message-->
                                <div class="message_write">
                                    <textarea ng-model="msg.messagePriver" class="form-control" placeholder="Message..."></textarea>
                                    <div class="clearfix"></div>
                                    <div class="chat_bottom"><a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Add Files</a>
                                        <button class="pull-right btn btn-success" id="{{itemConversationPriver._id}}" ng-click="envoieMessagePriver(itemConversationPriver._id)">Envoyer</button></div>
                                </div>
                            </div>
                        </div>
                        <!--message_section-->
                    </div>
                </div>
            </div>
        </div>



        `

    }
    return directiveDefs

})







































