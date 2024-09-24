const db=require('../common/connect');
const getAllAnswers = (callback) => {
    const query = 'SELECT * FROM answers';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
module.exports={getAllAnswers};