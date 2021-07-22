const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class AppDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to db.');
            } else {
                console.log('Db connected.');
            }
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error executing sql' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({id: this.lastID});
                }
            });
        });
    }
}

module.exports = AppDAO