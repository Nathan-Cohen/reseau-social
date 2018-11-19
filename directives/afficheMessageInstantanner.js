m.directive('affichemessageinstantanner', function(){
    var directiveAfficheMessageInstantanerDef = {
        controller: function($scope, $http){
            // si l'utilisateur est connecter
            if(sessionStorage.id){
                $scope.buttonActiveMessageInstantanner = {booleanDemande: 'true', booleanReponse: 'true', booleanDemandeur: 'true'};

                $scope.prenomEnCours = sessionStorage.prenom
                $scope.prenomMessageInstantanner = ''
                $scope.nomMessageInstantanner = ''
                $scope.msg = {messageInstantanner: ''}

                $scope.scrollBarEnBas = function(){
                    console.log('element height', document.getElementById('bodyMessageInstantanner').scrollHeight)
                    document.getElementById('bodyMessageInstantanner').scrollTop = document.getElementById('bodyMessageInstantanner').scrollHeight;
                    console.log('element top', document.getElementById('bodyMessageInstantanner').scrollTop)
                }
                // $scope.scrollBarEnBas()

                // selection l'ami pour voir la conversation
                $scope.choixAmiMessageInstantanner = function(item){
                    // si le message de reload n'existe pas on ne vide pas la table des messages 
                    if(!item.messageReload){
                        $scope.ListeMessageInstantannerTab = []
                    }

                    // enregitre les valeurs pour raffraichir la liste si on envoie un message
                    $scope.itemReload = item
                    // envoie les valeurs dans les div correspondante
                    $scope.prenomMessageInstantanner = item.prenom
                    $scope.nomMessageInstantanner = item.nom
                    $scope.idMessageInstantanner = item._id
                    // l'objet envoyer au server
                    afficheMessageInstantannerObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: item._id,
                        prenomMessageInstantanner: $scope.prenomMessageInstantanner,
                        nomMessageInstantanner: $scope.nomMessageInstantanner
                    }
                    // transforme l'objet en json
                    var afficheMessageInstanntanerObjJson = angular.toJson(afficheMessageInstantannerObj, true);
                    // url
                    var urlEnLigne = "/affichemessageinstantanner"
                    // envoie des donnees en POST pour recuperer le nombre de publication
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: afficheMessageInstanntanerObjJson
                    }).then(function (httpResponse) {             
                        // si il n'y a pas de message
                        if(httpResponse.data.message == 'pas de message'){
                            setTimeout(function(){
                                $scope.itemReload.messageReload = "true"
                                $scope.choixAmiMessageInstantanner($scope.itemReload)
                            }, 5000)
                            $scope.buttonActiveMessageInstantanner.booleanDemande = 'true';
                        }
                        // si un message d'erreur est envoyer par le serveur
                        else if(httpResponse.data.message && httpResponse.data.message != 'pas de message'){
                            console.log('Echec de la recuperation du nombre de publication', httpResponse.data.message)
                        }
                        else{
                            // si la demande de conversation est en cours
                            if(httpResponse.data.listeMessageInstantanner[0].demande == "en cours"){
                                $scope.buttonActiveMessageInstantanner.booleanDemande = 'false';
                                $scope.buttonActiveMessageInstantanner.booleanReponse = 'true';
                                console.log('liste des messages', httpResponse.data.listeMessageInstantanner[0].demande)
                            }
                            else if(httpResponse.data.listeMessageInstantanner[0].demande == "demandeur"){
                                console.log('testtttttt3', httpResponse.data.listeMessageInstantanner)
                                $scope.buttonActiveMessageInstantanner.booleanDemande = 'false';
                                $scope.buttonActiveMessageInstantanner.booleanReponse = 'false';
                                $scope.buttonActiveMessageInstantanner.booleanDemandeur = 'true';
                                
                            }
                            // sinon on affiche les messages
                            else if(httpResponse.data.listeMessageInstantanner[0].demande == "accepter"){
                                $scope.buttonActiveMessageInstantanner.booleanReponse = "true"
                                $scope.buttonActiveMessageInstantanner.booleanDemande = 'false';
                                $scope.buttonActiveMessageInstantanner.booleanDemandeur == 'false'
                                $scope.ListeMessageInstantannerTab = httpResponse.data.listeMessageInstantanner
                                $scope.nbListeMessageInstantannerTab = httpResponse.data.listeMessageInstantanner.length
                            }
                            // recharge la listes des messages
                            setTimeout(function(){
                                $scope.itemReload.messageReload = "true"
                                $scope.choixAmiMessageInstantanner($scope.itemReload)
                            }, 5000)
                            

                        }
                    })
                    

                }


                $scope.envoieDemandeMessageInstantanner = function(idAmi){
                    envoieDemandeMessageInstantannerObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: idAmi,
                        demandeMessage: "en cours",
                        prenomMessageInstantanner: sessionStorage.prenom,
                        nomMessageInstantanner: sessionStorage.nom
                    }
                    var routeJsonData = angular.toJson(envoieDemandeMessageInstantannerObj, true);
                    console.log('demande', envoieDemandeMessageInstantannerObj)
                    
                    // url
                    var urlEnLigne = "/envoiedemandemessageinstantanner"
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
                            $scope.buttonActiveMessageInstantanner.booleanDemande = 'false';

                            // raffraichie la liste des messages envoiemessageinstantanner
                            $scope.itemReload.messageReload = "true"
                            $scope.choixAmiMessageInstantanner($scope.itemReload);
                        }
                    })


                }


                $scope.envoieReponseDemandeMessageInstantanner = function(idAmi){
                    envoieReponseDemandeMessageInstantannerObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: idAmi,
                        demandeMessage: "accepter",
                        prenomMessageInstantanner: sessionStorage.prenom,
                        nomMessageInstantanner: sessionStorage.nom
                    }
                    var routeJsonData = angular.toJson(envoieReponseDemandeMessageInstantannerObj, true);
                    console.log('reponse demande', envoieReponseDemandeMessageInstantannerObj)
                    
                    // url
                    var urlEnLigne = "/envoiereponsedemandemessageinstantanner"
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
                            // raffraichie la liste des messages envoiemessageinstantanner
                            $scope.itemReload.messageReload = "true"
                            $scope.choixAmiMessageInstantanner($scope.itemReload);
                        }
                    })


                }


                // envoie un message a l'ami selectionner
                $scope.envoieMessageInstantanner = function(idAmi){
                    envoieMessageInstantannerObj = {
                        idEnCour: sessionStorage.id,
                        idAmi: idAmi,
                        messageInstantanner: $scope.msg.messageInstantanner,
                        prenomMessageInstantanner: sessionStorage.prenom,
                        nomMessageInstantanner: sessionStorage.nom
                    }

                    var routeJsonData = angular.toJson(envoieMessageInstantannerObj, true);
                    // url
                    var urlEnLigne = "/envoiemessageinstantanner"
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
                            $scope.msg.messageInstantanner = "";
                            // raffraichie la liste des messages envoiemessageinstantanner
                            $scope.itemReload.messageReload = "true"
                            $scope.choixAmiMessageInstantanner($scope.itemReload);
                        }
                    })
                    
                }

                // function qui verifie toute les 5s si un nouveau message a ete poster
                $scope.notifMessageInstantanner = function(){
                    envoieMessageInstantannerObj = {
                        idEnCour: sessionStorage.id
                    }
                    $scope.tabNotifMessageInstantanner = []
                     // url
                     var urlEnLigne = "/affichenotifmessageinstantanner"
                     // envoie des donnees en POST pour recuperer le nombre de message
                     $http({
                         url: urlEnLigne,
                         method: 'POST',
                         data: envoieMessageInstantannerObj
                     }).then(function (httpResponse) {             
                         // si un message d'erreur est envoyer par le serveur
                         if(httpResponse.data.message == 'pas de message'){
                             
                         }
                         else if(httpResponse.data.message && httpResponse.data.message != 'pas de message'){
                             console.log('Echec de la recuperation du nombre de message', httpResponse.data.message)
                         }
                         else{
                             if(httpResponse.data.listeMessageInstantanner){
                                 for(var i=0; i<httpResponse.data.listeMessageInstantanner.length; i++){
                                     if(httpResponse.data.listeMessageInstantanner[i].vu == 'faux'){
                                         $scope.tabNotifMessageInstantanner.push(httpResponse.data.listeMessageInstantanner[i])
                                     }
                                 }
                                 $scope.previewMessageInstantanner = $scope.tabNotifMessageInstantanner.length

                             }
                            setTimeout(function(){
                                $scope.notifMessageInstantanner()
                            }, 5000)
                         }
                     })

                }

                $scope.notifMessageInstantanner()

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
                                <div ng-click="choixAmiMessageInstantanner(item)" class="chat-body clearfix">
                                    <div class="header_sec">
                                        <strong class="primary-font">{{item.prenom}} {{item.nom}}</strong>
                                    </div>
                                    <div class="contact_sec">
                                            <span class="badge pull-right" ng-if="tabNotifMessageInstantanner[tabNotifMessageInstantanner.length-1].prenom == item.prenom">message en attente</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--chat_sidebar-->


            <div class="col-sm-9 message_section" id="bodyMessageInstantanner" ng-if="prenomMessageInstantanner">
                <div class="row">
                    <div class="new_message_head">
                        <div class="pull-left"><button><i class="fa fa-plus-square-o" aria-hidden="true"></i>{{prenomMessageInstantanner}} {{nomMessageInstantanner}}</button></div>
                        <div class="pull-right">
                            <div class="dropdown">
                                {{nbListeMessageInstantannerTab}} messages
                            </div>
                        </div>
                    </div>
                    <!--new_message_head-->

                    <div class="chat_area">
                        <ul class="list-unstyled">
                        
                            <li class="left clearfix" ng-repeat-start="itemMessageInstantanner in ListeMessageInstantannerTab" ng-if="itemMessageInstantanner.prenom == prenomEnCours">
                                <span class="chat-img1 pull-left">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <span class="nomMessageInstantanner pull-left">{{itemMessageInstantanner.prenom}} {{itemMessageInstantanner.nom}}</span>
                                <div class="chat-body1 clearfix">
                                    <p>{{itemMessageInstantanner.messageInstantanner}}</p>
                                    <div class="chat_time pull-right">{{itemMessageInstantanner.date}}</div>
                                </div>
                            </li>

                            <li class="left clearfix admin_chat" ng-repeat-end="itemMessageInstantanner in ListeMessageInstantannerTab" ng-if="itemMessageInstantanner.prenom != prenomEnCours">
                                <span class="chat-img1 pull-right">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <span class="nomMessageInstantanner pull-right">{{itemMessageInstantanner.prenom}} {{itemMessageInstantanner.nom}}</span>
                                <div class="chat-body1 clearfix">
                                    <p>{{itemMessageInstantanner.messageInstantanner}}</p>
                                    <div class="chat_time pull-left">{{itemMessageInstantanner.date}}</div>
                                </div>
                            </li>


                        </ul>
                    </div>
                    <!--chat_area-->
                    <div class="message_write" ng-if="buttonActiveMessageInstantanner.booleanDemande == 'true'">
                        <button class="btn btn-success col-sm-12" id="{{idMessageInstantanner}}" ng-click="envoieDemandeMessageInstantanner(idMessageInstantanner)" >Demande de conversation</button></div>
                    </div>
                    <div class="message_write" ng-if="buttonActiveMessageInstantanner.booleanDemande == 'false' && buttonActiveMessageInstantanner.booleanReponse == 'false' && buttonActiveMessageInstantanner.booleanDemandeur == 'true'">
                        <button class="btn col-sm-12" id="{{idMessageInstantanner}}" >En attente de la reponse</button></div>
                    </div>
                    <div class="message_write" ng-if="buttonActiveMessageInstantanner.booleanDemande == 'false' && buttonActiveMessageInstantanner.booleanReponse == 'true'">
                        <button class="btn btn-success col-sm-12" id="{{idMessageInstantanner}}" ng-click="envoieReponseDemandeMessageInstantanner(idMessageInstantanner)" >Accepter la demande</button></div>
                    </div>
                    <div class="message_write" ng-if="buttonActiveMessageInstantanner.booleanDemande == 'false' && buttonActiveMessageInstantanner.booleanReponse == 'false' && buttonActiveMessageInstantanner.booleanDemandeur == 'false'">
                        <textarea ng-model="msg.messageInstantanner" class="form-control" placeholder="Message..."></textarea>
                        <div class="clearfix"></div>
                        <div class="chat_bottom"><a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Add Files</a>
                            <button class="pull-right btn btn-success" id="{{idMessageInstantanner}}" ng-click="envoieMessageInstantanner(idMessageInstantanner)" >Envoyer</button></div>
                    </div>
                </div>
            </div>
            <!--message_section-->
        </div>
        `

    }
    return directiveAfficheMessageInstantanerDef

})

