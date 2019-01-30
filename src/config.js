require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    MONGODB_CONNSTR : process.env.MONGODB_CONNSTR,
    MONGODB_DB : process.env.MONGODB_DB,
    MONGODB_PORT : process.env.MONGODB_PORT,
    MONGODB_USER : process.env.MONGODB_USER,
    MONGODB_PASSWORD :process.env.MONGODB_PASSWORD
}