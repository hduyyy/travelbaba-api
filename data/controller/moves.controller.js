const movesmodule=require('../modules/moves.module');
const getallmoves=(req,res)=>{
    movesmodule.getallmoves((err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(result);
        }
    });
};
module.exports={getallmoves};