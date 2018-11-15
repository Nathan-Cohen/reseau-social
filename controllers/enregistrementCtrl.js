m.controller('enregistrementCtrl', function($scope, $http, $location){
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

        var urlEnLigne = "/enregistrement"
        // envoie des donnees en POST
        $http({
            url: urlEnLigne,
            method: 'POST',
            data: postData
        }).then(function (httpResponse) {
            console.log('response enregistrement:', httpResponse);
            if(httpResponse.data.message == 'Erreur'){
                $('#reponseEnregistrementErreur').css('display', 'table')
            }
            else if(httpResponse.data.message == 'Adresse mail déjà enregistrer'){
                $('#reponseEnregistrement').css('display', 'table')
            }
            else{
                console.log('httpResponse.data enregistrement', httpResponse.data)
                // enregistre l'id, le mail, le mot de passe et le prenom de passe en local
                sessionStorage.setItem('id', httpResponse.data.id)
                sessionStorage.setItem('mail', httpResponse.data.mail)
                sessionStorage.setItem('mdp', httpResponse.data.mdp)
                sessionStorage.setItem('prenom', httpResponse.data.prenom)
                sessionStorage.setItem('nom', httpResponse.data.nom)
                // change l'url
                $location.path('/profil/' + httpResponse.data.id)
                // Supprime les valeurs dans les champs
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
                // supprime le lien Connexion/Inscription
                $('#menuConnexion').remove()
                // ajoute le lien Profil
                $('#menuProfil').prepend('<li><a href="#!connexion"><i class="fas fa-user"></i> Profil</a></li>')

            }
        })

    }


})