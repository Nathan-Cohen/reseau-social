m.directive('messageinstantanner', function(){
    var directiveDefs = {
        controller: function($scope, $http){

            if(sessionStorage.id){
                
            }

        },
        template: `
        <div class="main_section">
            <div class="container">
                <div class="chat_container">
                    <div class="col-sm-3 chat_sidebar">
                        <div class="row">
                            <div id="custom-search-input">
                                <div class="input-group col-md-12">
                                    <input type="text" class="  search-query form-control" placeholder="Conversation" />
                                    <button class="btn btn-danger" type="button">
                                        <span class=" glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                            </div>
                            <div class="member_list">
                                <ul class="list-unstyled">
                                    <li class="left clearfix">
                                        <span class="chat-img pull-left">
                                            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Avatar" class="img-circle">
                                        </span>
                                        <div class="chat-body clearfix">
                                            <div class="header_sec">
                                                <strong class="primary-font">Jack Sparrow</strong> <strong class="pull-right">
                                                    09:45AM</strong>
                                            </div>
                                            <div class="contact_sec">
                                                    <span class="badge pull-right">3</span>
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
                                <div class="pull-left"><button><i class="fa fa-plus-square-o" aria-hidden="true"></i> PRENOM NOM</button></div>
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
            </div>
        </div>
        `

    }
    return directiveDefs

})







































