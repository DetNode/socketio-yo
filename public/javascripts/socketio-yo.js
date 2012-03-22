(function($) {
  
  $(document).ready(function(){
    
    var writeMessage = function(data) {
      $('#container ul').append('<li>' + data + '</li>');
    }
    
    var socket = io.connect('http://localhost');
    
    socket.on('mymessage', function (data) {
      writeMessage(data);
    });
    
    socket.on('connecting', function(transport) {
      writeMessage('Trying transport: ' + transport);
    });
    
    socket.on('connect', function(transport) {
      writeMessage('Connected!!!');
    });

    
  });
  
})(jQuery);