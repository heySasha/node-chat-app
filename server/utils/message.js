const moment = require('moment');

const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: moment().valueOf()
});

const generateLocationMessage = (from, coords) => ({
    from,
    url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: moment().valueOf()
});

module.exports = { generateMessage, generateLocationMessage };