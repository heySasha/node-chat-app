const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

const messages = document.getElementById('messages')
socket.on('newMessage', message => {
   console.log('new message', message);

   const li = document.createElement('li');
   li.textContent = `${message.from}: ${message.text}`;
    messages.appendChild(li);
});

socket.on('newLocationMessage', message => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = 'My current location';
    a.target = '_blank';

    li.textContent = `${message.from}: `;
    a.href = message.url;
    li.appendChild(a);
    messages.appendChild(li);
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

const locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location.')
    })
});



