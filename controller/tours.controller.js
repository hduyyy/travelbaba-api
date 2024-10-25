const toursmodule=require('../modules/tours.module');
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
{name:'tour_image',maxCount:5},
{name:'content_image1',maxCount:5},
{name:'content_image2',maxCount:5}

]);
const getalltours=(req,res)=>{
    toursmodule.getalltours((err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "error get all tours ",err });

        }
        const dataFormat=result.map(e=>{
            const tour_image_base64=e.tour_image?e.tour_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
            const content_image1_base64=e.content_image1?e.content_image1.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
            const content_image2_base64=e.content_image2?e.content_image2.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];

            return{
                e,tour_image_base64,content_image1_base64,content_image2_base64
            }
        })
           
            return res.status(201).json({code:201,message:'Successfull',dataFormat});
    });
};
const getalltourssbyId=(req,res)=>{
    toursmodule.getalltoursbyId(req.params.tour_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "error get all tours by id ",err });
        }
        if(!result)
        {
            return res.status(404).json({code:404, message: "tours not found " });
        }
        const tour_image_base64=result.tour_image?result.tour_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
        const content_image1_base64=result.content_image1?result.content_image1.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
        const content_image2_base64=result.content_image2?result.content_image2.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
        return res.status(201).json({code:201,message:'Successfull',result,tour_image_base64,content_image1_base64,content_image2_base64});
    });
};
const addtours=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const ToursImages = req.files['tour_image'] ? req.files['tour_image'].map(file => file.path) : [];
        const contentImages1 = req.files['content_image1'] ? req.files['content_image1'].map(file => file.path) : [];
        const contentImages2 = req.files['content_image2'] ? req.files['content_image2'].map(file => file.path) : [];
    const newtours={
        title:req.body.title,
        description:req.body.description,
        price:parseFloat(req.body.price),
        views:req.body.views,
        address:req.body.address,
        vehicle:req.body.vehicle,
        members:req.body.members,
        tour_date:req.body.tour_date,
        tour_image:ToursImages.join(','),
        content_image1:contentImages1.join(','),
        content_image2:contentImages2.join(',')
    }
    console.log("new tours: ",newtours);
    toursmodule.addtour(newtours,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add tours',error:err});
        }
        res.status(201).json({code:201,message:'Add new tours successfull',data:{
            title:newtours.title,
        description:newtours.description,
        price:newtours.price,
        address:newtours.address,
        vehicle:newtours.vehicle,
        members:newtours.members,
        tour_date:newtours.tour_date,
        tour_image:newtours.tour_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image1:newtours.content_image1.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        ,
        content_image2:newtours.content_image2.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } });
    });
});
};
const updatetours=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let toursImg=null;
        if(req.files['tours_image']&&req.files['tours_image'].length>0)
        {
            toursImg=req.files['tours_images'][0].filename;
        }
        let contentImg1 =  null;
        
        if(req.files['content_image1']&&req.files['content_image1'].length>0)
        {
            contentImg1=req.files['content_images1'][0].filename;
        }
        let contentImg2 =  null;
        
        if(req.files['content_image2']&&req.files['content_image2'].length>0)
        {
            contentImg2=req.files['content_images2'][0].filename;
        }
        const UpdateTours={
            title:newtours.title,
            description:newtours.description,
            price:newtours.price,
            address:newtours.address,
            vehicle:newtours.vehicle,
            members:newtours.members,
            tour_date:newtours.tour_date,
            tours_image: toursImg,
            content_image1: contentImg1,
            content_image2: contentImg2
        };
        console.log(UpdateTours);
        toursmodule.updatetour(req.params.tour_id,UpdateTours,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller tours',err});
            }
            res.status(201).json({code:201,message:'tours updated successful',UpdateTours});
        });

    });
};
const getalltoursimgbyId = (req, res) => {
    toursmodule.getalltourimagesbyid(req.params.tour_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find tours images', error: err });
        }
        console.log(result);
        const toursImages = result.tour_image ? result.tour_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); 
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];

        const contentImages1 = result.content_image1 ? result.content_image1.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        const contentImages2 = result.content_image2 ? result.content_image2.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        console.log('toursImages',toursImages);
        console.log('contentImages',contentImages1);
        console.log('contentImages',contentImages2);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            tour_image: toursImages,
            content_image1: contentImages1,
            content_image2: contentImages2
        });
    });
};
const deletetours=(req,res)=>{
    toursmodule.deletetour(req.params.tour_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete tours',error:err});
        }
        res.status(201).json({code:201,message:'Delete tours Successfull',result});
    });
};
const Findtourstitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input tours title" });
    }
    toursmodule.findtourtitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find tours title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    })
}
module.exports={getalltours,getalltourssbyId,addtours,updatetours,deletetours,getalltoursimgbyId,Findtourstitle};