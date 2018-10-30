m.directive('chatbox', function(){
    var directiveDef = {
        controller: function($scope){
            // verifie si l'utilisateur est bien connecter
            if(sessionStorage.id){
                $scope.testAfficheChatBot = true
            }

        },
        template: `
            <div class="col-md-5" id="chatbox" ng-if="testAfficheChatBot" ng-controller="chatBoxCtrl">
                <div class="panel panel-primary" id="barChatbox">

                    <div class="panel-collapse collapse" id="collapseOne">
                        <div class="panel-chatbox">
                            <ul class="chat">
                                <li class="right clearfix"><span class="chat-img pull-right">
                                        <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>Times</small>
                                            <strong class="pull-right primary-font">Bhaumik Patel</strong>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                            dolor, quis ullamcorper ligula sodales.
                                        </p>
                                    </div>
                                </li>
                                <li ng-repeat="itemMessage in tabDesMessages" class="left clearfix"><span class="chat-img pull-left">
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
                                <input name="msgBox" ng-model="msgbox" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button ng-click="envoieMessage()" class="btn btn-warning btn-sm" id="btn-chat">
                                        Send
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-heading" id="accordion">
                        <span class="glyphicon glyphicon-comment"></span> Chat
                        <div class="btn-group pull-right">
                            <a type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="!#collapseOne">
                                <span class="glyphicon glyphicon-chevron-up"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `

    }
    return directiveDef

})

