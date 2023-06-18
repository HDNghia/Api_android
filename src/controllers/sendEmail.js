const nodemailer = require('nodemailer');
const email = {
    sendemail: (req, res) => {
        // console.log(req)
        let email = req.params.email;
        let otp = req.params.otp;
    
        // Cấu hình transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: '20522125@gm.uit.edu.vn',
                pass: 'PT07102002PTPT'
            }
        });
    
        // Cấu hình nội dung email
        const mailOptions = {
            from: '20522125@gm.uit.edu.vn',
            to: email,
            subject: "YOUR OTP: #" + otp,
            html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
            <h1 style="text-align: center;">OTP Verification</h1>
            <div style="max-width: 400px; margin: 0 auto; text-align: center; background-color: #f2f2f2; padding: 20px; border-radius: 5px;">
              <p style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">Your OTP:</p>
              <p style="font-size: 24px">${otp}</p>
              <p style="font-size: 17px">Please do not share this with anyone else!</p>
          </body>`
        };
    
        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Đã xảy ra lỗi khi gửi email.');
            } else {
                console.log('Email đã được gửi: ' + info.response);
                res.status(200).send('Email đã được gửi thành công.');
            }
        });
    }
}

module.exports = email;