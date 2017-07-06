const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: new Date().getTime()
});

const generateLocationMessage = (from, coords) => ({
    from,
    url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateLocationMessage };