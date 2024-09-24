const db=require('../common/connect');
const getalltours = (callback) => {
    const query = 'SELECT * FROM tours';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
module.exports={getalltours};