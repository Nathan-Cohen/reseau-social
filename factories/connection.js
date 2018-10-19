m.factory('connectionFactorie',function($rootScope){
    
    var service = {};
    service.data = false;
    service.sendData = function(data){
        this.data = data;
    };
    service.getData = function(){
      return this.data;
    };
    return service;
  });