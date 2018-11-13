m.directive('recherchebarami', function(){
    var directiveRechercheBarAmiDefs = {
        controller: function($scope, $http, $timeout){
            // si l'utilisateur est connecter
            if(sessionStorage.id){
                
            }
            // url
            var urlEnLigne = "/searchami"
            // au clique on recupere la valeur rechercher pour l'affecter au scope
            $scope.selectItem = function(item){
                console.log('clique sur item', item)
                $scope.searchami = item.prenom
                
                // supprime la valeur dans le champ
                $scope.searchami = "";
                // supprime la liste afficher
                $scope.totalSearchItem = "";
            }
            // recherche les valeurs qui correspondes
            $scope.complete = function(string){
                // si la recherche est vide
                if(string != ''){
                    var output=[];
                    var searchEnCour = {"searchEnCour": string, idEnCour: sessionStorage.id}
                    // envoie des donnees en POST            
                    $http({
                        url: urlEnLigne,
                        method: 'POST',
                        data: searchEnCour
                    }).then(function (httpResponse) {
                        console.log('httpResponse.data listeSearchAmi', httpResponse.data.listeSearchAmi)
                        // si le message de retour est 'Aucun resultat'
                        if(httpResponse.data.listeSearchAmi == 'Aucun resultat'){
                            output.push('Aucun resultat');
                        }
                        // sinon il y a un resultat
                        else{
                            // Construit le tableau
                            angular.forEach(httpResponse.data.listeSearchAmi,function(item){
                                itemSearchTotal = {prenom: item.prenom, nom: item.nom, id: item._id}
                                output.push(itemSearchTotal);
                            });
    
                        }
                    })
                    // envoi les resultats dans la liste
                    $scope.totalSearchItem=output;

                }
                // sinon on vide le tableau des recherches
                else{
                    $scope.totalSearchItem = ''
                }
            }

        },
        template: `
            <form action="" class="search-form">
                <div class="form-group has-feedback">
                    <label for="searchami" class="sr-only">Search</label>
                    <input type="text" name="searchami" id="searchami" ng-model="searchami" ng-keyup="complete(searchami)" class="form-control" placeholder="recherche..." autocomplete="off"/>
                    <ul class="list-group" id="listeGroupeRecherche">
                        <li class="list-group-item" ng-repeat="itemData in totalSearchItem" ng-click="selectItem(itemData)"><a id="{{itemData.id}}">{{itemData.prenom}} {{itemData.nom}}</a></li>
                    </ul>
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </form>
        `

    }
    return directiveRechercheBarAmiDefs

})

