const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
   console.log('new message', message);

   const li = document.createElement('li');
   li.textContent = `${message.from}: ${message.text}`;

    document.getElementById('messages').appendChild(li);
});

const formMessage = document.getElementById('message-form');
formMessage.addEventListener('submit', e => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: formMessage.querySelector('[name=message]').value
    }, (data) => {
        console.log('Got it.', data);
    })
});