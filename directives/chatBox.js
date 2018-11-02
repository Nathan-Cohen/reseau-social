m.directive('chatbox', function(){
    var directiveDef = {
        controller: function($scope){
            // verifie si l'utilisateur est bien connecter
            if(sessionStorage.id){
                $scope.afficheChatBox = true
            }

        },
        template: `
            <div class="col-md-5" id="chatbox" ng-if="afficheChatBox" ng-controller="chatBoxCtrl">
                <div class="panel panel-primary" id="barChatbox">

                    <div class="panel-collapse collapse" id="collapseOne">
                        <div class="panel-chatbox">
                            <ul class="chat" id="containerChat">
                                <li ng-repeat="itemMessage in tabDesMessages" class="left clearfix chatBoxMessageListe">
                                    <span class="chat-img pull-left">
                                        <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">{{itemMessage.prenom}} {{itemMessage.nom}}</strong> <small class="pull-right text-muted">
                                                <span class="glyphicon glyphicon-time"></span>Times</small>
                                        </div>
                                        <p>
                                            {{itemMessage.message}}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="panel-footer">
                            <div class="input-group">
                                <input name="msgBox" ng-model="msgbox" ng-keydown="keydown()" type="text" class="form-control input-sm" placeholder="Tapez votre message..." />
                                <span class="input-group-btn">
                                    <button ng-click="envoieMessage()" class="btn btn-warning btn-sm" id="btn-chat">
                                        Send
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-heading" id="accordion">
                        <div class="btn-group" id="groupeBouton">
                            <a id="boutonAfficheChatBox" type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="!#collapseOne">
                                <div>
                                    <span class="glyphicon glyphicon-comment"></span> Chat
                                </div>
                                <span class="glyphicon glyphicon-chevron-up" id="chevronChatBox"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `

    }
    return directiveDef

})

