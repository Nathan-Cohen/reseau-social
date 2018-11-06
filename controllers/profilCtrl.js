m.controller('profilCtrl', function($scope, $http, $routeParams, connectionFactorie){
    // recupere l'adresse mail a la connexion ou a l'enregistrement
    var utilisateur = connectionFactorie.getData();
    if(sessionStorage.mail){
        $('#deconnexion').css('display', 'block')
        console.log('testttttttttttttt nom', sessionStorage.nom)
        console.log('testttttttttttttt prenom', sessionStorage.prenom)
    }
    $scope.rechercheProfil = ()=>{
        // construit l'objet
        utilisateurConnecter = {
            id: sessionStorage.id,
            mail: sessionStorage.mail,
            mdp: sessionStorage.mdp,
            prenom: sessionStorage.prenom
        }
        // les donnees de l'utilisateur a la connexion ou a l'enregistrement
        var utilisateurJsonData = angular.toJson(utilisateurConnecter, true);
        sessionStorage.utilisateurConnecter = utilisateurJsonData

        // recupere le parametre dans la route (id)        
        paramRoute = {
            id: $routeParams.idUtilisateur
        }
        // les donnees de l'utilisateur dans l'url
        var routeJsonData = angular.toJson(paramRoute, true);
        
        // console.log("sessionStorage.id" + sessionStorage.id);
        // console.log("$routeParams.idUtilisateur" + $routeParams.idUtilisateur);
        
        var urlEnLigne = "/profil"
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: routeJsonData
        }).then(function (httpResponse) {
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