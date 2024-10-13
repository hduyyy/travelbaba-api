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
            console.log('Email sent: ' + info.response);
          }
    });
};

module.exports={sendResetCode};