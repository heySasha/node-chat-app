const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

const messages = document.getElementById('messages');
socket.on('newMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('message-template').innerHTML;
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    messages.appendChild( str2DOMElement(html) );
});

socket.on('newLocationMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    messages.appendChild( str2DOMElement(html) );
});

const formMessage = document.getElementById('message-form');
formMessage.addEventListener('submit', e => {
    e.preventDefault();

    const messageTextBox = formMessage.querySelector('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value
    }, () => {
        messageTextBox.value = '';
    });
});

const locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.disabled  = true;
    locationButton.textContent = 'Sending location...';

    navigator.geolocation.getCurrentPosition(position => {
        locationButton.disabled = false;
        locationButton.textContent = 'Send location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.disabled = false;
        locationButton.textContent = 'Send location';
        alert('Unable to fetch location.')
    })
});

function str2DOMElement (html) {
    const frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    const el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}