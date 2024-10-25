const newsmodule=require('../modules/news.module');
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
{name:'news_image',maxCount:5},
{name:'content_image',maxCount:5}
]);
const getallnews=(req,res)=>{
    newsmodule.getallnews((err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:' error at get all news',err});
        }
        const dataFormat=result.map(e=>{
            const news_image_base64=e.news_image?e.news_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
            const content_image_base64=e.content_image?e.content_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
            return{e,news_image_base64,content_image_base64}
        })
            return res.status(201).json({code:201,message:'Successfull',dataFormat});

    });
};
const getallnewssbyId=(req,res)=>{
    newsmodule.getallnewsbyId(req.params.news_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:' error at get all news by id',err});
        }
        if(!result)
        {
            return res.status(404).json({code:404,message:'  news by id not found',err});
        }
        const newss_image_base64=result.news_image?result.news_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
        const content_image_base64=result.news_image?result.news_image.toString('utf8').split(',').map(img=>Buffer.from(img).toString('base64')):[];
        return res.status(201).json({code:201,message:'Successfull',result,newss_image_base64,content_image_base64});    });
};
const addnews=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const newsImages = req.files['news_image'] ? req.files['news_image'].map(file => file.path) : [];
        const contentImages = req.files['content_image'] ? req.files['content_image'].map(file => file.path) : [];
    const newnews={
        title:req.body.title,
        content:req.body.content,
        description:req.body.description,
        views:req.body.views,
        news_image:newsImages.join(','),
        content_image:contentImages.join(',')
    }
    console.log("new news: ",newnews);
    newsmodule.Addnews(newnews,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add news',error:err});
        }
        res.status(201).json({code:201,message:'Add new news successfull',data:{
            title:newnews.title,
            content:newnews.content,
            description:newnews.description,
            views:newnews.views,
        news_image:newnews.news_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image:newnews.content_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } })
    });
});
};
const updatenews=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let newsImg=null;
        if(req.files['news_image']&&req.files['news_image'].length>0)
        {
            newsImg=req.files['news_image'][0].filename;
        }
        let contentImg =  null;
        
        if(req.files['content_image']&&req.files['content_image'].length>0)
        {
            contentImg=req.files['content_image'][0].filename;
        }
        const Updatenews={
            title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        type_vehicle:req.body.type_vehicle,
            news_image: newsImg,
            content_image: contentImg
        };
        console.log(Updatenews);
        newsmodule.updatenews(req.params.news_id,Updatenews,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller news',err});
            }
            res.status(201).json({code:201,message:'news updated successful',Updatenews});
        });

    });
};
const getallnewsimgbyId = (req, res) => {
    newsmodule.getallnewsimagesbyid(req.params.news_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find news images', error: err });
        }
        console.log(result);
        const newsImages = result.news_image ? result.news_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); 
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];

        const contentImages = result.content_image ? result.content_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        console.log('newsImages',newsImages);
        console.log('contentImages',contentImages);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            news_images: newsImages,
            content_images: contentImages
        });
    });
};
const deletenews=(req,res)=>{
    newsmodule.deletenews(req.params.news_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete news',error:err});
        }
        res.status(201).json({code:201,message:'Delete news Successfull',result});
    });
};
const Findnewtitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input news title" });
    }
    newsmodule.findnewstitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find news title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallnews,getallnewssbyId,addnews,updatenews,deletenews,getallnewsimgbyId,Findnewtitle};