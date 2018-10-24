m.directive('recherchebar', function(){
    var directiveDefs = {
        controller: function($scope, $http){

            var urlLocal = "http://127.0.0.1:5000/search"
            var urlEnLigne = "/search"
            
            $scope.selectItem = function(item){
                $scope.search = item
            }

            $scope.complete = function(string){
                var output=[];
                var searchEnCour = {"message": string}
                // envoie des donnees en POST            
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: searchEnCour
                }).then(function (httpResponse) {
                    console.log('httpResponse.data search', httpResponse.data)
                    // si le message de retour est 'Aucun resultat'
                    if(httpResponse.data.search == 'Aucun resultat'){
                        output.push('Aucun resultat');
                    }
                    // sinon il y a un resultat
                    else{
                        console.log('search success', httpResponse.data.search[0].nom)
                        // Construit le tableau
                        output.push(httpResponse.data.search[0].nom);
                        // angular.forEach(httpResponse.data.search,function(item){
                        //     if(item.toLowerCase().indexOf(string.toLowerCase())>=0){
                        //         output.push(item);
                        //     }
                        // });

                    }
                })
                
                $scope.totalItem=output;
            }

        },
        template: `
        <div class="container">
            <div class="row">
                <div>
                    <form action="" class="search-form">
                        <div class="form-group has-feedback">
                            <label for="search" class="sr-only">Search</label>
                            <input type="text" name="search" id="search" ng-model="search" ng-keyup="complete(search)" class="form-control" placeholder="search" autocomplete="off"/>
                            <ul class="list-group">
                                <li class="list-group-item" ng-repeat="itemData in totalItem" ng-click="selectItem(itemData)">{{itemData}}</li>
                            </ul>
                            <span class="glyphicon glyphicon-search form-control-feedback"></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `

    }
    return directiveDefs

})

