m.controller('profilCtrl', function($scope, $http, connectionFactorie){

    var utilisateur = connectionFactorie.getData();    
    $scope.mail = utilisateur.mail;


    $scope.rechercheProfil = ()=>{
        // construit l'objet
        utilisateurConnecter = {
            mail: $scope.mail
        }

        // transforme en JSON
        var postData = angular.toJson(utilisateurConnecter, true);

        // envoie des donnees en POST
        $http({
            url: 'http://127.0.0.1:7008/profil',
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            if(httpResponse.data.message){
                console.log('Echec de la recuperation du profil')
            }
            else if(httpResponse.data.mail){
                console.log('Recuperation profil reussi', httpResponse.data.prenom)
                $scope.prenomNom = httpResponse.data.prenom

            }

        })
        
    }
    $scope.rechercheProfil()

})