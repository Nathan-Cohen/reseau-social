m.controller('profilCtrl', function($scope, $http, $routeParams, connectionFactorie){
    // recupere l'adresse mail a la connexion ou a l'enregistrement
    var utilisateur = connectionFactorie.getData();
    if(sessionStorage.mail){
        $('#deconnexion').css('display', 'block')
    }
    $scope.rechercheProfil = ()=>{
        // construit l'objet
        utilisateurConnecter = {
            id: sessionStorage.id,
            mail: sessionStorage.mail,
            mdp: sessionStorage.mdp,
            prenom: sessionStorage.prenom
        }
        
        paramRoute = {
            id: $routeParams.idUtilisateur
        }
        // transforme en JSON
        var utilisateurJsonData = angular.toJson(utilisateurConnecter, true);
        var routeJsonData = angular.toJson(paramRoute, true);
        sessionStorage.utilisateurConnecter = utilisateurJsonData
        
        var urlLocal = "http://127.0.0.1:5000/profil"
        var urlEnLigne = "/profil"
        var UserId = $routeParams.idUtilisateur
        console.log("id of user " + routeJsonData);
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: routeJsonData
            // data: utilisateurJsonData
        }).then(function (httpResponse) {
            console.log('Recuperation profil reussi', httpResponse.data.profilUtilisateur)
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message){
                console.log('Echec de la recuperation du profil')
            }
            // sinon les donnees sont envoyer par le serveur
            else if(httpResponse.data.profilUtilisateur[0].mail){
                $scope.prenomNom = httpResponse.data.profilUtilisateur[0].prenom + ' ' + httpResponse.data.profilUtilisateur[0].nom
                $scope.prenom = httpResponse.data.profilUtilisateur[0].prenom
                $scope.nom = httpResponse.data.profilUtilisateur[0].nom
                $scope.mail = httpResponse.data.profilUtilisateur[0].mail
                $scope.genre = httpResponse.data.profilUtilisateur[0].genre
                $scope.ville = httpResponse.data.profilUtilisateur[0].ville
                $scope.pays = httpResponse.data.profilUtilisateur[0].pays
                $scope.age = httpResponse.data.profilUtilisateur[0].age
                $scope.website = httpResponse.data.profilUtilisateur[0].website
                $scope.presentation = httpResponse.data.profilUtilisateur[0].presentation

            }

        })
        
    }
    $scope.rechercheProfil()

})