m.controller('connexionCtrl', function($scope, $location){
    $scope.messagetest = "Parti connexion"
    $scope.pseudonyme = ""
    $scope.mdp = ""

    $scope.funcConnexion = ()=>{
        utilisateurConnecter = {
            pseudonyme: $scope.pseudonyme,
            mpd: $scope.mdp
        }


    // emit de l'objet ver le server et enregistrement dans la base
        // socket.emit('enregistrement', nouveauUtilisateur)

        // socket.on('reponseEnregistement', function(data){
        //     $location.path("/accueil");
        // })
    console.log('connexion', utilisateurConnecter)
        
    }

})