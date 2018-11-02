m.controller('chatBoxCtrl', function($scope, SocketService){
    $scope.tabDesMessages = []

    $scope.envoieMessage = function(){
        SocketService.emit('chatBox', {message: $scope.msgbox, id: sessionStorage.id, nom: sessionStorage.nom, prenom: sessionStorage.prenom});
        $scope.msgbox = ''
           
    }
    // ecoute les touches
    $scope.keydown = function(){
        // si l'utilisateur clique sur entrer on envoie le message
        if(event.keyCode == 13){
            SocketService.emit('chatBox', {message: $scope.msgbox, id: sessionStorage.id, nom: sessionStorage.nom, prenom: sessionStorage.prenom});
            $scope.msgbox = ''
        }
    }
    SocketService.emit('recupereNbConnecter')
    SocketService.on('nbUtilisateurConnecter', function(data){
        $scope.nbUtilisateurConnecter = data.co
        
    });


    SocketService.on('chatBoxRetourMoi', function(data){
        $scope.tabDesMessages.push(data);
        // attend la creation de la div du message, modifie la couleur de fond pour reconnaitre le message de l'utilisateur connecter
        setTimeout(function(){
            nbtest = document.getElementsByClassName('chatBoxMessageListe').length-1
            document.getElementsByClassName('chatBoxMessageListe')[nbtest].style.backgroundColor = 'rgb(239, 239, 239)'
            document.getElementsByClassName('chatBoxMessageListe')[nbtest].style.padding = '5px'
        }, 10)
        
    });

    SocketService.on('chatBoxRetour', function(data){
        $scope.tabDesMessages.push(data);
        
    });

})