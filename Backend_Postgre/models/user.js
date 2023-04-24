const { sequelize } = require(".");

module.exports = (sequelize, type)=> {
    const User = sequelize.define('user', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING
    });
    return User;
}