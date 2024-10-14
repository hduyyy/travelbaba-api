const movesmodule=require('../modules/moves.module');
const path=require('path');
const multer=require('multer');
const fs=require('fs');

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        const uploadDir = path.join(__dirname, '../upload/images'); 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); 
        }
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({
    storage: storage,
    limits:{fileSize:1024*1024*25}
}).fields([
{name:'moves_image',maxCount:5},
{name:'content_image',maxCount:5}
]);
const getallmoves=(req,res)=>{
    movesmodule.getallmoves((err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error get all moves',err});
        }
        else
        {
            return res.status(201).json({code:201,message:'Successfull',result});
        }
    });
};
const getallmovesbyId=(req,res)=>{
    movesmodule.getallmovesbyId(req.params.moves_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error get all moves by id',err});
        }
        if(!result)
        {
            return res.status(404).json({code:404,message:'moves_id not found'});
        }
        return res.status(201).json({code:201,message:'Successfull',result});
    });
};
const addmoves=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const movesImages = req.files['moves_image'] ? req.files['moves_image'].map(file => file.path) : [];
        const contentImages = req.files['content_image'] ? req.files['content_image'].map(file => file.path) : [];
    const newmoves={
        title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        type_vehicle:req.body.type_vehicle,
        moves_image:movesImages.join(','),
        content_image:contentImages.join(',')
    }
    console.log("new moves: ",newmoves);
    movesmodule.addmove(newmoves,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add moves',error:err});
        }
        res.status(201).json({code:201,message:'Add new moves successfull',data:{
            title:newmoves.title,
            address:newmoves.address,
        description:newmoves.description,
        type_vehicle:newmoves.type_vehicle,
        moves_image:newmoves.moves_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image:newmoves.content_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } })
    });
});
};
const updatemoves=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let movesImg=null;
        if(req.files['moves_image']&&req.files['moves_image'].length>0)
        {
            movesImg=req.files['moves_images'][0].filename;
        }
        let contentImg =  null;
        
        if(req.files['content_image']&&req.files['content_image'].length>0)
        {
            contentImg=req.files['content_images'][0].filename;
        }
        const Updatemoves={
            title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        type_vehicle:req.body.type_vehicle,
            moves_image: movesImg,
            content_image: contentImg
        };
        console.log(Updatemoves);
        movesmodule.updatemove(req.params.moves_id,Updatemoves,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller moves',err});
            }
            res.status(201).json({code:201,message:'moves updated successful',Updatemoves});
        });

    });
};
const getallmovesimgbyId = (req, res) => {
    movesmodule.getallmoveimagesbyid(req.params.moves_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find moves images', error: err });
        }
        console.log(result);
        const movesImages = result.moves_image ? result.moves_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); 
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];

        const contentImages = result.content_image ? result.content_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        console.log('movesImages',movesImages);
        console.log('contentImages',contentImages);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            moves_images: movesImages,
            content_images: contentImages
        });
    });
};
const deletemoves=(req,res)=>{
    movesmodule.deletemove(req.params.moves_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete moves',error:err});
        }
        res.status(201).json({code:201,message:'Delete moves Successfull',result});
    });
};
const Findmovestitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input moves title" });
    }
    movesmodule.findmovestitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find moves title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallmoves,getallmovesbyId,addmoves,updatemoves,deletemoves,Findmovestitle,getallmovesimgbyId};