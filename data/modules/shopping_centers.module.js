const db=require('../common/connect');
const getallshopping_centers = (callback) => {
    const query = 'SELECT * FROM shopping_centers';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
module.exports={getallshopping_centers};