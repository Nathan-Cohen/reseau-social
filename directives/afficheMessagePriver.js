m.directive('affichemessagepriver', function(){
    var directiveAfficheMessagePriverDef = {
        controller: function($scope){
            // si l'utilisateur est connecter
            if(sessionStorage.id){
                $scope.prenomMessagePriver = ''
                $scope.nomMessagePriver = ''
                $scope.choixAmiMessagePriver = function(item){
                    $scope.prenomMessagePriver = item.prenom
                    $scope.nomMessagePriver = item.nom

                }
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
                                            <span class="badge pull-right">Nombre de message</span>
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
                                NOMBRE DE MESSAGE
                            </div>
                        </div>
                    </div>
                    <!--new_message_head-->

                    <div class="chat_area">
                        <ul class="list-unstyled">
                            <li class="left clearfix">
                                <span class="chat-img1 pull-left">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <div class="chat-body1 clearfix">
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                                    <div class="chat_time pull-right">09:40PM</div>
                                </div>
                            </li>
                            <li class="left clearfix admin_chat">
                                <span class="chat-img1 pull-right">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                </span>
                                <div class="chat-body1 clearfix">
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                                    <div class="chat_time pull-left">09:40PM</div>
                                </div>
                            </li>


                        </ul>
                    </div>
                    <!--chat_area-->
                    <div class="message_write">
                        <textarea class="form-control" placeholder="type a message"></textarea>
                        <div class="clearfix"></div>
                        <div class="chat_bottom"><a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                Add Files</a>
                            <a href="#" class="pull-right btn btn-success">
                                Send</a></div>
                    </div>
                </div>
            </div>
            <!--message_section-->
        </div>
        `

    }
    return directiveAfficheMessagePriverDef

})

