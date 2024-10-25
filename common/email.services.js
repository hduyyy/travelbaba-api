const { text } = require('body-parser');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'nguyenhuuduy044@gmail.com',
      pass:'aeny blun pywa usgm'
    }
  });
  const sendResetCode=(email,resetCode)=>{
    const mailOptions = {
        from: 'nguyenhuuduy044@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}. This code will expire in 60 seconds.`
  };
    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log('Error sending email: ', error);
          } else {
            console.log(' email sent successfully: ', info.response);
          }
    });
  
};
const sendBookingInfor=(email,InforBooking)=>{
  const mailOptions={
    from:'nguyenhuuduy044@gmail.com',
    to:email,
    subject:'Thông tin đặt lưu trú',
    text:`Thông tin đặt lưu trú của bạn ${InforBooking.homestay_name} và tour ${InforBooking.tour_name}`+
    `\nNgày đặt: ${InforBooking.booking_date}\n\n`+
    `Cảm ơn bạn đã đặt đơn của chúng tôi. Hy vọng bạn sẽ có trải nghiệm tốt về dịch vụ`
  };
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err)
    {
      console.log('Error sending email: ', err);
    } else
    {
      console.log('  email sent successfully ', info.response);
    }
  })
}

module.exports={sendResetCode,sendBookingInfor};