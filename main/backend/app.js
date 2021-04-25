const express = require('express');
const app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');
const database = require('./database');

const Patient = database.model('Patient');


//send email data
const sendEmail = (patientsData) => {
    console.log('lets go')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'takethedosage@gmail.com',
          pass: 'takethedosehackbmu'
        }
      });
      
      var mailOptions = {
        from: 'takethedosage@gmail.com',
        to: patientsData.email,
        subject: `Pill Reminder` ,
        text: 'Please do not forget to take the pill on time!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

//checking if there is any reminder to send 
const checkReminder = async () => {
    console.log(new Date())

    const result = await Patient.find({'dailyReview.notifyDateTime': new Date()})
    if (result.length > 0) {
        console.log("inside")
        sendEmail(result)
    }
}


// calling the function every 5 secondds
setInterval(checkReminder, 1000*5);




app.use(cors());
app.use(express.json({ limit: '100kb' }));


app.use(require('./routes/patient-router'));

app.listen(3000)
module.exports = app;

