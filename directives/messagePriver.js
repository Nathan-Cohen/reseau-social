m.directive('messagepriver', function(){
    var directiveDefs = {
        controller: function($scope, $http){

            if(sessionStorage.id){
                
            }

        },
        template: `
                <div class="chat_container">
                    <div class="col-sm-8 chat_sidebar">
                        <div class="row">
                            <div id="creationConversationPriver">
                                <div class="input-group col-md-12">
                                    <input type="text" class="search-query form-control" placeholder="Sujet de discussion" />
                                    <button class="btn btn-info" ng-click="envoieMessageInstantanner()" type="button">
                                        <span class="far fa-thumbs-up"></span> Choisir les invités
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>         
                    
        `

    }
    return directiveDefs

})







































