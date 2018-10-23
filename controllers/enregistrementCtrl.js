m.controller('enregistrementCtrl', function($scope, $http, $location, connectionFactorie){
    $scope.messagetest = "Parti enregistrement"
    $scope.pseudonyme = ""
    $scope.nom = ""
    $scope.prenom = ""
    $scope.mdp = ""
    $scope.mail = ""
    $scope.genre = ""
    $scope.age = ""
    $scope.ville = ""
    $scope.pays = ""
    $scope.photo = ""
    $scope.presentation = ""
    $scope.website = ""

    // a l'envoie du formulaire on execute la function "funcEnregistrement"
    $scope.funcEnregistrement = ()=>{
        // construit l'objet
        nouveauUtilisateur = {
            pseudonyme: $scope.pseudonyme,
            nom: $scope.nom,
            prenom: $scope.prenom,
            mdp: $scope.mdp,
            mail: $scope.mail,
            genre: $scope.genre,
            age: $scope.age,
            ville: $scope.ville,
            pays: $scope.pays,
            photo: $scope.photo,
            presentation: $scope.presentation,
            website: $scope.website
        }
        // transforme en JSON
        var postData = angular.toJson(nouveauUtilisateur, true);

        var urlLocal = "http://127.0.0.1:5000/enregistrement"
        var urlEnLigne = "http://reseausocial.herokuapp.com/enregistrement"
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            console.log('response enregistrement:', httpResponse);
            if(httpResponse.data.message == 'Erreur'){
                document.getElementById('reponseEnregistrementErreur').style.display = 'table'
            }
            else if(httpResponse.data.message == 'Adresse mail déjà enregistrer'){
                document.getElementById('reponseEnregistrement').style.display = 'table'
            }
            else{
                // envoie l'information dans la factorie "connection" pour les recuperer dans la page profil
                $scope.send = function(){
                    connectionFactorie.sendData(nouveauUtilisateur);
                };
                $scope.send()
                // change l'url
                $location.path('/profil/' + httpResponse.data.prenom)
                console.log('httpResponse.data', httpResponse.data)
                // enregistre le mail et le mot de passe en local
                localStorage.setItem('mail', httpResponse.data.mail)
                localStorage.setItem('mdp', httpResponse.data.mdp)
                localStorage.setItem('prenom', httpResponse.data.prenom)
                // Supprime les valeurs dans les champs
                $scope.pseudonyme = ""
                $scope.nom = ""
                $scope.prenom = ""
                $scope.mdp = ""
                $scope.mail = ""
                $scope.genre = ""
                $scope.age = ""
                $scope.ville = ""
                $scope.pays = ""
                $scope.photo = ""
                $scope.presentation = ""
                $scope.website = ""

            }
        })

    }


})