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

        var urlLocal = "http://127.0.0.1:5000/connection"
        var urlEnLigne = "https://reseausocial.herokuapp.com/connection"

        // envoie des donnees en POST
        $http({
            url: urlLocal,
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
                // envoie l'information dans la factorie "connection" pour les recuperer dans la page profil
                $scope.send = function(){
                    connectionFactorie.sendData(utilisateurConnecter);
                };
                $scope.send()
                console.log ('connect', httpResponse)
                // enregistre le mail et le mot de passe en local
                localStorage.setItem('mail', httpResponse.data.mail)
                localStorage.setItem('mdp', httpResponse.data.mdp)
                localStorage.setItem('prenom', httpResponse.data.prenom)
                // change l'url
                $location.path('/profil/' + httpResponse.data.prenom)
                // Supprime les valeurs dans les champs        
                $scope.mail = ""
                $scope.mdp = ""

            }

        })
        
    }
    if(localStorage.mdp && localStorage.mail && localStorage.prenom){
        $location.path('/profil/' + localStorage.prenom)
    }

})