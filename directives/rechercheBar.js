m.directive('recherchebar', function(){
    var directiveDefs = {
        controller: function($scope, $http, $timeout){

            if(sessionStorage.id){
                // supprime le lien Connexion/Inscription
                $('#menuConnexion').css('display', 'none')
                // ajoute le lien Profil
                $('#menuProfil').prepend('<li id="monProfil"><a href="#!connexion"><i class="fas fa-user"></i> Profil</a></li>')

            }

                // url
                var urlEnLigne = "/search"
                // au clique on recupere la valeur rechercher pour l'affecter au scope
                $scope.selectItem = function(item){
                    $scope.search = item.prenom
                    // supprime la valeur dans le champ
                    $scope.search = "";
                    // supprime la liste afficher
                    $scope.totalItem = "";
                }
                // recherche les valeurs qui correspondes
                $scope.complete = function(string){
                    if(sessionStorage.id){
                        setTimeout(function(){
                            // si la recherche est vide
                            if(string != ''){
                                var output=[];
                                var searchEnCour = {"searchEnCour": string}
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
                                        // Construit le tableau
                                        angular.forEach(httpResponse.data.search,function(item){
                                            itemTotal = {prenom: item.prenom, nom: item.nom, id: item._id}
                                            output.push(itemTotal);
                                        });
                
                                    }
                                })
                                // envoi les resultats dans la liste
                                $scope.totalItem=output;
            
                            }
                            // sinon on vide le tableau des recherches
                            else{
                                $scope.totalItem = ""
                            }
                        }, 500)
                        
                    }
                    // sinon l'utilisateur n'est pas connecter il ne peut pas effectuer de recherche
                    else{
                        $scope.totalItem = [{message: 'connexion requise'}]
                        setTimeout(function(){
                            $scope.totalItem = ""
                        }, 2000)
                        
                    }
                }
                
            

            
           
            

        },
        template: `
        <div class="container">
            <div class="row">
                <div>
                    <form action="" class="search-form">
                        <div class="form-group has-feedback">
                            <label for="search" class="sr-only">Search</label>
                            <input type="text" name="search" id="search" ng-model="search" ng-keydown="complete(search)" class="form-control" placeholder="recherche..." autocomplete="off"/>
                            <ul class="list-group" id="listeGroupeRecherche">
                                <li class="list-group-item" ng-repeat="itemData in totalItem" ng-click="selectItem(itemData)">
                                    <a ng-if="itemData.message">{{itemData.message}}</a>
                                    <a ng-if="itemData.prenom" href="#!/profil/recherche/{{itemData.id}}">{{itemData.prenom}} {{itemData.nom}}</a>
                                </li>
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

