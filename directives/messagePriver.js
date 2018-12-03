m.directive('messagepriver', function(){
    var directiveDefs = {
        controller: function($scope, $http){
            $scope.inputSujetMessagePriver = '';

            if(sessionStorage.id){
                $scope.btnSujetMessagePriver = function(){
                    console.log('$scope.inputSujetMessagePriver', $scope.inputSujetMessagePriver)
                    
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
                                    <tr id="item{{item._id}}" ng-repeat="item in itemListeAmiCopie" ng-if="item._id != itemIdSelectionner">
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.prenom}}</a>
                                        </td>
                                        <td>
                                            <a href="#!/profil/recherche/{{item._id}}">{{item.nom}}</a>
                                        </td>
                                        <td>{{item.mail}}</td>
                                        <td class="text-center">
                                            <a id="{{item._id}}" class="btn btn-info btn-xs" ng-click="recommander($event, item.nom, item.prenom, item.mail)" data-toggle="modal" data-target="#recommandationModal">Recommander</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `

    }
    return directiveDefs

})







































