m.controller('connexionCtrl', function($scope, $http, $location, connectionFactorie){
    $scope.messagetest = "Parti connexion"
    $scope.mail = ""
    $scope.mdp = ""

    $scope.funcConnexion = ()=>{
        // construit l'objet
        utilisateurConnecter = {
            mail: $scope.mail,
            mdp: $scope.mdp
        }

    // transforme en JSON
    var postData = angular.toJson(utilisateurConnecter, true);

    // envoie des donnees en POST
    $http({
        url: 'http://127.0.0.1:5000/connection',
        method: 'POST',
        data: postData
    }).then(function (httpResponse) {
        // si un message d'erreur est envoyer par le serveur
        if(httpResponse.data.message){
            document.getElementById('reponseConnection').style.display = 'table'
        }
        // sinon les donnees sont envoyer par le serveur
        else if(httpResponse.data.mail){
            console.log('Connexion reussi', httpResponse.data.prenom)
            $scope.send = function(){
                connectionFactorie.sendData(utilisateurConnecter);
            };
            $scope.send()
            $location.path('/profil/' + httpResponse.data.prenom)

        }

    })

    // Supprime les valeurs dans les champs        
    $scope.mail = ""
    $scope.mdp = ""
        
    }

})