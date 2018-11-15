m.controller('connexionCtrl', function($scope, $http, $location, SocketService){
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

        var urlEnLigne = "/connection"

        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            // si un message d'erreur est envoyer par le serveur
            if(httpResponse.data.message){
                document.getElementById('reponseConnection').style.display = 'table'
            }
            // sinon les donnees sont envoyer par le serveur
            else if(httpResponse.data.mail){
                // console.log('Connexion reussi', httpResponse.data)

                // enregistre l'id, le mail, le mot de passe et le prenom de passe en local                
                sessionStorage.setItem('id', httpResponse.data.id)
                sessionStorage.setItem('mail', httpResponse.data.mail)
                sessionStorage.setItem('mdp', httpResponse.data.mdp)
                sessionStorage.setItem('prenom', httpResponse.data.prenom)
                sessionStorage.setItem('nom', httpResponse.data.nom)

                // change l'url
                $location.path('/profil/' + httpResponse.data.id)

                // Supprime les valeurs dans les champs        
                $scope.mail = ""
                $scope.mdp = ""

                // supprime le lien Connexion/Inscription
                $('#menuConnexion').css('display', 'none')

                // ajoute le lien Profil
                $('#menuProfil').prepend('<li id="monProfil"><a href="#!connexion"><i class="fas fa-user"></i> Profil</a></li>')

                // ajoute l'utilisateur au tableau des connections dans les websocket
                SocketService.emit('connexion', {utilisateurConnecter: sessionStorage});

            }

        })
        
    }
    if(sessionStorage.mdp && sessionStorage.mail && sessionStorage.prenom){
        $location.path('/profil/' + sessionStorage.id)
    }

})