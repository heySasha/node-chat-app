const socket = io();

const formMessage = document.getElementById('message-form');
const messages = document.getElementById('messages');
const locationButton = document.getElementById('send-location');

socket.on('connect', () => {
    console.log('Connected to server');
    const params = Utils.deparam();

    socket.emit('join', params, err => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('updateUserList', users => {
    const ol =  document.createElement('ol');

    users.forEach(user => {
        let li = document.createElement('li');
        li.textContent = user;

        ol.appendChild(li)
    });

    document.getElementById('users').innerHTML = ol.outerHTML;
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    messages.appendChild( Utils.str2DOMElement(html) );
    scrollToBottom();
});

socket.on('newLocationMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    const template = document.getElementById('location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    messages.appendChild( Utils.str2DOMElement(html) );
    scrollToBottom();
});

formMessage.addEventListener('submit', e => {
    e.preventDefault();

    const messageTextBox = formMessage.querySelector('[name=message]');
    socket.emit('createMessage', {
        text: messageTextBox.value
    }, () => {
        messageTextBox.value = '';
    });
});

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

function scrollToBottom() {
    const newMessage = messages.lastElementChild;

    const clientHeight = messages.clientHeight;
    const scrollTop = messages.scrollTop;
    const scrollHeight = messages.scrollHeight;
    const newMessageHeight = newMessage.offsetHeight;

    if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}