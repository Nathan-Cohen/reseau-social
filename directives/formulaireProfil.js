m.directive('formulaireprofil', function(){
    var directiveDefsformulaireProfil = {
        controller: function($scope, $http){
          // si l'utilisateur est deja connecter on inserer le mail dans la variable mailUtilisateur
          if(sessionStorage.id){
            $scope.nom = ""
            $scope.prenom = ""
            $scope.mail = ""
            $scope.genre = ""
            $scope.age = ""
            $scope.ville = ""
            $scope.pays = ""
            $scope.presentation = ""
            $scope.website = ""

            $scope.recupInfoProfil = function(){
                var infoProfil = {
                    idEnCour: sessionStorage.id,
                    nom: $scope.nom,
                    prenom: $scope.prenom,
                    mail: $scope.mail,
                    genre: $scope.genre,
                    age: $scope.age,
                    ville: $scope.ville,
                    pays: $scope.pays,
                    presentation: $scope.presentation,
                    website: $scope.website

                }

                // transforme en JSON
                var infoProfilJson = angular.toJson(infoProfil, true);

                var urlEnLigne = "/miseAJourProfil"
                // envoie des donnees en POST
                $http({
                    url: urlEnLigne,
                    method: 'POST',
                    data: infoProfilJson
                }).then(function (httpResponse) {

                    if(httpResponse.data.message == 'Erreur'){
                        console.log('Erreur de mise a jour du profil')
                    }
                    else{
                        console.log('mise a jour profil reussi', httpResponse.data)
                        /////////NOTIFICATION///////
                        document.getElementById('notifications').innerHTML = "<div id='notifSuccess' class='notif alert alert-success' role='alert'>Mise a jours du profil réussi !</div>"
                        // affiche la notification de succes d'ajout d'ami
                        // fait disparaitre la div 
                        $("#notifSuccess").fadeOut( 8000, function() {
                            $('#notifSuccess').css('display', 'none');
                        });

                    }
                })

            }
            
          }

        },
        template: 
            `
            <form class="form" role="form">
                <div class="form-group">

                    <div class="col-xs-6">
                        <label for="prenom">
                            <h4>Prénom</h4>
                        </label>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" ng-model="prenom" name="prenom" id="prenom" placeholder="Prenom" title="prenom">
                    </div>
                </div>
                <div class="form-group">

                    <div class="col-xs-6">
                        <label for="nom">
                            <h4>Nom</h4>
                        </label>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" ng-model="nom" name="nom" id="nom" placeholder="Nom" title="Nom">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="genre">
                            <h4>Genre</h4>
                        </label>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                        <select ng-model="genre" name="genre" class="form-control selectpicker" >
                            <option value=" ">Genre</option>
                            <option>Homme</option>
                            <option>Femme</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="age">
                            <h4>Age</h4>
                        </label>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input ng-model="age" name="age" placeholder="Age" class="form-control"  type="text"></input>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="mail">
                            <h4>Email</h4>
                        </label>
                        <span class="input-group-addon"><i class="far fa-envelope"></i></span>
                        <input ng-model="mail" type="mail" class="form-control" name="mail" placeholder="Email" title="mail">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="ville">
                            <h4>Ville</h4>
                        </label>
                        <span class="input-group-addon"><i class="fas fa-city"></i></span>
                        <input ng-model="ville" name="ville" placeholder="Ville" class="form-control"  type="text"></input>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="pays">
                            <h4>Pays</h4>
                        </label>
                        <span class="input-group-addon"><i class="fas fa-globe"></i></span>
                        <input ng-model="pays" name="pays" placeholder="pays" class="form-control"  type="text"></input>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="presentation">
                            <h4>Site web</h4>
                        </label>
                        <span class="input-group-addon"><i class="fas fa-align-center"></i></span>
                        <input ng-model="website" name="website" placeholder="Site web" class="form-control"  type="text"></input>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-6">
                        <label for="presentation">
                            <h4>Présentation</h4>
                        </label>
                        <span class="input-group-addon"><i class="fas fa-align-center"></i></span>
                        <input ng-model="presentation" name="presentation" placeholder="Presentation" class="form-control"  type="text"></input>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-12">
                        <br>
                        <button class="btn btn-lg btn-success" ng-click="recupInfoProfil()" type="submit"></i> Sauvegarder</button>
                    </div>
                </div>
            </form>


            `

    }
    return directiveDefsformulaireProfil

})



