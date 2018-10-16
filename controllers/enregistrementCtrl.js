m.controller('enregistrementCtrl', function($scope, $location, $http){
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
        nouveauUtilisateur = {
            pseudonyme: $scope.pseudonyme,
            nom: $scope.nom,
            prenom: $scope.prenom,
            mpd: $scope.mdp,
            mail: $scope.mail,
            genre: $scope.genre,
            age: $scope.age,
            ville: $scope.ville,
            pays: $scope.pays,
            photo: $scope.photo,
            presentation: $scope.presentation,
            website: $scope.website
        }
        var postData = angular.toJson(nouveauUtilisateur, true);
        // envoie des donnees en POST
        $http({
            url: 'http://127.0.0.1:7007/enregistrement',
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            console.log('response:', httpResponse);
        })

        console.log('nouveauUtilisateur', nouveauUtilisateur)
    }


})