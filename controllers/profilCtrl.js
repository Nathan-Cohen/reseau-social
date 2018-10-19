m.controller('profilCtrl', function($scope, $http, connectionFactorie){
    // recupere l'adresse mail a la connexion ou a l'enregistrement
    var utilisateur = connectionFactorie.getData();

    $scope.rechercheProfil = ()=>{
        // construit l'objet
        utilisateurConnecter = {
            mail: utilisateur.mail
        }

        // transforme en JSON
        var postData = angular.toJson(utilisateurConnecter, true);

        // envoie des donnees en POST
        $http({
            url: 'http://127.0.0.1:7008/profil',
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message){
                console.log('Echec de la recuperation du profil')
            }
            // sinon les donnees sont envoyer par le serveur
            else if(httpResponse.data.profilUtilisateur.mail){
                console.log('Recuperation profil reussi', httpResponse.data.profilUtilisateur)
                $scope.prenomNom = httpResponse.data.profilUtilisateur.prenom + ' ' + httpResponse.data.profilUtilisateur.nom
                $scope.prenom = httpResponse.data.profilUtilisateur.prenom
                $scope.nom = httpResponse.data.profilUtilisateur.nom
                $scope.mail = httpResponse.data.profilUtilisateur.mail
                $scope.genre = httpResponse.data.profilUtilisateur.genre
                $scope.ville = httpResponse.data.profilUtilisateur.ville
                $scope.pays = httpResponse.data.profilUtilisateur.pays
                $scope.age = httpResponse.data.profilUtilisateur.age
                $scope.presentation = httpResponse.data.profilUtilisateur.presentation

            }

        })
        
    }
    $scope.rechercheProfil()

})