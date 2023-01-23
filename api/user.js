var connection = require('./db');

function getUser () {
    return new Promise((resolve, reject)=>{
        connection.query("Select * FROM User", function(error, result, fields){
            if (error) {
                reject(error)
            }

            resolve(result);
        })
}) 
}

module.exports = {
    getUser
};