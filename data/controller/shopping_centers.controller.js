const shopping_centersmodule=require('../modules/shopping_centers.module');
const path=require('path');
const multer=require('multer');
const fs=require('fs');
const { type } = require('os');

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
{name:'shopping_center_image',maxCount:5},
{name:'content_image',maxCount:5}
]);
const getallshopping_centers=(req,res)=>{
    shopping_centersmodule.getallshopping_centers((err,result)=>{
        if(err)
        {
            return res.status(404).json({code:404,message:'Error get all shopping_centers ',err});
        }
        else
        {
            return res.status(201).json({code:201,message:'Successfull',result});
        }
    });
};
const getallshopping_centerssbyId=(req,res)=>{
    shopping_centersmodule.getallshopping_centersbyId(req.params.shopping_center_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error get all shopping_centers by id',err});
        }
        if(!result)
        {
            return res.status(404).json({code:404,message:' shopping_centers not found'});
        }
        return res.status(201).json({code:201,message:'Successfull',result});
    });
};
const addshopping_centers=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const shopping_centersImages = req.files['shopping_center_image'] ? req.files['shopping_center_image'].map(file => file.path) : [];
        const contentImages = req.files['content_image'] ? req.files['content_image'].map(file => file.path) : [];
        
        let Closing_time = req.body.closing_time || new Date().toISOString().slice(0, 19).replace('T', ' ');
        let Opening_hours = req.body.opening_hours || new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newshopping_centers={
        title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        closing_time:new Date(Closing_time),
        opening_hours:new Date(Opening_hours),
        type:req.body.type,
        shopping_center_image:shopping_centersImages.join(','),
        content_image:contentImages.join(',')
    }
    console.log("new shopping_centers: ",newshopping_centers);
    shopping_centersmodule.addshopping_center(newshopping_centers,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add shopping_centers',error:err});
        }
        res.status(201).json({code:201,message:'Add new shopping_centers successfull',data:{
            title:newshopping_centers.title,
            address:newshopping_centers.address,
        description:newshopping_centers.description,
        closing_time:newshopping_centers.closing_time,
        opening_hours:newshopping_centers.opening_hours,
        type:newshopping_centers.type,
        shopping_center_image:newshopping_centers.shopping_center_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image:newshopping_centers.content_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } })
    });
});
};
const updateshopping_centers=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let shopping_centersImg=null;
        if(req.files['shopping_centers_image']&&req.files['shopping_centers_image'].length>0)
        {
            shopping_centersImg=req.files['shopping_centers_images'][0].filename;
        }
        let contentImg =  null;
        
        if(req.files['content_image']&&req.files['content_image'].length>0)
        {
            contentImg=req.files['content_images'][0].filename;
        }
        let closing_time_shopping_center = req.body.closing_time_shopping_center || new Date().toISOString().slice(0, 19).replace('T', ' ');
        let opening_hours_shopping_center = req.body.opening_hours_shopping_center || new Date().toISOString().slice(0, 19).replace('T', ' ');
        const Updateshopping_centers={
            title: req.body.title,
            address:req.body.address,
            description: req.body.description,
            closing_time: new Date(closing_time_shopping_center),
            opening_hours: new Date(opening_hours_shopping_center),
            type:req.body.type,
            shopping_centers_image: shopping_centersImg,
            content_image: contentImg
        };
        console.log(Updateshopping_centers);
        shopping_centersmodule.updateshopping_center(req.params.shopping_center_id,Updateshopping_centers,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller shopping_centers',err});
            }
            res.status(201).json({code:201,message:'shopping_centers updated successful',Updateshopping_centers});
        });

    });
};
const getallshopping_centersimgbyId = (req, res) => {
    shopping_centersmodule.getallshopping_centerimagesbyid(req.params.shopping_center_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find shopping_centers images', error: err });
        }
        console.log(result);
        const shopping_centersImages = result.shopping_center_image ? result.shopping_center_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); 
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];

        const contentImages = result.content_image ? result.content_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        console.log('shopping_centersImages',shopping_centersImages);
        console.log('contentImages',contentImages);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            shopping_center_image: shopping_centersImages,
            content_images: contentImages
        });
    });
};
const deleteshopping_centers=(req,res)=>{
    shopping_centersmodule.deleteshopping_center(req.params.shopping_center_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete shopping_centers',error:err});
        }
        res.status(201).json({code:201,message:'Delete shopping_centers Successfull',result});
    });
};
const Findshopping_centerstitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input shopping_centers title" });
    }
    shopping_centersmodule.findshopping_centerstitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find shopping_centers title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallshopping_centers,getallshopping_centerssbyId,addshopping_centers,updateshopping_centers,deleteshopping_centers,getallshopping_centersimgbyId,Findshopping_centerstitle};