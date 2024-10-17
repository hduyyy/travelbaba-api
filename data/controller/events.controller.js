const eventsmodule=require('../modules/events.module');
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
{name:'event_image',maxCount:5},
{name:'content_image',maxCount:5}
]);
const getallevents=(req,res)=>{
    eventsmodule.getallevents((err,result)=>{
        if(err)
        {
            return res.status(404).json({code:404,message:'Error get all events ',err});
        }
        else
        {
            return res.status(201).json({code:201,message:'Successfull',result});
        }
    });
};
const getalleventsbyId=(req,res)=>{
    eventsmodule.getalleventsbyId(req.params.event_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error get all events by id',err});

        }
        if(!result)
        {
            return res.status(404).json({code:404,message:' events not found'});
        }
        return res.status(201).json({code:201,message:'Successfull',result});
    });
};
const addevents=(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            return res.status(500).json({code:500,message:'Multer error at upload'});
        } else if(err)
        {
            return res.status(500).json({code:500,message:' error at upload'});
        }
        const EventsImages = req.files['event_image'] ? req.files['event_image'].map(file => file.path) : [];
        const contentImages = req.files['content_image'] ? req.files['content_image'].map(file => file.path) : [];
        
        let closing_time_event = req.body.closing_time_event || new Date().toISOString().slice(0, 19).replace('T', ' ');
        let opening_hours_event = req.body.opening_hours_event || new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newevents={
        title:req.body.title,
        description:req.body.description,
        closing_time_event:new Date(closing_time_event),
        opening_hours_event:new Date(opening_hours_event),
        views:req.body.views,
        content:req.body.content,
        event_image:EventsImages.join(','),
        content_image:contentImages.join(',')
    }
    console.log("new events: ",newevents);
    eventsmodule.addevent(newevents,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:404,message:'error at controller add events',error:err});
        }
        res.status(201).json({code:201,message:'Add new events successfull',data:{
            title:newevents.title,
        description:newevents.description,
        closing_time_event:newevents.closing_time_event,
        opening_hours_event:newevents.opening_hours_event,
        views:newevents.views,
        content:newevents.content,
        event_image:newevents.event_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
            ,
        content_image:newevents.content_image.split(',').map(img=>{
            const filename=path.basename(img);
            return 'http://localhost:3001/upload/images/' + filename;
        })
        } })
    });
});
};
const updateevents=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status.json({code:500,message:'Error upload file',error:err});
        }
        let eventsImg=null;
        if(req.files['events_image']&&req.files['events_image'].length>0)
        {
            eventsImg=req.files['events_images'][0].filename;
        }
        let contentImg =  null;
        
        if(req.files['content_image']&&req.files['content_image'].length>0)
        {
            contentImg=req.files['content_image'][0].filename;
        }
        let closing_time_event = req.body.closing_time_event || new Date().toISOString().slice(0, 19).replace('T', ' ');
        let opening_hours_event = req.body.opening_hours_event || new Date().toISOString().slice(0, 19).replace('T', ' ');
        const UpdateEvents={
            title: req.body.title,
            description: req.body.description,
            closing_time_event: new Date(closing_time_event),
            opening_hours_event: new Date(opening_hours_event),
            views:req.body.views,
            content:req.body.content,
            events_image: eventsImg,
            content_image: contentImg
        };
        console.log(UpdateEvents);
        eventsmodule.updateevent(req.params.event_id,UpdateEvents,(err,result)=>{
            if(err)
            {
                return res.status(404).json({code:404,message:'Error updating controller events',err});
            }
            res.status(201).json({code:201,message:'events updated successful',UpdateEvents});
        });

    });
};
const getalleventsimgbyId = (req, res) => {
    eventsmodule.getalleventimagesbyid(req.params.event_id, (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error find events images', error: err });
        }
        console.log(result);
        const eventsImages = result.event_image ? result.event_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img); 
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];

        const contentImages = result.content_image ? result.content_image.toString('utf-8').split(',').map(img => {
            const filename = path.basename(img);
            return `http://localhost:3001/upload/images/${filename}`; 
        }) : [];
        console.log('eventsImages',eventsImages);
        console.log('contentImages',contentImages);

        res.status(200).json({
            code: 200,
            message: 'Lấy hình ảnh thành công',
            event_image: eventsImages,
            content_images: contentImages
        });
    });
};
const deleteevents=(req,res)=>{
    eventsmodule.deleteevent(req.params.event_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete events',error:err});
        }
        res.status(201).json({code:201,message:'Delete events Successfull',result});
    });
};
const Findeventstitle=(req,res)=>{
    const {title}=req.body;
    if(!title)
    {
        return res.status(404).json({code:404, message: "error while input events title" });
    }
    eventsmodule.findeventstitle(title,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find events title", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallevents,getalleventsbyId,addevents,updateevents,deleteevents,getalleventsimgbyId,Findeventstitle};