// [{
//     id: '/#12',
//     name: 'Andrew',
//     room: 'The Office Fans'
// }]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {};

        if ( typeof(arguments[0]) === 'object' ) {
            user.id = arguments[0].id;
            user.name = arguments[0].name;
            user.room = arguments[0].room;
        } else {
            user = { id, name, room };
        }

        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room).map(user => user.name);
    }
}

module.exports = { Users };