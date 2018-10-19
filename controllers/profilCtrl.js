m.controller('connexionCtrl', function($scope, $http, $location){
    $scope.messagetest = "Parti connexion"
    $scope.prenomNom = "test"

    // $scope.funcConnexion = ()=>{
    //     utilisateurConnecter = {
    //         mail: $scope.mail,
    //         mdp: $scope.mdp
    //     }

    //     // transforme en JSON
    //     var postData = angular.toJson(utilisateurConnecter, true);

    //     // envoie des donnees en POST
    //     $http({
    //         url: 'http://127.0.0.1:7006/connection',
    //         method: 'POST',
    //         data: postData
    //     }).then(function (httpResponse) {
    //         if(httpResponse.data.message){
    //             document.getElementById('reponseConnection').style.display = 'table'
    //         }
    //         else if(httpResponse.data.mail){
    //             console.log('Connexion reussi', httpResponse.data.prenom)
    //             $location.path('/profil' + httpResponse.data.prenom)
    //         }

    //     })
        
    // }

})