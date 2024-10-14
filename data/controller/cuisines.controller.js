const cuisinesmodule=require('../modules/cuisines.module');
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
{name:'cuisines_image',maxCount:5},
{name:'content_image',maxCount:5}
]);
const getallcuisines=(req,res)=>{
    cuisinesmodule.getallcuisines((err,result)=>{
        if(err)
        {
            return res.status(404).json({code:404,message:'Error get all cuisines ',err});
        }
        else
        {
            return res.status(201).json({code:201,message:'Successfull',result});
        }
    });
};
const getallcuisinesbyId=(req,res)=>{
    cuisinesmodule.getallcuisinesbyId(req.params.cuisines_id,(err,result)=>{
        if(err)
        {
            return res.status(404).json({code:404,message:'Error get all cuisines by id',err});
        }
        if(!result)
        {
            return res.status(404).json({code:54040,message:' cuisines not found'});
        }
        return res.status(201).json({code:201,message:'Successfull',result});
        });
};
const addcuisine=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const cuisinesImages = req.files['cuisines_image'] ? req.files['cuisines_image'].map(file => file.path) : [];
        const contentImages = req.files['content_image'] ? req.files['content_image'].map(file => file.path) : [];
        

    const newcuisines={
        title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        closing_time:req.body.closing_time||new Date().toTimeString().split(' ')[0],
        opening_hours:req.body.opening_hours||new Date().toTimeString().split(' ')[0],
        cuisines_image:cuisinesImages.join(','),
        content_image:contentImages.join(',')
    }
    console.log("new cuisines: ",newcuisines);
    cuisinesmodule.addcuisines(newcuisines,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add cuisines',error:err});
        }
        res.status(201).json({code:201,message:'Add new cuisines successfull',data:{
            title:newcuisines.title,
        address:newcuisines.address,
        description:newcuisines.description,
        closing_time:newcuisines.closing_time,
        opening_hours:newcuisines.opening_hours,
        cuisines_image:newcuisines.cuisines_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image:newcuisines.content_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } })
    });
});
};
const updatecuisines=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let cuisinesImg=null;
        if(req.files['cuisines_image']&&req.files['cuisines_image'].length>0)
        {
            cuisinesImg=req.files['cuisines_images'][0].filename;
        }
        let contentImg =  null;
        
        if(req.files['content_image']&&req.files['content_image'].length>0)
        {
            cuisinesImg=req.files['content_images'][0].filename;
        }
        const UpdateCuisines={
            title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        closing_time:req.body.closing_time||new Date().toTimeString().split(' ')[0],
        opening_hours:req.body.opening_hours||new Date().toTimeString().split(' ')[0],
        cuisines_image:cuisinesImg,
        content_image:contentImg
        };
        console.log(UpdateCuisines);
        cuisinesmodule.updatecuisines(req.params.cuisines_id,UpdateCuisines,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller Cuisines',err});
            }
            res.status(201).json({code:201,message:'Cuisines updated successful',UpdateCuisines});
        });

    });
}
const getallcuisinesimgbyId = (req, res) => {
    cuisinesmodule.getallcuisinesimagesbyid(req.params.cuisines_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find cuisines images', error: err });
        }
        console.log(result);
        const cuisinesImages = result.cuisines_image ? result.cuisines_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); // Lấy tên tệp từ đường dẫn
            return `http://localhost:3001/upload/images/${filename}`; // Đường dẫn tĩnh tới hình ảnh
        }) : [];

        const contentImages = result.content_image ? result.content_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); // Lấy tên tệp từ đường dẫn
            return `http://localhost:3001/upload/images/${filename}`; // Đường dẫn tĩnh tới hình ảnh
        }) : [];
        console.log('cuisinesImages',cuisinesImages);
        console.log('contentImages',contentImages);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            cuisines_images: cuisinesImages,
            content_images: contentImages
        });
    });
};

const deletecuisines=(req,res)=>{
    cuisinesmodule.deletecuisines(req.params.cuisines_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete cuisines',error:err});
        }
        res.status(201).json({code:201,message:'Delete cuisines Successfull',result});
    });
};
const Findcuisinestitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input cuisines title" });
    }
    cuisinesmodule.findcuisinestitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find cuisines title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallcuisines,getallcuisinesbyId,addcuisine,getallcuisinesimgbyId,updatecuisines,deletecuisines,Findcuisinestitle};