require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.DBUSER || "root",
        "password": process.env.PASSWORD || null,
        "database": process.env.DATABASE || "stovetop_db",
        "host": process.env.HOST || "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DBUSER || "root",
        "password": process.env.PASSWORD || "yourRootPassword",
        "database": process.env.DATABASE || "stovetop_db",
        "host": process.env.HOST || "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DBUSER || "root",
        "password": process.env.PASSWORD || null,
        "database": process.env.DATABASE || "stovetop_db",
        "host": process.env.HOST || "127.0.0.1",
        "dialect": "mysql",
        "use_env_variable": "JAWSDB_URL"
    }
}