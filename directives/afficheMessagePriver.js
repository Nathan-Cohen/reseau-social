m.directive('affichemessagepriver', function(){
    var directiveAfficheMessagePriverDef = {
        controller: function($scope, $http){
            // si l'utilisateur est connecter
            if(sessionStorage.id){
                $scope.prenomtest = sessionStorage.prenom
                $scope.prenomMessagePriver = ''
                $scope.nomMessagePriver = ''
                $scope.messagePriver = ''
                // selection l'ami pour voir la conversation
                $scope.choixAmiMessagePriver = function(item){
                    // enregitre les valeurs pour raffraichir la liste si on envoie un message
                    $scope.itemReload = item
                    // envoie les valeurs dans les div correspondante
                    $scope.prenomMessagePriver = item.prenom
                    $scope.nomMessagePriver = item.nom
                    $scope.idMessagePriver = item._id
                    // l'objet envoyer au server
                    afficheMessagePriverObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: item._id,
                        prenomMessagePriver: $scope.prenomMessagePriver,
                        nomMessagePriver: $scope.nomMessagePriver
                    }
                    // transforme l'objet en json
                    var afficheMessagePriverObjJson = angular.toJson(afficheMessagePriverObj, true);
                    // url
                    var urlEnLigne = "/affichemessagepriver"
                    // envoie des donnees en POST pour recuperer le nombre de publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: afficheMessagePriverObjJson
                    }).then(function (httpResponse) {             
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == 'pas de message'){
                            setTimeout(function(){
                                $scope.choixAmiMessagePriver($scope.itemReload)
                            }, 5000)
                        }
                        else if(httpResponse.data.message && httpResponse.data.message != 'pas de message'){
                            console.log('Echec de la recuperation du nombre de publication', httpResponse.data.message)
                        }
                        else{
                    $scope.ListeMessagePriverTab = []
                            $scope.ListeMessagePriverTab = httpResponse.data.listeMessagePriver
                            setTimeout(function(){
                                $scope.choixAmiMessagePriver($scope.itemReload)
                            }, 5000)
                        }
                    })
                    

                }
                // envoie un message a l'ami selectionner
                $scope.envoieMessagePriver = function(idAmi){
                    envoieMessagePriverObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: idAmi,
                        messagePriver: $scope.messagePriver,
                        prenomMessagePriver: sessionStorage.prenom,
                        nomMessagePriver: sessionStorage.nom
                    }

                    var routeJsonData = angular.toJson(envoieMessagePriverObj, true);
                    // url
                    var urlEnLigne = "/envoiemessagepriver"
                    // envoie des donnees en POST pour recuperer le nombre de publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: routeJsonData
                    }).then(function (httpResponse) {             
                        // si un message d'erreur est envoyer par le serveur
                        if(httpResponse.data.message == "Erreur"){
                            console.log('Echec de la recuperation du nombre de publication')
                        }
                        else{
                            // vide le champ
                            $scope.messagePriver = "";
                            // raffraichie la liste des messages priver
                            $scope.choixAmiMessagePriver($scope.itemReload);
                        }
                    })
                    
                }

                // function qui verifie toute les 5s si un nouveau message a ete poster
                $scope.notifMessagePriver = function(){
                    envoieMessagePriverObj = {
                        idEnCour: sessionStorage.id
                    }
                    $scope.tabNotifMessagePriver = []
                     // url
                     var urlEnLigne = "/affichenotifmessagepriver"
                     // envoie des donnees en POST pour recuperer le nombre de publication
                     $http({
                         url: urlEnLigne,
                         method: 'POST',
                         data: envoieMessagePriverObj
                     }).then(function (httpResponse) {             
                         // si un message d'erreur est envoyer par le serveur
                         if(httpResponse.data.message == 'pas de message'){
                             
                         }
                         else if(httpResponse.data.message && httpResponse.data.message != 'pas de message'){
                             console.log('Echec de la recuperation du nombre de publication', httpResponse.data.message)
                         }
                         else{
                             if(httpResponse.data.listeMessagePriver){
                                 for(var i=0; i<httpResponse.data.listeMessagePriver.length; i++){
                                     if(httpResponse.data.listeMessagePriver[i].vu == 'faux'){
                                         $scope.tabNotifMessagePriver.push(httpResponse.data.listeMessagePriver[i])
                                     }
                                 }
                                 $scope.previewMessagePriver = $scope.tabNotifMessagePriver.length

                             }
                            setTimeout(function(){
                                $scope.notifMessagePriver()
                            }, 5000)
                         }
                     })

                }

                $scope.notifMessagePriver()

            }
        },
        template: `
        <div class="chat_container">
            <div class="col-sm-3 chat_sidebar">
                <div class="row">
                    <div class="member_list">
                        <ul class="list-unstyled">
                            <li class="left clearfix" ng-repeat="item in itemListeAmi">
                                <span class="chat-img pull-left">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <div ng-click="choixAmiMessagePriver(item)" class="chat-body clearfix">
                                    <div class="header_sec">
                                        <strong class="primary-font">{{item.prenom}} {{item.nom}}</strong>
                                    </div>
                                    <div class="contact_sec">
                                            <span class="badge pull-right" ng-if="tabNotifMessagePriver[tabNotifMessagePriver.length-1].prenom == item.prenom">message en attente</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--chat_sidebar-->


            <div class="col-sm-9 message_section">
                <div class="row">
                    <div class="new_message_head">
                        <div class="pull-left"><button><i class="fa fa-plus-square-o" aria-hidden="true"></i> {{prenomMessagePriver}} {{nomMessagePriver}}</button></div>
                        <div class="pull-right">
                            <div class="dropdown">
                                nombre de messages
                            </div>
                        </div>
                    </div>
                    <!--new_message_head-->

                    <div class="chat_area">
                        <ul class="list-unstyled">
                        
                            <li class="left clearfix" ng-repeat-start="itemMessagePriver in ListeMessagePriverTab" ng-if="itemMessagePriver.prenom == prenomtest">
                                <span class="chat-img1 pull-left">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <span class="nomMessagePriver pull-left">{{itemMessagePriver.prenom}} {{itemMessagePriver.nom}}</span>
                                <div class="chat-body1 clearfix">
                                    <p>{{itemMessagePriver.messagePriver}}</p>
                                    <div class="chat_time pull-right">{{itemMessagePriver.date}}</div>
                                </div>
                            </li>

                            <li class="left clearfix admin_chat" ng-repeat-end="itemMessagePriver in ListeMessagePriverTab" ng-if="itemMessagePriver.prenom != prenomtest">
                                <span class="chat-img1 pull-right">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <span class="nomMessagePriver pull-right">{{itemMessagePriver.prenom}} {{itemMessagePriver.nom}}</span>
                                <div class="chat-body1 clearfix">
                                    <p>{{itemMessagePriver.messagePriver}}</p>
                                    <div class="chat_time pull-left">{{itemMessagePriver.date}}</div>
                                </div>
                            </li>


                        </ul>
                    </div>
                    <!--chat_area-->
                    <div class="message_write">
                        <textarea ng-model="messagePriver" class="form-control" placeholder="Message..."></textarea>
                        <div class="clearfix"></div>
                        <div class="chat_bottom"><a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Add Files</a>
                            <button class="pull-right btn btn-success" id="{{idMessagePriver}}" ng-click="envoieMessagePriver(idMessagePriver)" >Envoyer</button></div>
                    </div>
                </div>
            </div>
            <!--message_section-->
        </div>
        `

    }
    return directiveAfficheMessagePriverDef

})

