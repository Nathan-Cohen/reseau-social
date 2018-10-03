m.controller('enregistrementCtrl', function($scope, $location){
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

        // emit de l'objet ver le server et enregistrement dans la base
        // socket.emit('enregistrement', nouveauUtilisateur)

        // socket.on('reponseEnregistement', function(data){
        //     $location.path("/accueil");
        // })
        console.log('nouveauUtilisateur', nouveauUtilisateur)
    }


})