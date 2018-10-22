m.controller('enregistrementCtrl', function($scope, $http){
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
        // envoie des donnees en POST
        $http({
            url: 'https://reseausocial.herokuapp.com:5000/enregistrement',
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            console.log('response:', httpResponse);
        })

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