m.controller('chatBoxCtrl', function($scope, $http, SocketService){

    $scope.tabDesMessages = []

    $scope.envoieMessage = function(){
        SocketService.emit('chatBox', {message: $scope.msgbox, id: sessionStorage.id, nom: sessionStorage.nom, prenom: sessionStorage.prenom});
        // console.log('testfront', SocketService)
    }
    SocketService.on('chatBoxRetour', function(data){
        console.log('chatBoxRetour', data)
        $scope.tabDesMessages.push(data)

    })

})