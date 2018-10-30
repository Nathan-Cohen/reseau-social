m.service('SocketService', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect()
    });
});