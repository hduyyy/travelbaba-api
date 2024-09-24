const answermodule=require('../modules/answers.module');
const getAllAnswers = (req, res) => {
    answermodule.getAllAnswers((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};
module.exports={getAllAnswers};