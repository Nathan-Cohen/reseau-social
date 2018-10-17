m.controller('connexionCtrl', function($scope, $location, $http){
    $scope.messagetest = "Parti connexion"
    $scope.mail = ""
    $scope.mdp = ""

    $scope.funcConnexion = ()=>{
        utilisateurConnecter = {
            mail: $scope.mail,
            mpd: $scope.mdp
        }

    // transforme en JSON
    var postData = angular.toJson(utilisateurConnecter, true);
    // envoie des donnees en POST
    $http({
        url: 'http://127.0.0.1:7007/connection',
        method: 'POST',
        data: postData
    }).then(function (httpResponse) {
        console.log('response:', httpResponse);
    })

    // Supprime les valeurs dans les champs        
    $scope.mail = ""
    $scope.mdp = ""

    console.log('connexion', utilisateurConnecter)
        
    }

})