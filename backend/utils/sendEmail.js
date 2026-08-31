const nodemailer = require('nodemailer')

const sendEmail = async (to,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions)
    }
    catch(err){
        console.log('Error sending email: ',err)
    }
}

module.exports = sendEmail